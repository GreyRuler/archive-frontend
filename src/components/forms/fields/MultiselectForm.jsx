import PropTypes from "prop-types";
import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Command, CommandEmpty, CommandGroup, CommandInput} from "@/components/ui/command.jsx";
import {cn} from "@/lib/utils.js";
import {Badge} from "@/components/ui/badge"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useFormContext} from "react-hook-form";
import {v4 as uuidv4} from 'uuid';
import MultiselectItem from "@/components/forms/fields/MultiselectItem.jsx";

MultiselectForm.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string),
}

export default function MultiselectForm({name, description, list}) {
    const {setValue, control} = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => {
                const selectedNames = field.value.map(item => item.name);
                const onDelete = (value) => {
                    setValue(name, field.value.filter(item => item.name !== value));
                }
                return <FormItem className="flex flex-col">
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    type="button"
                                    role="combobox"
                                    className={cn(
                                        "focus-visible:outline-0",
                                        "h-full min-h-[100px] border rounded-md flex p-4 gap-1 flex-wrap",
                                        !field.value.length && "text-muted-foreground"
                                    )}
                                >
                                    {!field.value.length ? 'Нажмите для выбора'
                                        : field.value.map((item) => <Badge key={uuidv4()} onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.name)
                                        }}>
                                            {item.name}<br/>{item.value}
                                        </Badge>)}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput
                                    glass={true}
                                    placeholder="Поиск металла..."
                                    className="h-9"
                                />
                                <CommandEmpty>Металл не найден</CommandEmpty>
                                <CommandGroup className="first:mb-1">
                                    {list.filter(item => !selectedNames.includes(item)).map((item) => (
                                        <MultiselectItem key={uuidv4()} item={item} items={field.value} fieldName={name}
                                                         nameInput={uuidv4()}/>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage/>
                </FormItem>
            }}
        />
    )
}
