'use client';

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import { useRef } from "react";
import MapProvider from "@/lib/mapbox/provider";

export default function LineMap({ line, stops }: { line: Line | undefined, stops: Stop[] }) {
    const router = useRouter();
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const startStops = line?.paths.map(p => stops.find(s => s.id == p.startId)) ?? [];
    const endStops = line?.paths.map(p => stops.find(s => s.id == p.endId)) ?? [];

    startStops.push(endStops[endStops.length - 1]);

    function onClose() {
        router.replace('/');
    }

    useEffect(() => {
        if (line == undefined) {
            router.replace('/?err=line-not-found');
        }
    }, [line, router]);

    if(line != undefined)
        return (
            <div className="flex flex-col flex-1 h-full p-10 justify-center items-center relative">
                <Button variant="outline" size="icon" className="absolute top-2 right-2" onClick={onClose}>
                    <X/>
                </Button>
                    {/*<div*/}
                    {/*    id="map-container"*/}
                    {/*    ref={mapContainerRef}*/}
                    {/*    className="absolute inset-0 h-full w-full"*/}
                    {/*/>*/}
                    {/*<MapProvider*/}
                    {/*    mapContainerRef={mapContainerRef}*/}
                    {/*    initialViewState={{*/}
                    {/*        longitude: 26.102527,*/}
                    {/*        latitude: 44.435511,*/}
                    {/*        zoom: 10,*/}
                    {/*    }}*/}
                    {/*/>*/}
                <p className="text-2xl font-bold pb-8">Stops:</p>
                {startStops.map((p, i) => (
                    <span key={i}>{p?.name}</span>
                ))}
            </div>
        );
    else return (
        <div className="flex flex-col flex-1 h-full p-8 justify-center items-center relative">
            <p>Line not found!</p>
        </div>
    );
}