import {Plus} from "lucide-react";
import {Modal} from "@/components/Modal.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormInput} from "@/components/forms/fields/FormInput.jsx";
import {FormSelect} from "@/components/forms/fields/FormSelect.jsx";
import {db} from "@/lib/db.js";
import {warehouses} from "@/lib/warehouses.js";
import {units} from "@/lib/units.js";
import {FormDateInput} from "@/components/forms/fields/FormDateInput.jsx";
import {formSchema} from "@/components/forms/schemas/formSchema.js";
import {Button} from "@/components/ui/button.jsx";
import {Fragment, useState} from "react";
import MultiselectForm from "@/components/forms/fields/MultiselectForm.jsx";
import metals from "@/lib/metals.js";

export default function FormAdd() {
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            warehouse: warehouses[0],
            itemNumber: '',
            itemNumberOld: '',
            name: '',
            initialCount: 0,
            count: 0,
            unit: units[0],
            issuedTo: '',
            date: new Date(),
            metals: [],
        },
    })

    function submit(data) {
        db.inventory.add({
            ...data,
            isArchived: 0,
            history: []
            // TODO дефолтные значения при создании записи
        });
        setIsOpen(false)
        form.reset()
    }

    return (
        <Fragment>
            <Button variant="ghost" className="h-8 w-8 p-0"
                    onClick={() => setIsOpen(true)}>
                <Plus/>
            </Button>
            <Modal title={'Добавление'} submit={submit} form={form} isOpen={isOpen} onOpenChange={setIsOpen}>
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
        </Fragment>
    )
}
