'use client';

import { useEffect, useRef } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ParamsToaster({ success, error }: { success: string | undefined, error: string | undefined }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const triggered = useRef(false);

    useEffect(() => {
        if ((!success && !error) || triggered.current) return;
        triggered.current = true;

        // switch(success) {
        //
        // }

        switch(error) {
            case 'line-not-found':
                toast.add({
                    type: "error",
                    title: "Line not found!",
                    priority: "high",
                });
                break;
        }

        const params = new URLSearchParams(searchParams.toString());

        params.delete('s');
        params.delete('err')

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(newUrl, { scroll: false });
    }, [success, error, router]);

    return null;
}