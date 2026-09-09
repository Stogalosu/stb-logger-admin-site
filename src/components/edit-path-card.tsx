import { Card, CardAction, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import LineIcon from "@/components/line-icon";
import { Button } from "@/components/ui/button";


export default function EditPathCard({ stop, stops }: { stop: Stop, stops: Stop[] }) {
    const stopsDisplay = stops.map(s => ({ value: `${s.name} (${s.id})`, label: `${s.name} (${s.id})` }));
    const stopDisplay = { value: `${stop.name} (${stop.id})`, label: `${stop.name} (${stop.id})` };

    return (
        <Card>
            <CardContent className="flex flex-row gap-4">
                <Combobox options={stopsDisplay} optionName="stop" defaultValue={stopDisplay}></Combobox>
            </CardContent>
        </Card>
    );
}