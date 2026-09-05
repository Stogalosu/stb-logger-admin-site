'use server';

import { redirect } from "next/navigation";
import { getLines, addLine } from "@/actions/lines";

export default async function createNewLine(formData: FormData): Promise<{line: Line, error: any}> {
    const name = String(formData.get('name'));
    const id = Number(formData.get('id'));
    const type = formData.get('type') as LineType;
    const from = String(formData.get('from'));
    const to = String(formData.get('to'));

    const line: Line = { name: name, id: id, type: type, from: from, to: to };

    try {
        addLine(line);
        return { line: line, error: null };
    } catch (error: any) {
        console.error("Failed to create line: ", error);
        return { line: line, error: error };
    }
}