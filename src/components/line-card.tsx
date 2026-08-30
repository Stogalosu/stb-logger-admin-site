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

export default function LineCard({ line, selected }: { line: Line, selected: boolean }) {
    function onView() {
        redirect(`/?lineId=${line.id}`);
    }

    const cardCSS: Record<boolean, string> = {
        false: 'w-full max-w-md shrink-0',
        true: 'w-full max-w-md shrink-0 border-1 border-primary'
    };

    return (
        <Card className={cardCSS[selected]}>
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