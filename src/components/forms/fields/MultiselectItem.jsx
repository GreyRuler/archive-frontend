import PropTypes from "prop-types";
import {useForm, useFormContext} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CommandItem} from "@/components/ui/command.jsx";
import {Input} from "@/components/ui/input.jsx";


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
            [nameInput]: z.coerce.number().min(0.0000001, {message: 'Обязательное поле'})
        })),
    })
    const onSubmit = (data) => {
        console.log(data)
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
                    className="justify-between w-[600px] text-sm p-0 pl-4 whitespace-no-wrap border cursor-pointer"
                >
                    {item}
                    <Input
                        onClick={(e) => e.stopPropagation()}
                        {...register(nameInput)}
                        type="number"
                        step="0.00001"
                        min="0.00001"
                        className={"border-0 border-l-[1px] rounded-none focus-visible:ring-0 w-28"}
                    />
                </CommandItem>
            </div>
            <p className="text-right text-[0.8rem] font-medium text-destructive">{errors[nameInput]?.message}</p>
        </div>
    )
}
