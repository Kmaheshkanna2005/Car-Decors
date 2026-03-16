// ─────────────────────────────────────────────
// CartPage.jsx
// ─────────────────────────────────────────────
import { useEffect, useState } from "react";
import axios from "axios";

const CART_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .cart-root { min-height: 100vh; background: #0c0c0c; font-family: 'DM Sans', sans-serif; color: #e0e0e0; padding: 48px; }
  .cart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; }
  .cart-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 4px; color: #fff; line-height:1; }
  .cart-title span { color: #b8860b; }
  .cart-back { padding: 11px 20px; background: #141414; border: 1px solid #2a2a2a; border-radius: 8px; color: #888; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .cart-back:hover { border-color: #555; color: #fff; }
  .cart-empty { text-align: center; padding: 120px 40px; color: #444; }
  .cart-empty-icon { font-size: 64px; display: block; margin-bottom: 20px; }
  .cart-empty-text { font-size: 18px; }
  .cart-list { display: flex; flex-direction: column; gap: 16px; max-width: 760px; }
  .cart-item { background: #141414; border: 1px solid #1e1e1e; border-radius: 12px; padding: 22px 26px; display: flex; align-items: center; justify-content: space-between; transition: border-color 0.2s; }
  .cart-item:hover { border-color: #2a2a2a; }
  .cart-item-left {}
  .cart-item-name { font-size: 17px; font-weight: 600; color: #fff; margin-bottom: 6px; }
  .cart-item-cat { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #555; }
  .cart-item-right { display: flex; align-items: center; gap: 24px; }
  .cart-item-qty { text-align: center; }
  .cart-item-qty-num { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: #b8860b; line-height: 1; }
  .cart-item-qty-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #555; }
  .cart-remove { padding: 9px 16px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); border-radius: 6px; color: #f87171; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .cart-remove:hover { background: rgba(239,68,68,0.2); }
  .cart-footer { margin-top: 32px; max-width: 760px; display: flex; justify-content: flex-end; }
  .cart-commit { padding: 16px 40px; background: linear-gradient(135deg, #b8860b, #8b6508); border: none; border-radius: 8px; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; cursor: pointer; transition: opacity 0.2s, transform 0.1s; }
  .cart-commit:hover { opacity: 0.85; transform: translateY(-1px); }
`;

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", { headers: { Authorization: `Bearer ${token}` } });
      setCart(res.data);
    } catch { alert("Failed to load cart"); }
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (partId) => {
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", { headers: { Authorization: `Bearer ${token}` }, data: { partId } });
      fetchCart();
    } catch { alert("Failed to remove item"); }
  };

  const commitCart = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/commit", {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Cart committed successfully");
      fetchCart();
    } catch { alert("Commit failed"); }
  };

  return (
    <>
      <style>{CART_CSS}</style>
      <div className="cart-root">
        <div className="cart-header">
          <div className="cart-title">My <span>Cart</span></div>
          <button className="cart-back" onClick={() => window.location.href = "/parts"}>← Back to Parts</button>
        </div>

        {!cart || cart.items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <div className="cart-empty-text">Your cart is empty</div>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.items.map((item) => (
                <div className="cart-item" key={item.partId._id}>
                  <div className="cart-item-left">
                    <div className="cart-item-name">{item.partId.name}</div>
                    <div className="cart-item-cat">{item.partId.category}</div>
                  </div>
                  <div className="cart-item-right">
                    <div className="cart-item-qty">
                      <div className="cart-item-qty-num">×{item.quantity}</div>
                      <div className="cart-item-qty-label">Units</div>
                    </div>
                    <button className="cart-remove" onClick={() => removeItem(item.partId._id)}>✕ Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <button className="cart-commit" onClick={commitCart}>Commit Cart →</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;