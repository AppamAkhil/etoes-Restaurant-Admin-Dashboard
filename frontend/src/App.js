import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Menu</Link>
        <Link to="/orders">Orders</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
