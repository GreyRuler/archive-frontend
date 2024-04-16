import {useInventoryContext} from "@/context/InventoryContext.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {db} from "@/lib/db.js";
import {Modal} from "@/components/Modal.jsx";
import {FormInput} from "@/components/forms/fields/FormInput.jsx";
import {FormDateInput} from "@/components/forms/fields/FormDateInput.jsx";
import PropTypes from "prop-types";
import {v4 as uuid4} from "uuid";
import ActionTypes from "@/lib/actionTypes.js";

FormDeduct.propTypes = {
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
}

export default function FormDeduct({isOpen, onOpenChange}) {
    const item = useInventoryContext()
    const form = useForm({
        resolver: zodResolver(z.object({
            count: z.coerce.number()
                .min(1, {message: 'Списание не менее 1'})
                .max(item.count, {message: `Списание не более ${item.count}`}),
            date: z.date(),
        })),
        defaultValues: {
            count: 1,
            date: new Date(),
        },
    })

    async function submit(data) {
        const {count, date} = data
        db.inventory.update(item.id, {
            history: [...item.history, {
                id: uuid4(),
                delta: -count,
                date,
                actionType: ActionTypes.DEDUCT,
            }]
        })
        form.reset()
    }

    return (
        <Modal title={'Списание'} submit={submit} form={form} isOpen={isOpen} onOpenChange={onOpenChange}>
            <FormInput
                form={form}
                name={'count'} label={'Количество'}
                description={'Сколько будет передано?'}
                type="number"/>
            <FormDateInput form={form} name={'date'} label={'Дата передачи'}/>
        </Modal>
    )
}
