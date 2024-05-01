import {Undo2} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form} from "@/components/ui/form.jsx";
import {FormInput} from "@/components/forms/fields/FormInput.jsx";
import PropTypes from "prop-types";
import {db} from "@/lib/db.js";
import {v4 as uuid4} from "uuid";
import ActionTypes from "@/lib/actionTypes.js";
import {useWarehouseItemContext} from "@/context/WarehouseItemContext.jsx";
import {FormDateInput} from "@/components/forms/fields/FormDateInput.jsx";

FormReturnItem.propTypes = {
    historyId: PropTypes.string.isRequired,
    delta: PropTypes.number.isRequired,
    employer: PropTypes.string.isRequired,
}

export default function FormReturnItem({historyId, delta, employer}) {
    const {id, history, decrement} = useWarehouseItemContext()
    const deltaPos = Math.abs(delta)
    const form = useForm({
        resolver: zodResolver(z.object({
            delta: z.coerce.number()
                .min(1, {message: "Количество для возврата не меньше 1"})
                .max(deltaPos, {message: `Количество для возврата не больше ${deltaPos}`})
        })),
        defaultValues: {
            delta: 1,
            date: new Date(),
        },
    })

    const onSubmit = (data) => {
        const {delta, date} = data
        db.warehouse.update(id, {
            decrement: decrement - delta,
            history: [...history, {
                id: uuid4(),
                employer,
                delta,
                date,
                actionType: ActionTypes.RETURN,
            }].map(historyItem => (
                historyItem.id === historyId ? { ...historyItem, return: true } : historyItem
            )),
        })
        form.reset()
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={'flex items-center ml-4 h-max px-2.5 py-0.5'}>
                    <span className={'text-red-600 text-base'}>{delta}</span>
                    <Undo2 className={'pl-1'}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={'flex flex-col justify-center'}
                    >
                        <FormInput form={form} name={'delta'} label={'Количество'} type={'number'}/>
                        <FormDateInput form={form} name={'date'} label={'Дата передачи'}/>
                        <Button>Подтвердить</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    )
}
