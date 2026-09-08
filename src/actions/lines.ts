'use server';

import { collection, doc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { readParseJson, writeJson } from './files';

const filePath = path.join(process.cwd(), 'data', 'lines.json');
const tempFilePath = path.join(process.cwd(), 'data', 'temp-lines.json');

export async function getLines() {
    const linesFileJson = (await readParseJson(filePath)) as { lastUpdated: number, data: Line[] };

    const metadataRef = doc(db, "metadata", "list_updates");
    const metaSnap = await getDoc(metadataRef);

    const time = Math.floor(Date.now() / 1000);
    const lastUpdatedTime = metaSnap.data()?.linesLastUpdated as number ?? time;
    if(lastUpdatedTime >= linesFileJson.lastUpdated) {
        const lines = await fetchLines();
        linesFileJson.data = lines;
        await fs.writeFile(filePath, JSON.stringify(linesFileJson, null, 2), 'utf8');
        return lines;
    } else return linesFileJson.data;
}

async function fetchLines() {
    const snap = await getDocs(collection(db, "lines"));
    return snap.docs.map(doc => ({...doc.data()})) as Line[];
}

export async function addLine(line: Line) {
    const collectionRef = collection(db, "lines");
    await addDoc(collectionRef, line);
}

export async function getTempLines() {
    return (await readParseJson(tempFilePath)) as { [key: number]: Line };
}

export async function addTempLine(line: Line) {
    const tempLines = (await readParseJson(tempFilePath)) as { [key: number]: Line };

    tempLines[line.id] = line;

    await writeJson(tempFilePath, tempLines);
}

export async function removeTempLine(lineId: number) {
    const tempLines = (await readParseJson(tempFilePath)) as { [key: number]: Line };

    delete tempLines[lineId];

    await writeJson(tempFilePath, tempLines);
}