import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.jsx"

import PropTypes from 'prop-types';
import {useState} from "react";
import DebouncedInput from "@/components/table/DebouncedInput.jsx";
import {DataTablePagination} from "@/components/table/DataTablePagination.jsx";
import {cn} from "@/lib/utils.js";
import DataTableRowForm from "@/components/table/DataTableRowForm.jsx";

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};

export function DataTable({columns, data}) {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])

    const equalsFilter = (row, columnId, value) => {
        return row.getValue(columnId) === value
    }

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            equalsFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="h-[100%] flex flex-col">
            <div className="flex items-center py-4">
                <div className="flex">
                    <DebouncedInput
                        value=''
                        onChange={value => table.setGlobalFilter(value)}
                        className="w-[20rem]"
                        placeholder="Поиск по всему складу..."
                    />
                </div>
            </div>
            <div className="rounded-md border relative flex-1 w-full overflow-y-auto">
                <Table className={cn(
                    'flex-1',
                    table.getRowModel().rows?.length || 'h-full'
                )}>
                    <TableHeader className='sticky top-0 bg-white'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='divide-x'>
                                {headerGroup.headers
                                    .filter((header) => {
                                        const {depth, column} = header
                                        return depth === 1 || column.depth
                                    })
                                    .map((header) => {
                                        return <TableHead key={header.id} className='p-2 px-5'
                                                          colSpan={header.colSpan}
                                                          rowSpan={header.colSpan === 1 && header.depth === 1 ? 2 : 1}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    })}
                            </TableRow>
                        ))}
                        <DataTableRowForm/>
                    </TableHeader>
                    <TableBody className={'z-0'}>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className='divide-x'
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='px-5'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Данные отсутствуют
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="space-x-2 pt-4">
                <DataTablePagination table={table}/>
            </div>
        </div>
    )
}
