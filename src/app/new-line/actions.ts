'use server';

import { addLine } from "@/actions/lines";
import AdmZip from 'adm-zip';
import { parseGPXWithCustomParser, GeoJSON } from "@we-gold/gpxjs";
import { DOMParser } from "xmldom-qsa";

function isValidZipBuffer(buffer: Buffer) {
    return buffer[0] === 0x50 && buffer[1] === 0x4b;
}

export async function processZip(file: File): Promise<{ data: GeoJSON[] | null, error: any }> {
    const buffer = Buffer.from(await file.arrayBuffer());

    if(!isValidZipBuffer(buffer))
        return { data: null, error: "Invalid zip file" };

    let zip: AdmZip;
    try {
        zip = new AdmZip(buffer);
    } catch {
        return { data: null, error: "Could not read zip file" };
    }

    const gpxEntries = zip.getEntries().filter(e =>
        e.name.endsWith('.gpx') &&
        !e.name.startsWith('._') &&
        !e.entryName.startsWith('__MACOSX/')
    );
    if (gpxEntries.length === 0) {
        return { data: null, error: "No GPX files found in zip" };
    }

    const customParseMethod = (txt: string): Document | null => {
        return new DOMParser().parseFromString(txt, "text/xml");
    }

    let geoJsons = [];
    for(const entry of gpxEntries) {
        const gpx = entry.getData().toString('utf-8');
        const [parsedGpx, error] = parseGPXWithCustomParser(gpx, customParseMethod);
        if(error)
            return { data: null, error: `Could not parse GPX file ${entry.name}: ${error}` };
        const geoJson = parsedGpx.toGeoJSON();
        geoJsons.push(geoJson);
    }

    return { data: geoJsons, error: null };
}

export async function createNewLine(formData: FormData): Promise<{line: Line | null, error: any}> {
    const name = String(formData.get('name'));
    const id = Number(formData.get('id'));
    const type = formData.get('type') as LineType;
    const from = String(formData.get('from'));
    const to = String(formData.get('to'));

    const file = formData.get("file") as File;

    // Server-side file checking
    if (!file || file.size === 0)
        return { line: null, error: "No file uploaded" };

    if (!file.name.toLowerCase().endsWith(".zip"))
        return { line: null, error: "File must have a .zip extension" };

    if (file.size > 10 * 1024 * 1024)
        return { line: null, error: "File too large" };

    const result = await processZip(file);
    if(result.error) return { line: null, error: result.error };

    const line: Line = { name: name, id: id, type: type, from: from, to: to };

    try {
        await addLine(line);
        return { line: line, error: null };
    } catch (error: any) {
        console.error("Failed to create line: ", error);
        return { line: null, error: error };
    }
}