import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {MoreHorizontal} from "lucide-react";
import {Fragment, useState} from "react";
import {db} from "@/lib/db.js";
import FormTransfer from "@/components/forms/FormTransfer.jsx";
import {useWarehouseItemContext} from "@/context/WarehouseItemContext.jsx";
import History from "@/components/history/History.jsx";
import FormDeduct from "@/components/forms/FormDeduct.jsx";

export function ActionsWarehouseItem() {
    const [transferOpen, setTransferOpen] = useState(false)
    const [deductOpen, setDeductOpen] = useState(false)
    const [historyOpen, setHistoryOpen] = useState(false)
    const {id, history} = useWarehouseItemContext()

    function onArchive () {
        db.warehouse.update(id, {
            isArchived: 1
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
                    <DropdownMenuItem onClick={onArchive}>
                        Архивировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => setTransferOpen(true)}>Передать</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeductOpen(true)}>Списать</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => setHistoryOpen(true)}>История</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <FormTransfer isOpen={transferOpen} onOpenChange={setTransferOpen}/>
            <FormDeduct isOpen={deductOpen} onOpenChange={setDeductOpen}/>
            <History isOpen={historyOpen} onOpenChange={setHistoryOpen} history={history}/>
        </Fragment>
    )
}
