'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface NewLineData {
    line: Line | null;
    paths: Path[] | null;
}

interface NewLineContextType {
    data: NewLineData;
    setData: (data: NewLineData) => void;
}

const NewLineContext = createContext<NewLineContextType | null>(null);

export function NewLineProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<NewLineData>({ line: null, paths: null });
    return (
        <NewLineContext value={{ data, setData }}>
            { children }
        </NewLineContext>
    );
}

export function useNewLineContext() {
    const ctx = useContext(NewLineContext);
    if (!ctx) throw new Error("useNewLineContext must be used within NewLineProvider");
    return ctx;
}