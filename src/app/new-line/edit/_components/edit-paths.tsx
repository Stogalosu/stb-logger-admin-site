'use client';

import EditPathCard from "@/components/edit-path-card";
import { useNewLineContext } from "../../_context/new-line-context";
import { getStop } from "@/actions/stops";
import { Button } from "@/components/ui/button";
import { processFormData } from "@/app/new-line/create/actions";
import { toast } from "@/components/ui/toast";
import { createLine } from "../actions";
import { useRouter } from "next/navigation";

export default function EditPaths({ stops }: { stops: Stop[] }) {
    const context: NewLineContextType = useNewLineContext();
    const paths = context.data.paths ?? [];
    const startStops = paths.map(p => stops.find(s => s.id == p.startId) ?? stops[0]);
    const endStops = paths.map(p => stops.find(s => s.id == p.endId) ?? stops[0]);
    const router = useRouter();

    console.log(context.data);

    function onCreate() {
        const onSubmitPromise = new Promise(async (resolve, reject) => {
            try {
                const result = await createLine(context.data.line!!, context.data.paths!!);
                if (result?.error) {
                    reject(new Error(result.error));
                    return;
                }
                router.push(`/?lineId=${context.data.line!!.id}`);
                resolve(context.data.line!!);
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(
            onSubmitPromise,
            {
                loading: "Creating line…",
                success: (line: any) => `Created line ${line?.name}`,
                error: (e) => `Failed to create line: ${e}`,
            }
        )
    }

    return (
        <div className="flex flex-col h-full w-full items-center overflow-y-auto px-12 py-8 gap-4">
            <p className="text-2xl font-bold pb-8">Edit paths</p>
            {paths.map((path, i) => (
                <EditPathCard key={i} index={i} startStop={startStops[i]} endStop={endStops[i]} stops={stops}/>
            ))}
            <div className="flex p-4"/>
            <Button variant="default" onClick={onCreate}>
                Create line
            </Button>
        </div>
    );
}