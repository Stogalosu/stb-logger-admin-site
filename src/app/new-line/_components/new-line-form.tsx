'use client';

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
import createNewLine from "../actions";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


export default function NewLineForm() {
    const router = useRouter();

    const types = [
        { label: "Tram", value: "tram" },
        { label: "Trolleybus", value: "trolleybus" },
        { label: "Bus", value: "bus" },
        { label: "Night Bus", value: "night-bus" },
        { label: "Subway", value: "subway" }
    ];

    function onSubmit(formData: FormData) {
        const onSubmitPromise = new Promise(async (resolve, reject) => {
            try {
                const result = await createNewLine(formData);
                if (result?.error) {
                    reject(new Error(result.error));
                    return;
                }
                router.replace(`/?lineId=${result.line.id}`);
                resolve(result.line);
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(
            onSubmitPromise,
            {
                loading: "Creating line…",
                success: (data: any) => `Line ${data.name} created!`,
                error: (e) => `Failed to create line: ${e}`,
            }
        )
    }

    return (
        <form action={onSubmit} className="w-full max-w-sm">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="311"
                        required
                    />
                    <FieldDescription>This is pretty self-explanatory</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="id">Line ID</FieldLabel>
                    <div className="flex flex-row gap-4">
                        <Input
                            id="id"
                            name="id"
                            type="number"
                            placeholder="136"
                            required
                        />
                        <Button type="button" variant="secondary">Get from STB DB</Button>
                    </div>
                    <FieldDescription>Autocomplete is WIP</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="type">Type</FieldLabel>
                    <Select items={types} id="type" name="type">
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
                        <FieldLabel htmlFor="from">From</FieldLabel>
                        <Input
                            id="from"
                            name="from"
                            type="text"
                            placeholder="Faur"
                            required
                        />
                        <FieldDescription>Start of route</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="to">To</FieldLabel>
                        <Input
                            id="to"
                            name="to"
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
    );
}