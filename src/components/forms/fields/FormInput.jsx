import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import PropTypes from "prop-types";
import {Input} from "@/components/ui/input"
import {useFormContext} from "react-hook-form";

FormInput.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    description: PropTypes.string
};

export function FormInput({name, type, placeholder, description, ...other}) {
    const {control} = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <Input placeholder={placeholder} type={type} {...field} {...other} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
