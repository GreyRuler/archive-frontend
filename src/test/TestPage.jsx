import React, {useMemo} from 'react';
import {getCoreRowModel, getSortedRowModel, useReactTable,} from '@tanstack/react-table';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@/components/ui/table.jsx";

// Макет данных для демонстрации
const defaultData = [
    { name: "Item 1", received: 100, remaining: 50, expense: 50, other: "Other Info" },
    { name: "Item 2", received: 200, remaining: 150, expense: 50, other: "Other Info" },
    // Добавьте больше данных по мере необходимости
];

const DataTable = ({ data = defaultData }) => {
    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            footer: 'Name',
            colSpan: 3, // Или другое значение в зависимости от структуры
            rowSpan: 2 // Или другое значение в зависимости от структуры
        },
    ], []);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                console.log(header)
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {cell.renderCell()}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default function TestPage() {

    return (
        <DataTable/>
    )
}
