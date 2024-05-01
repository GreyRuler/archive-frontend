import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import PropTypes from "prop-types";
import {useFormContext} from "react-hook-form";

FormSelect.propTypes = {
    name: PropTypes.string,
    list: PropTypes.array,
    placeholder: PropTypes.string,
    description: PropTypes.string,
};

export function FormSelect({name, list, placeholder, description}) {
    const {control} = useFormContext()
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>{list.map((item, index) => (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))}</SelectContent>
                    </Select>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
