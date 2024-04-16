import {ArrowUpDown} from "lucide-react"
import {cn} from "@/lib/utils.js"
import {Button} from "@/components/ui/button.jsx"
import PropTypes from "prop-types";

DataTableColumnHeader.propTypes = {
    column: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export function DataTableColumnHeader({column, className}) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{column.columnDef.title}</div>
    }

    return (
        <Button
            className={cn("w-full justify-between text-left", className)}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {column.columnDef.title}
            <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
    )
}
