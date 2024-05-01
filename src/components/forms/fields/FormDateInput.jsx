import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {cn} from "@/lib/utils.js";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar"
import PropTypes from "prop-types";
import {formatDate} from "@/lib/format.js";
import {useFormContext} from "react-hook-form";

FormDateInput.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

export function FormDateInput({name, description}) {
    const {control} = useFormContext()
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => {
                return <FormItem className="flex flex-col">
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? formatDate(field.value) : formatDate(new Date())}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date("1900-01-01")}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage/>
                </FormItem>
            }}
        />
    )
}
