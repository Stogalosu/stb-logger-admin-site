import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function NewLine() {
    const types = [
        { label: "Tram", value: "tram" },
        { label: "Trolleybus", value: "trolleybus" },
        { label: "Bus", value: "bus" },
        { label: "Night Bus", value: "night-bus" },
        { label: "Subway", value: "subway" }
    ]
    return (
        <div className="flex flex-col h-full w-full items-center relative">
            <div className="flex flex-col h-full w-[50vw] items-center overflow-y-auto">
                <p className="text-2xl font-bold pt-8 pb-8">New Line</p>
                <form className="w-full max-w-sm">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="form-name">Name</FieldLabel>
                            <Input
                                id="form-name"
                                type="text"
                                placeholder="311"
                                required
                            />
                            <FieldDescription>This is pretty self-explanatory</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="form-id">Line ID</FieldLabel>
                            <div className="flex flex-row gap-4">
                                <Input
                                    id="form-name"
                                    type="number"
                                    placeholder="136"
                                    required
                                />
                                <Button variant="secondary">Get from STB DB</Button>
                            </div>
                            <FieldDescription>Autocomplete is WIP</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="form-id">Type</FieldLabel>
                            <Select items={types}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Bus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {types.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <div className="flex flex-row gap-8">
                            <Field>
                                <FieldLabel htmlFor="form-from">From</FieldLabel>
                                <Input
                                    id="form-from"
                                    type="text"
                                    placeholder="Faur"
                                    required
                                />
                                <FieldDescription>Start of route</FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="form-to">To</FieldLabel>
                                <Input
                                    id="form-to"
                                    type="text"
                                    placeholder="Sala Palatului"
                                    required
                                />
                                <FieldDescription>End of route</FieldDescription>
                            </Field>
                        </div>
                        <Field className="self-center w-25 pt-8">
                            <Button type="submit" variant="default" >
                                Create
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
}