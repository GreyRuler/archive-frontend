import {Form} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema} from "@/components/forms/schemas/formSchema.js";
import {db} from "@/lib/db.js";
import PropTypes from "prop-types";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Ban, Check, Pencil} from "lucide-react";
import {useWarehouseItemContext} from "@/context/WarehouseItemContext.jsx";

DataTableCell.propTypes = {
    view: PropTypes.node.isRequired,
    field: PropTypes.node.isRequired,
};

export default function DataTableCell({view, field}) {
    const item = useWarehouseItemContext()
    const [edit, setEdit] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema()),
        defaultValues: item
    })

    function onSubmit(data) {
        db.warehouse.update(item.id, data)
        setEdit(false)
    }

    return (
        edit ? <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center">
                {field}
                <div className="flex flex-col">
                    <Button variant="ghost" className="h-8 w-8 p-0" type={'submit'}>
                        <Check width={16} height={16}/>
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0" type={'button'} onClick={() => setEdit(false)}>
                        <Ban width={16} height={16}/>
                    </Button>
                </div>
            </form>
        </Form> : <div className={'flex items-center justify-between peer'}>
            {view}
            <Button variant="ghost" className="h-8 w-8 p-0 invisible peer-hover:visible" onClick={() => setEdit(true)}>
                <Pencil width={16} height={16}/>
            </Button>
        </div>
    )
}
