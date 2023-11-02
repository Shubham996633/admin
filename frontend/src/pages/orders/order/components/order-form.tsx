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
  orderId: z.string().min(5),
  productName: z.string().min(1),
  productPrice: z.string().min(1),
  purchaseDate: z.string().min(1),
  purchasedUserId: z.string().min(1),

});
interface Order {
  orderId: string;
  productName: string;
  productPrice: string;
  emailAddress: string;
  purchaseDate: string;
  purchasedUserId:string
}
type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  initialData: Order | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Order" : "Create Order";
  const description = initialData ? "Edit a Order." : "Add a new Order";
  const toastMessage = initialData ? "Order updated." : "Order created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      orderId: "",
      productName: "",
      productPrice: "",
      purchaseDate: "",
      purchasedUserId: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      // If initialData is available, set the form values
      form.setValue("orderId", initialData.orderId);
      form.setValue("productName", initialData.productName);
      form.setValue("productPrice", initialData.productPrice);
      form.setValue("purchaseDate", initialData.purchaseDate);
      form.setValue("purchasedUserId", initialData.purchasedUserId);
    }
  }, [initialData]);

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`http://localhost:3000/api/order/${params.id}`, data);
      } else {
        await axios.post(`http://localhost:3000/api/order`, data);
      }
      router.push(`/orders`);
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
      await axios.delete(`http://localhost:3000/api/order/${params.id}`);
      router.push(`/orders`);
      toast.success("Order deleted.");
    } catch (error: any) {
      toast.error("Order deletion failed.");
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
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order  Id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Order Id ( Can't be Edited )"
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
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date : </FormLabel>
                  <FormControl>
                    <Input
          disabled={loading}
                      placeholder="Purchase Date "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purchasedUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase UserID : </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Purchase User ID "
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
