'use client';

import { Card, CardAction, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import LineIcon from "@/components/line-icon";
import { Button } from "@/components/ui/button";
import { useNewLineContext } from "@/app/new-line/_context/new-line-context";


export default function EditPathCard({ index, startStop, endStop, stops }: { index: number, startStop: Stop, endStop: Stop, stops: Stop[] }) {
    const context = useNewLineContext();
    const stopsDisplay = stops.map(s => ({ value: `${s.name} (${s.id})`, label: `${s.name} (${s.id})` }));
    const startDisplay = { value: `${startStop.name} (${startStop.id})`, label: `${startStop.name} (${startStop.id})` };
    const endDisplay = { value: `${endStop.name} (${endStop.id})`, label: `${endStop.name} (${endStop.id})` };

    function onStartChange(newValue: { value: string, label: string }) {
        if (!context.data.paths) return;
        const id = Number(newValue.value.split('(')[1].split(')')[0]);
        const newPaths = [...context.data.paths];
        newPaths[index] = { ...newPaths[index], startId: id };
        context.setData({ ...context.data, paths: newPaths });
    }

    function onEndChange(newValue: { value: string, label: string }) {
        if (!context.data.paths) return;
        const id = Number(newValue.value.split('(')[1].split(')')[0]);
        const newPaths = [...context.data.paths];
        newPaths[index] = { ...newPaths[index], endId: id };
        context.setData({ ...context.data, paths: newPaths });
    }

    return (
        <Card className="shrink-0">
            <CardContent className="flex flex-row gap-4 items-center">
                <span>{index + 1}.</span>
                <Combobox
                    options={stopsDisplay}
                    optionName="stop"
                    defaultValue={startDisplay}
                    onValueChange={onStartChange}
                />
                <Combobox
                    options={stopsDisplay}
                    optionName="stop"
                    defaultValue={endDisplay}
                    onValueChange={onEndChange}
                />
            </CardContent>
        </Card>
    );
}