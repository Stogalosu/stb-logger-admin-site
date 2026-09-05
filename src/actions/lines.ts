import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getLines() {
    try {
        const snap = await getDocs(collection(db, 'lines'));
        return snap.docs.map(doc => ({...doc.data()})) as Line[];
    } catch(e) {
        throw e;
    }
}

export async function addLine(line: Line) {
    try {
        const collectionRef = collection(db, "lines");
        await addDoc(collectionRef, line);
    } catch(e) {
        throw e;
    }
}