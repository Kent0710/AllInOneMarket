"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toLowerCaseHelper } from "@/lib/utils";
import { FlattenedProductType } from "@/lib/supabase/dbtypes";

export type Result = {
    id: string;
    name: string;
    type: "shop" | "product";
};

export const result: Result[] = [
    {
        id: "1",
        name: "Foo",
        type: "shop",
    },
    {
        id: "2",
        name: "Bar",
        type: "product",
    },
];

export const columns: ColumnDef<FlattenedProductType>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) =>
            (row.original.productname || row.original.parent_productname || "Unnamed") +
            (row.original.variantname ? ` - ${row.original.variantname}` : ""),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (row.original.isVariant ? "variant" : "product"),
    },
];

interface DataTableProps<TData extends { id: string; variantname?: string }, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    inputClassName?: string;
    tableClassName?: string;
    searching?: boolean;
    searchColumn: string;
    children?: React.ReactNode;
    href?: boolean;
}

export default function DataTable<TData extends { id: string; variantname?: string }, TValue>({
    columns,
    data,
    inputClassName,
    tableClassName,
    searching = false,
    searchColumn,
    children,
    href = false,
}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [isSearching, setIsSearching] = useState(searching);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            sorting,
        },
    });

    return (
        <div>
            <div className="flex flex-wrap md:flex-nowrap items-center py-4 gap-3">
                {searching ? (
                    <Input
                        placeholder="Search product..."
                        value={
                            (table
                                .getColumn(searchColumn)
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(searchColumn)
                                ?.setFilterValue(event.target.value)
                        }
                        className={`${inputClassName}`}
                    />
                ) : (
                    <Input
                        placeholder="Search product..."
                        value={
                            (table
                                .getColumn(searchColumn)
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(searchColumn)
                                ?.setFilterValue(event.target.value)
                        }
                        className={`${inputClassName}`}
                        onFocus={() => setIsSearching(true)}
                        onBlur={() => {
                            setTimeout(() => {
                                setIsSearching(false);
                            }, 100);
                        }}
                    />
                )}
                {children}
            </div>
            {isSearching && (
                <div
                    className={`rounded-md border absolute bg-white z-50 shadow-md ${tableClassName}`}
                >
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                onClick={() => {
                                                    if (href) {
                                                        const variantParam = row.original.variantname
                                                            ? `?variant=${toLowerCaseHelper(row.original.variantname)}`
                                                            : "";
                                                        router.push(
                                                            `/product/${row.original.id}${variantParam}`
                                                        );
                                                    }
                                                }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}