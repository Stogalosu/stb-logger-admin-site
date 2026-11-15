'use server';

import { collection, doc, addDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { unstable_cache } from 'next/cache';

const getLinesCache = (lastUpdatedTime: number) =>
    unstable_cache(
        async () => {
            const snap = await getDocs(collection(db, "lines"));
            return snap.docs.map(doc => ({ ...doc.data() })) as Line[];
        },
        ['lines-cache', String(lastUpdatedTime)],
        { tags: ['lines'] }
    )();

export async function getLines() {
    const metadataRef = doc(db, "metadata", "list_updates");
    const metaSnap = await getDoc(metadataRef);

    const timeNow = Math.floor(Date.now() / 1000);
    const lastUpdatedTime = metaSnap.data()?.linesLastUpdated as number ?? timeNow;

    return await getLinesCache(lastUpdatedTime);
}

export async function addLine(line: Line) {
    const collectionRef = collection(db, "lines");
    await addDoc(collectionRef, line);

    const metadataRef = doc(db, "metadata", "list_updates");
    await updateDoc(metadataRef, {
        linesLastUpdated: Math.floor(Date.now() / 1000)
    });
}