import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { OrderForm } from "./components/order-form";

const OrderPage = () => {
  const router = useRouter();
  const data = router.query;
  const orderId = data.id;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`http://localhost:3000/api/order/${orderId}`)
        .then((response) => response.json())
        .then((order) => setOrder(order))
        .catch((error) => console.error('Error:', error));
    }
  }, [orderId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={order} />
      </div>
    </div>
  );
};

export default OrderPage;
