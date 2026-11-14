'use server';

import { collection, doc,  getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { unstable_cache } from 'next/cache';

const getStopsCache = (lastUpdatedTime: number) =>
    unstable_cache(
        async () => {
            const snap = await getDocs(collection(db, 'stops'));
            return snap.docs.map(doc => ({...doc.data()})) as Stop[];
        },
        ['stops-cache', String(lastUpdatedTime)],
        { tags: ['stops'] }
    )();

export async function getStops() {
    const metadataRef = doc(db, "metadata", "list_updates");
    const metaSnap = await getDoc(metadataRef);

    const timeNow = Math.floor(Date.now() / 1000);
    const lastUpdatedTime = metaSnap.data()?.stopsLastUpdated as number ?? timeNow;

    return await getStopsCache(lastUpdatedTime);
}

export async function getStop(id: number) {
    const stops = await getStops();
    return stops.find(s => s.id == id);
}

export async function findClosestStop(targetLat: number, targetLon: number, subway = 0) {
    const nullStop: Stop = {
        id: 0,
        name: "",
        description: "",
        latitude: 0,
        longitude: 0,
        type: 0
    }
    const stops = await getStops();
    const result =  stops.reduce<{ obj: Stop, diff: number }>((closest, obj) => {
        const diff = Math.sqrt(
            Math.pow(obj.latitude - targetLat, 2) +
            Math.pow(obj.longitude - targetLon, 2)
        );
        if (diff >= closest.diff) return closest;
        if (subway && obj.type !== 1) return closest;
        return { obj, diff };
    }, {obj: nullStop, diff: Infinity});

    return result.obj;
}

export async function getStopsInRange(lat: number, lon: number, range: number) {
    const stops = await getStops();
    let result: Stop[] = [];
    stops.forEach((stop: Stop) => {
        const dist = Math.sqrt(
            Math.pow(stop.latitude - lat, 2) +
            Math.pow(stop.longitude - lon, 2)
        );
        if (dist < range) result.push(stop);
    });
    return result;
}