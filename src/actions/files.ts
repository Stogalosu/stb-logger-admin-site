import path from 'path';
import fs from 'fs/promises';

export async function ensureFileExists(filePath: string) {
    const dirPath = path.dirname(filePath);
    try {
        await fs.mkdir(dirPath, { recursive: true });
        await fs.access(filePath);
    } catch {
        const time = Math.floor(Date.now() / 1000);
        await fs.writeFile(filePath, JSON.stringify({ lastUpdated: time, data: []}), 'utf8');
    }
}

export async function readParseJson(filePath: string) {
    await ensureFileExists(filePath);
    const file = await fs.readFile(filePath, 'utf8');
    return JSON.parse(file);
}

export async function writeJson(filePath: string, json: any) {
    await fs.writeFile(filePath, JSON.stringify(filePath, null, 2), 'utf8');
}