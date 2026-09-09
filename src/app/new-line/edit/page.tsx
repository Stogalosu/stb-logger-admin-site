import EditPaths from "./_components/edit-paths";
import { getStops } from "@/actions/stops";

export default async function EditNewLine() {
    const stops = await getStops();

    return (
        <div className="flex flex-col h-full w-full items-center relative">
            <EditPaths stops={ stops }/>
        </div>
    );
}