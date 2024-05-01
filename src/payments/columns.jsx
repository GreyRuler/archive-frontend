import {DataTableColumnHeader} from "@/components/table/DataTableColumnHeader.jsx";
import FilterHeaderDatalist from "@/components/table/FilterHeaderDatalist.jsx";
import DebouncedInput from "@/components/table/DebouncedInput.jsx";
import {ActionsWarehouseItem} from "@/payments/ActionsWarehouseItem.jsx";
import {ActionsArchive} from "@/payments/ActionsArchive.jsx";
import {Wrench} from 'lucide-react';
import {Badge} from "@/components/ui/badge.jsx";
import {v4 as uuidv4} from "uuid";
import {WarehouseItemProvider} from "@/context/WarehouseItemContext.jsx";
import {formatDate} from "@/lib/format.js";
import {createColumnHelper} from "@tanstack/react-table";
import DataTableCell from "@/components/table/DataTableCell.jsx";
import {FormSelect} from "@/components/forms/fields/FormSelect.jsx";
import {warehouses} from "@/lib/warehouses.js";
import {FormInput} from "@/components/forms/fields/FormInput.jsx";
import {units} from "@/lib/units.js";
import {FormDateInput} from "@/components/forms/fields/FormDateInput.jsx";
import MultiselectForm from "@/components/forms/fields/MultiselectForm.jsx";
import metals from "@/lib/metals.js";

const columnHelper = createColumnHelper()

const columnActionsWarehouse = {
    id: "actions",
    enableHiding: false,
    cell: ({row: {original}}) => (
        <WarehouseItemProvider value={original}>
            <ActionsWarehouseItem key={uuidv4()}/>
        </WarehouseItemProvider>
    ),
}

const columnActionsArchive = {
    id: "actions",
    enableHiding: false,
    header: () => <div className="inline-flex justify-center w-8"><Wrench/></div>,
    cell: ({row: {original: {id}}}) => <ActionsArchive id={id} key={uuidv4()}/>,
}

export const columns = [
    columnHelper.accessor('warehouse', {
        header: ({column}) => (
            <div>
                <DataTableColumnHeader column={column}/>
                <FilterHeaderDatalist column={column}/>
            </div>
        ),
        title: 'Категория',
        filterFn: 'equalsFilter',
        cell: ({row: {original}, getValue}) =>
            <WarehouseItemProvider value={original}>
                <DataTableCell
                    view={<span>{getValue()}</span>}
                    field={
                    <FormSelect name={'warehouse'} list={warehouses}/>
                }/>
            </WarehouseItemProvider>
    }),
    columnHelper.accessor('itemNumber', {
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
        title: 'Номенклатурный номер',
        cell: ({row: {original}, getValue}) =>
            <WarehouseItemProvider value={original}>
                <DataTableCell
                    view={<span>{getValue()}</span>}
                    field={
                        <FormInput name={'itemNumber'}/>
                    }/>
            </WarehouseItemProvider>
    }),
    columnHelper.accessor('itemNumberOld', {
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
        title: 'Старый номенклатурный номер',
        cell: ({row: {original}, getValue}) =>
            <WarehouseItemProvider value={original}>
                <DataTableCell
                    view={<span>{getValue()}</span>}
                    field={
                        <FormInput name={'itemNumberOld'}/>
                    }/>
            </WarehouseItemProvider>
    }),
    columnHelper.accessor('name', {
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
        title: 'Наименование',
        cell: ({row: {original}, getValue}) =>
            <WarehouseItemProvider value={original}>
                <DataTableCell
                    view={<span>{getValue()}</span>}
                    field={
                        <FormInput name={'name'}/>
                    }/>
            </WarehouseItemProvider>
    }),
    columnHelper.group({
        id: 'count',
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Количество',
        columns: [
            columnHelper.accessor('amount', {
                title: 'Получено',
                header: ({column}) => (
                    <DataTableColumnHeader column={column}/>
                ),
                cell: ({row: {original}, getValue}) =>
                    <WarehouseItemProvider value={original}>
                        <DataTableCell
                            view={<span>{getValue()}</span>}
                            field={
                                <FormInput name={'amount'} type='number' placeholder={'Получено'}/>
                            }/>
                    </WarehouseItemProvider>
            }),
            columnHelper.accessor('decrement', {
                title: 'Израсходовано',
                header: ({column}) => (
                    <DataTableColumnHeader column={column}/>
                ),
                cell: ({getValue}) => <span>{getValue()}</span>
            }),
            columnHelper.accessor('difference', {
                title: 'Осталось',
                header: ({column}) => (
                    <DataTableColumnHeader column={column}/>
                ),
                cell: ({row: {original: {amount, decrement}}}) => <span>{amount - decrement}</span>
            }),
        ]
    }),
    {
        accessorKey: "unit",
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Единица измерения',
        cell: ({row: {original}, getValue}) =>
            <WarehouseItemProvider value={original}>
                <DataTableCell
                    view={<span>{getValue()}</span>}
                    field={
                        <FormSelect name={'unit'} list={units}/>
                    }/>
            </WarehouseItemProvider>
    },
    {
        accessorKey: "date",
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Дата поступления',
        sortingFn: 'datetime',
        cell: ({row: {original}}) =>
            <WarehouseItemProvider value={original}>
                <DataTableCell
                    view={<span>{formatDate(original.date)}</span>}
                    field={
                        <FormDateInput name={'date'}/>
                    }/>
            </WarehouseItemProvider>
    },
    {
        accessorKey: "metals",
        header: ({column}) => (
            <DataTableColumnHeader column={column}/>
        ),
        title: 'Содержание драгметаллов',
        cell: ({row: {original}}) =>
            <WarehouseItemProvider value={original}>
                <DataTableCell
                    view={<div className="flex gap-2">
                        {original.metals.map(({name, value}) => <Badge key={uuidv4()}>{name}<br/>{value}</Badge>)}
                    </div>}
                    field={
                        <MultiselectForm name={'metals'} list={metals}/>
                    }/>
            </WarehouseItemProvider>,
    }
]

export const columnsWarehouse = [
    columnActionsWarehouse,
    ...columns,
]

export const columnsArchive = [
    columnActionsArchive,
    ...columns,
]
