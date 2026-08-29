import { TramFront, BusFront, SquareM } from "lucide-react";

export default function LineIcon({ line }: { line: Line }) {
    const type = line.type;
    switch(type) {
        case 'tram':
            return (<TramFront className="text-tram-red"/>);
        case 'trolleybus':
            return (<BusFront className="text-trolleybus-green"/>);
        case 'bus':
            return (<BusFront className="text-bus-blue"/>);
        case 'night-bus':
            return (<BusFront className="text-night-bus-blue"/>);
        case 'subway': {
            const name = line.name;
            const last = name.charAt(name.length - 1);
            const subwayColors: Record<string, string> = {
                '1': 'text-m1',
                '2': 'text-m2',
                '3': 'text-m3',
                '4': 'text-m4',
                '5': 'text-m5'
            };
            const color = subwayColors[last] ?? ""
            return (<SquareM className={color}/>);
        }
        default:
            return <BusFront/>;
    }
}