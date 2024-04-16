import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import PropTypes from "prop-types";

FormSelect.propTypes = {
    form: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    list: PropTypes.array,
    placeholder: PropTypes.string,
    description: PropTypes.string,
};

export function FormSelect({form, name, label, list, placeholder, description}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
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
