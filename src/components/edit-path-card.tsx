import { Card, CardAction, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import LineIcon from "@/components/line-icon";
import { Button } from "@/components/ui/button";


export default function EditPathCard({ index, startStop, endStop, stops }: { index: number, startStop: Stop, endStop: Stop, stops: Stop[] }) {
    const stopsDisplay = stops.map(s => ({ value: `${s.name} (${s.id})`, label: `${s.name} (${s.id})` }));
    const startDisplay = { value: `${startStop.name} (${startStop.id})`, label: `${startStop.name} (${startStop.id})` };
    const endDisplay = { value: `${endStop.name} (${endStop.id})`, label: `${endStop.name} (${endStop.id})` };

    return (
        <Card>
            <CardContent className="flex flex-row gap-4 items-center">
                <span>{index + 1}.</span>
                <Combobox options={stopsDisplay} optionName="stop" defaultValue={startDisplay}/>
                <Combobox options={stopsDisplay} optionName="stop" defaultValue={endDisplay}/>
            </CardContent>
        </Card>
    );
}