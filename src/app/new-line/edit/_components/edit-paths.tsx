'use client';

import EditPathCard from "@/components/edit-path-card";
import { useNewLineContext } from "../../_context/new-line-context";
import { getStop } from "@/actions/stops";

export default function EditPaths({ stops }: { stops: Stop[] }) {
    const context: NewLineContextType = useNewLineContext();
    const paths = context.data.paths ?? [];
    const startStops = paths.map(p => stops.find(s => s.id == p.startId) ?? stops[0]);
    const endStops = paths.map(p => stops.find(s => s.id == p.endId) ?? stops[0]);

    return (
        <div className="flex flex-col h-full w-[50vw] items-center overflow-y-auto px-12 py-8">
            <p className="text-2xl font-bold pb-8">Edit paths</p>
            {paths.map((path, i) => (
                <EditPathCard key={i} index={i} startStop={startStops[i]} endStop={endStops[i]} stops={stops}/>
            ))}
        </div>
    );
}