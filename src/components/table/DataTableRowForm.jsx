import {TableHead, TableRow} from "@/components/ui/table.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {warehouses} from "@/lib/warehouses.js";
import {units} from "@/lib/units.js";
import {db} from "@/lib/db.js";
import {FormSelect} from "@/components/forms/fields/FormSelect.jsx";
import {FormInput} from "@/components/forms/fields/FormInput.jsx";
import {FormDateInput} from "@/components/forms/fields/FormDateInput.jsx";
import MultiselectForm from "@/components/forms/fields/MultiselectForm.jsx";
import metals from "@/lib/metals.js";
import {Button} from "@/components/ui/button.jsx";
import {Plus} from "lucide-react";
import {Form} from "@/components/ui/form.jsx";
import {formSchema} from "@/components/forms/schemas/formSchema.js";

export default function DataTableRowForm() {
    const form = useForm({
        resolver: zodResolver(formSchema()),
        defaultValues: {
            warehouse: warehouses[0],
            itemNumber: '',
            itemNumberOld: '',
            name: '',
            unit: units[0],
            date: new Date(),
            metals: [],
        },
    })

    function onSubmit(data) {
        db.warehouse.add({
            ...data,
            decrement: 0,
            difference: 0,
            isArchived: 0,
            history: []
            // TODO дефолтные значения при создании записи
        });
        form.reset()
    }

    return (
        <TableRow className='divide-x'>
            <Form {...form}>
                <TableHead className='p-2 px-5'>
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={form.handleSubmit(onSubmit)}>
                        <Plus/>
                    </Button>
                </TableHead>
                <TableHead className='p-2 px-5'>
                    <FormSelect name={'warehouse'} list={warehouses}/>
                </TableHead>
                <TableHead className='p-2 px-5'>
                    <FormInput name={'itemNumber'}/>
                </TableHead>
                <TableHead className='p-2 px-5'>
                    <FormInput name={'itemNumberOld'}/>
                </TableHead>
                <TableHead className='p-2 px-5'>
                    <FormInput name={'name'}/>
                </TableHead>
                <TableHead className='p-2 px-5' colSpan={3}>
                    <FormInput name={'amount'} type='number' placeholder={'Получено'}/>
                </TableHead>
                <TableHead className='p-2 px-5'>
                    <FormSelect name={'unit'} list={units}/>
                </TableHead>
                <TableHead className='p-2 px-5'>
                    <FormDateInput name={'date'}/>
                </TableHead>
                <TableHead className='p-2 px-5'>
                    <MultiselectForm name={'metals'} list={metals}/>
                </TableHead>
            </Form>
        </TableRow>
    )
}
