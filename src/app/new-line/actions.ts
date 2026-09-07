'use server';

import { redirect } from "next/navigation";
import { addLine } from "@/actions/lines";

function isValidZipBuffer(buffer: Buffer) {
    return buffer[0] === 0x50 && buffer[1] === 0x4b;
}

export async function processZip(file: File): Promise<{ data: any, error: any }> {
    const buffer = Buffer.from(await file.arrayBuffer());

    if(!isValidZipBuffer(buffer))
        return { data: null, error: "Invalid zip file" };
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
        addLine(line);
        return { line: line, error: null };
    } catch (error: any) {
        console.error("Failed to create line: ", error);
        return { line: null, error: error };
    }
}