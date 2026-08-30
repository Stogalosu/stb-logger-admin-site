'use client';

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LineMap({ line }: { line: Line }) {
    const router = useRouter();

    function onClose() {
        router.push('/');
    }
    
    return (
        <div className="flex flex-col flex-1 h-full p-8 justify-center items-center relative">
            <Button variant="outline" size="icon" className="absolute top-4 right-4" onClick={onClose}>
                <X/>
            </Button>
            <p>Map</p>
        </div>
    );
}