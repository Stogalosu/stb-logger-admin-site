'use server';

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getLines() {
    const snap = await getDocs(collection(db, 'lines'));
    return snap.docs.map(doc => ({...doc.data()})) as Line[];
}

export async function addLine(line: Line) {
    const collectionRef = collection(db, "lines");
    await addDoc(collectionRef, line);
}