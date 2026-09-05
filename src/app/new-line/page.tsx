import NewLineForm from "./_components/new-line-form";

export default function NewLine() {
    return (
        <div className="flex flex-col h-full w-full items-center relative">
            <div className="flex flex-col h-full w-[50vw] items-center overflow-y-auto">
                <p className="text-2xl font-bold pt-8 pb-8">New Line</p>
                <NewLineForm/>
            </div>
        </div>
    );
}