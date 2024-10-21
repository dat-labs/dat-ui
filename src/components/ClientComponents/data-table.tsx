"use client";

import {
    ColumnDef,
    SortingState,
    getSortedRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
    actorType?: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    clickHandler?: (row: any) => void;
    searchTableKey?: string;
    inDialog?: boolean;
}

/**
 * DataTable component for displaying data in a table format with sorting, pagination, and search functionalities.
 * @param {string} actorType The type of actor to be displayed (used in search placeholder).
 * @param {ColumnDef<TData, TValue>[]} columns The columns definition for the table.
 * @param {TData[]} data The data to be displayed in the table.
 * @param {(row: any) => void} [clickHandler] Optional click handler for table rows.
 * @returns {JSX.Element} The rendered DataTable component.
 */
export default function DataTable<TData, TValue>({
    actorType,
    columns,
    data,
    clickHandler,
    searchTableKey = "name",
    inDialog = false,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: inDialog ? 10 : 10,
            },
        },
    });
    /**
     * Handles the click event on a table row and calls the provided clickHandler if available.
     *
     * @param {any} row The row data that was clicked.
     */
    const handleClickHandler = (row) => {
        if (clickHandler) {
            clickHandler(row);
        }
    };
    return (
        <div>
            <Input
                placeholder={`Search by ${actorType} Name`}
                value={(table.getColumn(searchTableKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn(searchTableKey)?.setFilterValue(event.target.value)}
                className="max-w-full"
            />
            <div className="rounded-md border mt-2">
                <Table>
                    <TableHeader className="bg-primary-foreground">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleClickHandler(row)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className=""
                                            onClick={(event) => {
                                                if (cell.column.id === "actions") {
                                                    event.stopPropagation();
                                                }
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
}
