import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {MoreHorizontal} from "lucide-react";
import PropTypes from "prop-types";
import {Fragment, useState} from "react";
import {db} from "@/lib/db.js";
import FormDelete from "@/components/forms/FormDelete.jsx";

ActionsArchive.propTypes = {
    id: PropTypes.number.isRequired,
};

export function ActionsArchive({id}) {
    const [isOpen, setOpen] = useState(false)

    function onArchive () {
        db.warehouse.update(id, {
            isArchived: 0
        })
    }

    return (
        <Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        Удалить
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onArchive}>
                        Разархивировать
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <FormDelete id={id} isOpen={isOpen} onOpenChange={setOpen}/>
        </Fragment>
    )
}
