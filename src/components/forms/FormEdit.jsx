import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {warehouses} from "@/lib/warehouses.js";
import {units} from "@/lib/units.js";
import {db} from "@/lib/db.js";
import {Modal} from "@/components/Modal.jsx";
import {FormSelect} from "@/components/forms/fields/FormSelect.jsx";
import {FormInput} from "@/components/forms/fields/FormInput.jsx";
import {FormDateInput} from "@/components/forms/fields/FormDateInput.jsx";
import {formSchema} from "@/components/forms/schemas/formSchema.js";
import PropTypes from 'prop-types';
import MultiselectForm from "@/components/forms/fields/MultiselectForm.jsx";
import metals from "@/lib/metals.js";
import {useInventoryContext} from "@/context/InventoryContext.jsx";

FormEdit.propTypes = {
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
}

export function FormEdit({isOpen, onOpenChange}) {
    const item = useInventoryContext()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: item,
    })

    function submit(data) {
        db.inventory.update(item.id, data)
        form.reset()
    }

    return (
        <Modal title={'Редактирование'} submit={submit} form={form} isOpen={isOpen} onOpenChange={onOpenChange}>
            <FormSelect form={form} name={'warehouse'} label={'Склад учёта'} list={warehouses}/>
            <FormInput form={form} name={'itemNumber'} label={'Номенклатурный номер'}/>
            <FormInput form={form} name={'itemNumberOld'} label={'Старый номенклатурный номер'}/>
            <FormInput form={form} name={'name'} label={'Наименование'}/>
            <FormInput form={form} name={'initialCount'} label={'Получено'} type='number'/>
            <FormInput form={form} name={'count'} label={'Остаток'} type='number'/>
            <FormSelect form={form} name={'unit'} label={'Единица измерения'} list={units}/>
            <FormDateInput form={form} name={'date'} label={'Дата поступления'}/>
            <MultiselectForm name={'metals'} label={'Выбор металлов'} placeholder={'Нажмите для выбора'} values={metals}/>
        </Modal>
    )
}
