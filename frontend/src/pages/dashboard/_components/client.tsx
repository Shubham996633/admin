"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, UserColumn } from "./columns";

interface UserClientProps {
  data: UserColumn[];
}

export const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users for your store"
        />
        <Button
          onClick={() => router.push(`/dashboard/user/`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="firstName" columns={columns} data={data} />
      <Separator />
    </>
  );
};