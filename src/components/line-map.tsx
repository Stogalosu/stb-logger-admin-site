'use client';

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";

export default function LineMap({ line }: { line: Line | undefined }) {
    const router = useRouter();

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
            <div className="flex flex-col flex-1 h-full p-8 justify-center items-center relative">
                <Button variant="outline" size="icon" className="absolute top-4 right-4" onClick={onClose}>
                    <X/>
                </Button>
                <p>Map</p>
            </div>
        );
    else return (
        <div className="flex flex-col flex-1 h-full p-8 justify-center items-center relative">
            <p>Line not found!</p>
        </div>
    );
}