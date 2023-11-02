"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type OrderColumn = {
  id: string
  productName: string;
  productPrice:string,
  purchaseDate:string,
  purchasedUserId:string
  updated_at: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "productPrice",
    header: "Product Price",
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
  },
  {
    accessorKey: "purchasedUserId",
    header: "Purchased UserId",
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];