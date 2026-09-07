'use server';

import { collection, doc,  getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { ensureFileExists } from './files';

const filePath = path.join(process.cwd(), 'data', 'stops.json');

export async function getStops() {
    await ensureFileExists(filePath);
    const stopsFile = await fs.readFile(filePath, 'utf8');
    const stopsFileJson = JSON.parse(stopsFile) as { lastUpdated: number, data: Stop[] };

    const metadataRef = doc(db, "metadata", "list_updates");
    const metaSnap = await getDoc(metadataRef);

    const time = Math.floor(Date.now() / 1000);
    const lastUpdatedTime = metaSnap.data()?.stopsLastUpdated as number ?? time;
    if(lastUpdatedTime >= stopsFileJson.lastUpdated) {
        const stops = await fetchStops();
        stopsFileJson.data = stops;
        await fs.writeFile(filePath, JSON.stringify(stopsFileJson, null, 2), 'utf8');
        return stops;
    } else return stopsFileJson.data;

}

async function fetchStops() {
    const snap = await getDocs(collection(db, 'stops'));
    return snap.docs.map(doc => ({...doc.data()})) as Stop[];
}

export async function findClosestStop(targetLat: number, targetLon: number, subway = 0) {
    const stops = await getStops();
    const result =  stops.reduce<{ obj: Stop | null, diff: number }>((closest, obj) => {
        const diff = Math.sqrt(
            Math.pow(obj.latitude - targetLat, 2) +
            Math.pow(obj.longitude - targetLon, 2)
        );
        if (diff >= closest.diff) return closest;
        if (subway && obj.type !== 1) return closest;
        return { obj, diff };
    }, {obj: null, diff: Infinity});

    return result.obj;
}

export async function getStopsInRange(lat: number, lon: number, range: number) {
    const stops = await getStops();
    let result: Stop[] = [];
    stops.forEach((stop: Stop) => {
        const dist = Math.sqrt(
            Math.pow(stop.latitude - lat, 2) +
            Math.pow(stop.longitude - lon, 2)
        );
        if (dist < range) result.push(stop);
    });
    return result;
}