"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type UserColumn = {
  id: string
  firstName: string;
  lastName:string,
  emailAddress:string,
  password:string
  updated_at: string;
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "id",
    header: "User ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
  },
  {
    accessorKey: "password",
    header: "Password",
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