import { useEffect, useState } from "react";
import { api } from "../api/api";
import useDebounce from "../hooks/useDebounce";
import "../styles/menu.css";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const fetchMenu = async () => {
      const url = debouncedSearch
        ? `/menu/search?q=${debouncedSearch}`
        : "/menu";
      const res = await api.get(url);
      setMenu(res.data);
    };
    fetchMenu();
  }, [debouncedSearch]);

  const toggleAvailability = async (id) => {
    // Optimistic UI
    setMenu(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );

    try {
      await api.patch(`/menu/${id}/availability`);
    } catch {
      alert("Failed to update availability");
    }
  };

  return (
    <div className="menu-container">
      <h2>Menu Management</h2>

      <input
        className="search"
        placeholder="Search menu items..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="menu-grid">
        {menu.map(item => (
          <div className="menu-card" key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p>₹{item.price}</p>

            <button
              className={item.isAvailable ? "available" : "unavailable"}
              onClick={() => toggleAvailability(item._id)}
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
