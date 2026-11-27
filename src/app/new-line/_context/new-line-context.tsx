'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const NewLineContext = createContext<NewLineContextType | null>(null);

export function NewLineProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<NewLineData>({ outbound: null, inbound: null, routeStops: null });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('new-line-context-data');
        if(savedData)
            try {
                setData(JSON.parse(savedData));
            } catch {
                console.log('Failed to parse saved wizard data!');
            }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if(isInitialized)
            localStorage.setItem('new-line-context-data', JSON.stringify(data));
    }, [data, isInitialized]);

    const clearCache = () => {
        localStorage.removeItem('new-line-context-data');
    };

    return (
        <NewLineContext value={{ data, setData, clearCache }}>
            { children }
        </NewLineContext>
    );
}

export function useNewLineContext() {
    const ctx = useContext(NewLineContext);
    if (!ctx) throw new Error("useNewLineContext must be used within NewLineProvider");
    return ctx;
}