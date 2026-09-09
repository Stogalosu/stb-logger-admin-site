'use client';

import EditPathCard from "@/components/edit-path-card";
import { useNewLineContext } from "../../_context/new-line-context";
import { getStop } from "@/actions/stops";

export default function EditPaths({ stops }: { stops: Stop[] }) {
    const context: NewLineContextType = useNewLineContext();
    const paths = context.data.paths ?? [];
    const startStops = paths.map(p => stops.find(s => s.id == p.startId) ?? stops[0]);

    return (
        <div className="flex flex-col h-full w-[50vw] items-center overflow-y-auto">
            {paths.map((path, i) => (
                <EditPathCard key={i} stop={startStops[i]} stops={stops}/>
            ))}
        </div>
    );
}