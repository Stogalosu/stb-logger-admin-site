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

interface RouteVariant {
    id: number;
    lineId: number;
    direction: string;
    name: string;
    scheduleType: string;
    path: Geometry;
}

interface Stop {
    id: number;
    name: string;
    description: string | null;
    location: Geometry;
    underground: boolean;
}

interface RouteStop {
    variantId: number;
    stopId: number;
    sequence: number;
    fraction: number;
}

interface NewLineData {
    outbound: RouteVariant | null;
    inbound: RouteVariant | null;
    routeStops: RouteStop[] | null;
}

interface NewLineContextType {
    data: NewLineData;
    setData: (data: NewLineData) => void;
    clearCache: () => void;
}