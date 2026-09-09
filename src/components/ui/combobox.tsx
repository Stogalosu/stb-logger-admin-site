"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";

interface Option {
    value: string;
    label: string
}

export function Combobox({ options, optionName, defaultValue }: { options: Option[], optionName: string, defaultValue: Option }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue.value);
    const [searchQuery, setSearchQuery] = useState("");
    const selected = options.find((f) => f.value === value);
    const placeholder = `Search ${optionName}…`;

    const isSearchEmpty = searchQuery.trim().length == 0

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button variant="outline" role="combobox" aria-expanded={open} />
                }
            >
                {selected ? selected.label : defaultValue.label}
                <ChevronsUpDown className="ml-2 size-4 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder={placeholder}
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                    />
                    <CommandList>
                        {!isSearchEmpty && <CommandEmpty>No {optionName} found.</CommandEmpty>}
                        {!isSearchEmpty &&
                            <CommandGroup>
                                {options.map((f) => (
                                    <CommandItem
                                        key={f.value}
                                        value={f.value}
                                        onSelect={(v) => {
                                            setValue(v === value ? "" : v)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={value === f.value ? "mr-2 size-4" : "mr-2 size-4 opacity-0"}
                                        />
                                        {f.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        }
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}