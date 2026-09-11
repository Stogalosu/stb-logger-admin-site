'use server';

import { collection, doc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from 'next/cache';

const getLineUpdateCache = unstable_cache(
    async () => { return Math.floor(Date.now() / 1000); },
    ['lines-updated-cache'],
    { tags: ['lines-updated'] }
);

export async function getLines() {
    const metadataRef = doc(db, "metadata", "list_updates");
    const metaSnap = await getDoc(metadataRef);

    const time = Math.floor(Date.now() / 1000);
    const lastUpdatedTime = metaSnap.data()?.linesLastUpdated as number ?? time;
    const lastUpdateCache = await getLineUpdateCache();
    if(lastUpdatedTime >= lastUpdateCache) {
        updateTag('lines');
        updateTag('lines-updated');
        await getLineUpdateCache();
    }

    return await getLinesCache();
}

const getLinesCache = unstable_cache(
    async () => {
        const snap = await getDocs(collection(db, "lines"));
        return snap.docs.map(doc => ({...doc.data()})) as Line[];
    },
    ['lines-cache'],
    { tags: ['lines'] }
);

export async function addLine(line: Line) {
    const collectionRef = collection(db, "lines");
    await addDoc(collectionRef, line);
}