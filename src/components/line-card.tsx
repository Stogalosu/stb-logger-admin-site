'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LineIcon from "@/components/line-icon";
import { redirect } from "next/navigation";

export default function LineCard({ line }: { line: Line }) {
    function onView() {
        redirect(`/?lineId=${line.id}`);
    }
    return (
        <Card className="w-full max-w-md shrink-0">
            <CardHeader>
                <CardTitle className="flex flex-row gap-2">
                    <LineIcon line={line}/>
                    Line {line.name}
                </CardTitle>
                <CardDescription >{line.from} - {line.to}</CardDescription>
                <CardAction className="flex flex-col items-center gap-1">
                    <Button variant="link" onClick={onView}>View</Button>
                    <Button>Edit</Button>
                </CardAction>
            </CardHeader>
        </Card>
    );
}