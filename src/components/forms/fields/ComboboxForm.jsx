import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import PropTypes from "prop-types";
import {useState} from "react";
import {cn} from "@/lib/utils.js";

ComboboxForm.propTypes = {
    form: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    description: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
}

export default function ComboboxForm({form, name, label, placeholder, type, description, values}) {
    const [open, setOpen] = useState(false)

    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Command className="relative overflow-visible">
                        <FormControl
                            onFocus={() => setOpen(true)}
                            onBlur={() => setOpen(false)}>
                            <CommandInput
                                glass={false}
                                role="combobox"
                                onInput={(e) => form.setValue(name, e.nativeEvent.target.value)}
                                placeholder={placeholder} type={type} {...field}
                                className={cn(
                                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                                    open ? "rounded-b-none focus-visible:ring-1 focus-visible:ring-ring" : "focus-visible:outline-0"
                                )}
                            />
                        </FormControl>
                        <CommandList
                            className={cn(
                                "absolute bottom-0 left-0 right-0 overflow-auto accent-red-300 translate-y-full",
                                open ? "block ring-1 ring-ring" : "hidden outline-0",
                                "bg-inherit z-50 border rounded-b-md border-t-0"
                            )}
                        >
                            <CommandEmpty>Не найдено</CommandEmpty>
                            <CommandGroup>
                                {values.map((item, index) => (
                                    <CommandItem
                                        value={item}
                                        key={index}
                                        onSelect={() => form.setValue(name, item)}
                                    >
                                        {item}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
