'use server';

import { redirect } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function createNewLine(formData: FormData) {
    const name = String(formData.get('name'));
    const id = Number(formData.get('id'));
    const type = formData.get('type') as LineType;
    const from = String(formData.get('from'));
    const to = String(formData.get('to'));

    const line: Line = { name: name, id: id, type: type, from: from, to: to };

    try {
        const collectionRef = collection(db, "lines");
        const docRef = await addDoc(collectionRef, line);
    } catch (error) {
        redirect(`/?error=failed-create`);
    }

    redirect(`/?lineId=${id}&s=created-line`);
}