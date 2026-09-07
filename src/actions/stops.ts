import { collection, doc,  getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

const filePath = path.join(process.cwd(), 'data', 'stops.json');

async function ensureFileExists() {
    const dirPath = path.dirname(filePath);
    try {
        await fs.mkdir(dirPath, { recursive: true });
        await fs.access(filePath);
    } catch {
        const time = Math.floor(Date.now() / 1000);
        await fs.writeFile(filePath, JSON.stringify({ lastUpdated: time, data: []}), 'utf8');
    }
}

export async function getStops() {
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