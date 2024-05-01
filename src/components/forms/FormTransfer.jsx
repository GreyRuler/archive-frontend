import {Modal} from "@/components/Modal.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {db} from "@/lib/db.js";
import {FormInput} from "@/components/forms/fields/FormInput.jsx";
import PropTypes from "prop-types";
import {z} from "zod";
import {useWarehouseItemContext} from "@/context/WarehouseItemContext.jsx";
import {FormDateInput} from "@/components/forms/fields/FormDateInput.jsx";
import {v4 as uuid4} from "uuid";
import ActionTypes from "@/lib/actionTypes.js";

FormTransfer.propTypes = {
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
}

export default function FormTransfer({isOpen, onOpenChange}) {
    const item = useWarehouseItemContext()
    const form = useForm({
        resolver: zodResolver(z.object({
            employer: z.string().min(1, {message: 'Обязательное поле'}),
            count: z.coerce.number()
                .min(1, {message: 'Передайте не менее 1'})
                .max(item.count, {message: `Передайте не более ${item.count}`}),
            date: z.date(),
        })),
        defaultValues: {
            employer: '',
            count: 1,
            date: new Date(),
        },
    })

    async function submit(data) {
        const {employer, count, date} = data
        db.warehouse.update(item.id, {
            decrement: item.decrement + count,
            history: [...item.history, {
                id: uuid4(),
                employer,
                delta: -count,
                date,
                return: false,
                actionType: ActionTypes.TRANSFER
            }]
        })
        form.reset()
    }

    return (
        <Modal title={'Передача'} submit={submit} form={form} isOpen={isOpen} onOpenChange={onOpenChange}>
            <FormInput
                form={form}
                name={'employer'} label={'Сотрудник'}
                placeholder="ФИО"/>
            {/*<ComboboxForm form={form}*/}
            {/*    name={'employer'} label={'Сотрудник'}*/}
            {/*    placeholder="ФИО" values={}/>*/}
            <FormInput
                form={form}
                name={'count'} label={'Количество'}
                description={'Сколько будет передано?'}
                type="number"/>
            <FormDateInput form={form} name={'date'} label={'Дата передачи'}/>
        </Modal>
    )
}
