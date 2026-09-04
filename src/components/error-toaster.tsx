'use client';

import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function ErrorToaster({ error }: { error: string | undefined }) {
    const router = useRouter();

    useEffect(() => {
        if (error === 'line-not-found') {
            toast.add({
                type: "error",
                title: "Line not found!",
                priority: "high",
            });

            router.replace('/');
        }
    }, [error, router]);

    return null;
}