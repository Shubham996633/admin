import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { OrderColumn } from "./_components/columns";
import { OrderClient } from "./_components/client";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/order')
      .then((response) => response.json())
      .then((orders) => setOrders(orders))
      .catch((error) => console.error('Error:', error));
  }, []);

  if(!orders) return null
  console.log(orders)
  //@ts-ignore
  const formattedOrders: OrderColumn[] = orders.map((item:any) => ({
    id: item.orderId,
    productName: item.productName,
    productPrice: item.productPrice,
    purchaseDate:item.purchaseDate,
    purchasedUserId:item.purchasedUserId,
    updated_at: item.updated_at,


    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}
