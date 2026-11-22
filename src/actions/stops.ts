'use server';

import { unstable_cache } from 'next/cache';
import { db } from '@/prisma/db';
import { point } from '@prisma/orm-extension-postgis/geojson';

const getStopsCache = (lastUpdatedTime: number) =>
    unstable_cache(
        async () => {
            const stops = await db.orm.public.Stop.all() as Stop[];
        },
        ['stops-cache', String(lastUpdatedTime)],
        { tags: ['stops'] }
    )();

export async function getStops() {
    const timeNow = Math.floor(Date.now() / 1000);
    let lastUpdatedMeta = await db.orm.public.Metadata.where({ key: 'stops_last_updated' }).first();
    if(lastUpdatedMeta == null) {
        await db.orm.public.Metadata.create({
            key: 'stops_last_updated',
            value: 'success'
        });
        lastUpdatedMeta = await db.orm.public.Metadata.where({ key: 'stops_last_updated' }).first();
    }
    const lastUpdatedTime = lastUpdatedMeta?.updatedAt ?? timeNow;

    return await getStopsCache(lastUpdatedTime);
}

export async function getStop(id: number) {
    const stops = await getStops();
    return stops.find(s => s.id == id);
}

export async function findClosestStop(targetLat: number, targetLon: number, subway = false) {
    const stop = db.sql.public.stops;
    const closestStopQuery = db.raw.sql`
        SELECT *
        FROM stops
        WHERE underground = ${subway}
        ORDER BY ST_AsGeoJSON(location) <-> ST_Point(${targetLat}, ${targetLon}, 4326)
        LIMIT 1;
    `
        .returnsRow({
            id: stop.columns.id,
            name: stop.columns.name,
            description: stop.columns.description,
            location: stop.columns.location,
            underground: stop.columns.underground
        })
        .build();

    const closestStops = await db.query(closestStopQuery) as Stop[];

    return closestStops[0];
}

export async function getStopsInRange(lat: number, lon: number, range: number) {
    const here = point(lat, lon, 4326);
    const stops = await db.orm.public.Stop.where((stop) =>
        and(stop.location.dwithin(here, 0.0095), stop.location.distanceSphere(here).lt(range))
    ).all() as Stop[];

    return stops;
}