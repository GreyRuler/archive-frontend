import PropTypes from "prop-types";
import {useForm, useFormContext} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CommandItem} from "@/components/ui/command.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";


MultiselectItem.propTypes = {
    item: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    fieldName: PropTypes.string.isRequired,
    nameInput: PropTypes.string.isRequired,
}

export default function MultiselectItem({item, items, fieldName, nameInput}) {
    const {setValue} = useFormContext()
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(z.object({
            [nameInput]: z.coerce.number().min(1, {message: 'Обязательное поле'})
        })),
    })
    const onSubmit = (data) => {
        setValue(fieldName, [...items, {
            name: item,
            value: data[nameInput]
        }])
    }

    return (
        <div className="mt-2">
            <div className="flex">
                <CommandItem
                    value={item}
                    onSelect={handleSubmit(onSubmit)}
                    className="w-[600px] text-sm rounded-r-none px-4 whitespace-no-wrap border border-r-0"
                >
                    {item}
                </CommandItem>
                <Input
                    {...register(nameInput)}
                    type="number"
                    min="1"
                    className={cn(
                        "shadow-none rounded-l-none focus-visible:ring-0",
                        errors[nameInput] && "border-red-500"
                    )}
                />
            </div>
            <p className="text-right text-[0.8rem] font-medium text-destructive">{errors[nameInput]?.message}</p>
        </div>
    )
}
