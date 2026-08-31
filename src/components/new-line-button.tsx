'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewLineButton() {
    const router = useRouter();

    function onClick() {
        router.push('/new-line');
    }

    return (
        <Button onClick={onClick} className="absolute h-14 w-28 bottom-8 right-8 border-1 border-foreground/5 dark:border-foreground/10 shadow-lg hover:shadow-xl transition-shadow">
            <Plus/>
            New line
        </Button>
    );
}