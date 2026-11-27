'use server';

import { parseGPXWithCustomParser, GeoJSON } from "@we-gold/gpxjs";
import { DOMParser } from "xmldom-qsa";
import { Geometry } from "@prisma/orm-extension-postgis/geojson";

async function processGpx(outboundFile: File, inboundFile: File): Promise<{ data: { outbound: RouteVariant, inbound: RouteVariant } | null, error: any }> {
    const outboundGpx = await outboundFile.text();
    const inboundGpx = await inboundFile.text();
    const customParseMethod = (txt: string): Document | null => {
        return new DOMParser().parseFromString(txt, "text/xml");
    }

    const [parsedOutbound, errorO] = parseGPXWithCustomParser(outboundGpx, customParseMethod);
    const [parsedInbound, errorI] = parseGPXWithCustomParser(inboundGpx, customParseMethod);
    if(errorO)
        return { data: null, error: `Could not parse outbound GPX file: ${errorO}` };
    if(errorI)
        return { data: null, error: `Could not parse inbound GPX file: ${errorI}` };
    const outboundGeoJson = parsedOutbound.toGeoJSON();
    const inboundGeoJson = parsedInbound.toGeoJSON();

    if(outboundGeoJson.features.length != 1)
        return { data: null, error: 'Outbound GPX doesn\'t have exactly one feature!' };
    if(outboundGeoJson.features[0].geometry.type != 'LineString')
        return { data: null, error: 'Outbound GPX has no LineString feature!' };

    if(inboundGeoJson.features.length != 1)
        return { data: null, error: 'Inbound GPX doesn\'t have exactly one feature!' };
    if(inboundGeoJson.features[0].geometry.type != 'LineString')
        return { data: null, error: 'Inbound GPX has no LineString feature!' };

    const outboundGeometry = {
        type: outboundGeoJson.features[0].geometry.type,
        coordinates: outboundGeoJson.features[0].geometry.coordinates,
        srid: 4326
    } as Geometry;
    const outboundVariant: RouteVariant = {
        id: 0,
        lineId: 0,
        direction: 'outbound',
        name: 'Main Outbound',
        scheduleType: 'daily',
        path: outboundGeometry
    };

    const inboundGeometry = {
        type: inboundGeoJson.features[0].geometry.type,
        coordinates: inboundGeoJson.features[0].geometry.coordinates,
        srid: 4326
    } as Geometry;
    const inboundVariant: RouteVariant = {
        id: 0,
        lineId: 0,
        direction: 'inbound',
        name: 'Main Inbound',
        scheduleType: 'daily',
        path: inboundGeometry
    };

    return { data: { outbound: outboundVariant, inbound: inboundVariant }, error: null };
}

export async function processFormData(formData: FormData): Promise<{ data: { outbound: RouteVariant, inbound: RouteVariant } | null, error: any }> {
    const name = String(formData.get('name'));
    const id = Number(formData.get('id'));
    const type = formData.get('type') as LineType;
    const from = String(formData.get('from'));
    const to = String(formData.get('to'));

    const outbound = formData.get("outbound") as File;
    const inbound = formData.get("inbound") as File;

    // Server-side file checking
    if (!outbound || outbound.size === 0)
        return { data: null, error: "No outbound file uploaded" };
    if (!inbound || inbound.size === 0)
        return { data: null, error: "No inbound file uploaded" };

    if (!outbound.name.toLowerCase().endsWith(".gpx") || !inbound.name.toLowerCase().endsWith(".gpx"))
        return { data: null, error: "Files must have a .gpx extension" };

    if (outbound.size > 10 * 1024 * 1024 || inbound.size > 10 * 1024 * 1024)
        return { data: null, error: "File too large" };

    const { data: variants, error: error } = await processGpx(outbound, inbound);
    if(error) return { data: null, error: error };

    return { data: variants, error: null };
}