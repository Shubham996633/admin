"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  userId: z.string().min(5),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  emailAddress: z.string().min(1).email(),
  password: z.string().min(1),
});
interface User {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}
type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  initialData: User | null;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit User" : "Create User";
  const description = initialData ? "Edit a User." : "Add a new User";
  const toastMessage = initialData ? "User updated." : "User created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      userId: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      // If initialData is available, set the form values
      form.setValue("userId", initialData.userId);
      form.setValue("firstName", initialData.firstName);
      form.setValue("lastName", initialData.lastName);
      form.setValue("emailAddress", initialData.emailAddress);
      form.setValue("password", initialData.password);
    }
  }, [initialData]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`http://localhost:3000/api/user/${params.id}`, data);
      } else {
        await axios.post(`http://localhost:3000/api/user`, data);
      }
      router.push(`/dashboard`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/user/${params.id}`);
      router.push(`/dashboard`);
      toast.success("User deleted.");
    } catch (error: any) {
      toast.error("User deletion failed.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  console.log("initialData:", initialData);
  console.log("form values:", form.getValues());
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User Id ( Can't be Edited )"
                      {...field}
                      disabled={initialData !== null} // Set disabled if initialData is present
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FirstName</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LastName</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address : </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Email Address "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password : </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Password "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
