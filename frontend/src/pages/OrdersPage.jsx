import { useEffect, useState } from "react";
import { api } from "../api/api";
import "../styles/orders.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data.orders));
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders Dashboard</h2>

      {orders.map(order => (
        <div className="order-card" key={order._id}>
          <h4>{order.orderNumber}</h4>
          <span className={`badge ${order.status}`}>
            {order.status}
          </span>
          <p>Total: ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}
