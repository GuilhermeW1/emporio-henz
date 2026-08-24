import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export default function App() {
  const [orders, setOrders] = useState([]);
  
  const [order, setOrder] = useState("");
  const [item, setItem] = useState("");
  const [error, setError] = useState(null);

  async function load() {
    const response = await fetch(`${API}/orders`);
    setOrders(await response.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function send(event) {
    event.preventDefault();
    setError(null);

    const response = await fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order, item }),
    });

    if (!response.ok) {
      const body = await response.json();
      setError(body.error);
      return;
    }


    setOrder("");
    setItem("");
    load();
  }

  return (
    <main>
      <h1>Cadastro de pedidos</h1>
      
      <form onSubmit={send}>
        <input value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Order" />
        <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" />
        <button>Cadastrar Pedido</button>
      </form>
      
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
    </main>
  );
}