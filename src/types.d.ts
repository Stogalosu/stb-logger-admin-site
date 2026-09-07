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
    type: Type;
    from: string;
    to: string;
}

interface Stop {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    type: number;
}

interface Path {
    startId: number;
    endId: number;
}