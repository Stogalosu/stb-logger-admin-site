'use server';

import { addLine } from "@/actions/lines";

export async function createLine(line: Line, paths: Path[]) {
    line.paths = paths;

    try {
        await addLine(line);
        return { error: null };
    } catch (error: any) {
        console.error("Failed to create line: ", error);
        return { error: error };
    }
}