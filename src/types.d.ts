import { Geometry } from '@prisma/orm-extension-postgis/geojson';

declare enum LineType {
    Tram = "tram",
    Trolleybus = "trolleybus",
    Bus = "bus",
    NightBus = "night-bus",
    Subway = "subway"
}

interface Line {
    id: number;
    name: string;
    type: LineType;
}

interface Stop {
    id: number;
    name: string;
    description: string | null;
    location: Geometry;
    underground: boolean;
}

interface Path {
    startId: number;
    endId: number;
}

interface NewLineData {
    line: Line | null;
    paths: Path[] | null;
}

interface NewLineContextType {
    data: NewLineData;
    setData: (data: NewLineData) => void;
    clearCache: () => void;
}