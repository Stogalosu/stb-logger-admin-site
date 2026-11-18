'use client';

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import { useRef } from "react";
import MapProvider from "@/lib/mapbox/provider";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

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

    if (line != undefined)
        return (
            <div className="relative flex flex-col flex-1 h-full min-h-0 p-8">
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={onClose}
                >
                    <X/>
                </Button>


                <div className="flex flex-row gap-6 justify-around">
                    <Card className="w-full max-w-[40%] p-10">
                        <CardTitle>
                            <p className="text-5xl font-bold">Line {line.name}</p>
                        </CardTitle>
                        <CardContent>

                        </CardContent>
                        <span className="text-lg">Type: {line.type}</span>
                        <span className="text-lg">Terminus 1: {line.from}</span>
                        <span className="text-lg">Terminus 2: {line.to}</span>
                        <span className="text-lg">Length: WIP</span>
                        <span className="text-lg">Number of stops: {startStops.length}</span>
                    </Card>

                    <Card className="w-100 self-end rounded-4xl">
                        <CardContent>
                            <div
                                id="map-container"
                                ref={mapContainerRef}
                                className="h-full w-full rounded-2xl aspect-square"
                            />
                            <MapProvider
                                mapContainerRef={mapContainerRef}
                                initialViewState={{
                                    longitude: 26.102527,
                                    latitude: 44.435511,
                                    zoom: 10,
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-1 flex-col items-center p-4 overflow-y-auto">
                    <p className="text-2xl font-bold pb-4">Stops:</p>
                    {startStops.map((p, i) => (
                        <span key={i}>{p?.name}</span>
                    ))}
                </div>
            </div>
        );
    else return (
        <div className="flex flex-col flex-1 h-full p-8 justify-center items-center relative">
            <p>Line not found!</p>
        </div>
    );
}