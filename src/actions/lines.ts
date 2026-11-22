'use server';

import { unstable_cache } from 'next/cache';
import { db } from '@/prisma/db';

const getLinesCache = (lastUpdatedTime: number) =>
    unstable_cache(
        async () => {
            return await db.orm.public.Line.all() as Line[];
        },
        ['lines-cache', String(lastUpdatedTime)],
        { tags: ['lines'] }
    )();

export async function getLines() {
    const timeNow = Math.floor(Date.now() / 1000);
    const lastUpdatedMeta = await db.orm.public.Metadata.where({ key: 'lines_last_updated' }).first();
    const lastUpdatedTime = lastUpdatedMeta?.updatedAt ?? timeNow;

    return await getLinesCache(lastUpdatedTime);
}

// export async function addLine(line: Line) {
//     const collectionRef = collection(db, "lines");
//     await addDoc(collectionRef, line);
//
//     await db.orm.public.Line.create({
//         id: line.id,
//         name: line.name,
//         type: line.type,
//         /* TODO RouteVariants */
//     });
//
//     await db.orm.public.Metadata.upsert({
//         create: { key: 'lines_last_updated', value: 'success' },
//         update: { value: 'success' },
//         conflictOn: { key: 'lines_last_updated' }
//     });
// }