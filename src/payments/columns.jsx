import {DataTableColumnHeader} from "@/components/table/DataTableColumnHeader.jsx";
import FilterHeaderDatalist from "@/components/table/FilterHeaderDatalist.jsx";
import DebouncedInput from "@/components/table/DebouncedInput.jsx";
import FormAdd from "@/components/forms/FormAdd.jsx";
import {ActionsInventory} from "@/payments/ActionsInventory.jsx";
import {ActionsArchive} from "@/payments/ActionsArchive.jsx";
import {Wrench} from 'lucide-react';
import {Badge} from "@/components/ui/badge.jsx";
import {v4 as uuidv4} from "uuid";
import {InventoryProvider} from "@/context/InventoryContext.jsx";

const columnActionsInventory = {
    id: "actions",
    enableHiding: false,
    header: () => <FormAdd/>,
    cell: ({row: {original}}) => (
        <InventoryProvider value={original}>
            <ActionsInventory key={uuidv4()}/>
        </InventoryProvider>
    ),
}

const columnActionsArchive = {
    id: "actions",
    enableHiding: false,
    header: () => <div className="inline-flex justify-center w-8"><Wrench/></div>,
    cell: ({row: {original: {id}}}) => <ActionsArchive id={id} key={uuidv4()}/>,
}

export const columns = [
    {
        accessorKey: "warehouse",
        header: ({column}) => (
            <div>
                <DataTableColumnHeader column={column}/>
                <FilterHeaderDatalist column={column}/>
            </div>
        ),
        title: 'Склад учета',
        filterFn: 'equalsFilter',
    },
    {
        accessorKey: "itemNumber",
        header: ({column}) => (
            <div>
                <DataTableColumnHeader column={column}/>
                <DebouncedInput
                    value={column.getFilterValue()}
                    onChange={column.setFilterValue}
                    placeholder="Поиск..."
                />
            </div>
        ),
        title: 'Номенклатурный номер'
    },
    {
        accessorKey: "itemNumberOld",
        header: ({column}) => (
            <div>
                <DataTableColumnHeader column={column}/>
                <DebouncedInput
                    value={column.getFilterValue()}
                    onChange={column.setFilterValue}
                    placeholder="Поиск..."
                />
            </div>
        ),
        title: 'Старый номенклатурный номер'
    },
    {
        accessorKey: "name",
        header: ({column}) => (
            <div>
                <DataTableColumnHeader column={column}/>
                <DebouncedInput
                    value={column.getFilterValue()}
                    onChange={column.setFilterValue}
                    placeholder="Поиск..."
                />
            </div>
        ),
        title: 'Наименование'
    },
    {
        accessorKey: "initialCount",
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Количество',
        cell: ({row: {original: {count, initialCount}}}) => `${count}/${initialCount}`,
    },
    {
        accessorKey: "unit",
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Единица измерения',
    },
    {
        accessorKey: "date",
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Дата поступления',
        sortingFn: 'datetime',
    },
    {
        accessorKey: "metals",
        enableHiding: false,
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Содержание драгметаллов',
        cell: ({row: {original: {metals}}}) => {
            return <div className="flex gap-2">
                {metals.map(({name, value}) => <Badge key={uuidv4()}>{name} {value}</Badge>)}
            </div>
        }
    }
]

export const columnsInventory = [
    columnActionsInventory,
    ...columns,
]

export const columnsArchive = [
    columnActionsArchive,
    ...columns,
]
