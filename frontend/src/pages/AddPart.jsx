// ─────────────────────────────────────────────
// AddPart.jsx
// ─────────────────────────────────────────────
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .form-root { min-height: 100vh; background: #0c0c0c; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; padding: 40px; }
  .form-card { background: #141414; border: 1px solid #1e1e1e; border-radius: 16px; padding: 56px 52px; width: 100%; max-width: 520px; position: relative; overflow: hidden; }
  .form-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right, #b8860b, #ff8c00, #b8860b); }
  .form-back { position: absolute; top: 24px; right: 24px; background: none; border: none; color: #444; font-size: 20px; cursor: pointer; transition: color 0.2s; }
  .form-back:hover { color: #fff; }
  .form-icon { font-size: 40px; display: block; margin-bottom: 16px; }
  .form-title { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 3px; color: #fff; line-height: 1; margin-bottom: 6px; }
  .form-sub { font-size: 13px; color: #555; letter-spacing: 1px; margin-bottom: 40px; }
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #b8860b; margin-bottom: 8px; font-weight: 500; }
  .form-input { width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 14px 16px; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
  .form-input:focus { border-color: #b8860b; box-shadow: 0 0 0 3px rgba(184,134,11,0.08); }
  .form-input::placeholder { color: #444; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-file-wrap { position: relative; }
  .form-file { width: 100%; background: #1a1a1a; border: 1px dashed #2a2a2a; border-radius: 8px; padding: 20px 16px; color: #666; font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; text-align: center; transition: border-color 0.2s; }
  .form-file:hover { border-color: #b8860b; color: #ccc; }
  .form-submit { width: 100%; padding: 16px; background: linear-gradient(135deg, #b8860b, #8b6508); border: none; border-radius: 8px; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; cursor: pointer; margin-top: 8px; transition: opacity 0.2s, transform 0.1s; }
  .form-submit:hover { opacity: 0.88; transform: translateY(-1px); }
`;

const AddPart = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Click to upload image");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("image", image);
    try {
      await axios.post(`${BASE_URL}/api/parts`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("Part added successfully");
      setName(""); setCategory(""); setStock(""); setPrice(""); setImage(null); setFileName("Click to upload image");
    } catch { alert("Failed to add part"); }
  };

  return (
    <>
      <style>{FORM_CSS}</style>
      <div className="form-root">
        <div className="form-card">
          <button className="form-back" onClick={() => window.location.href = "/admin"}>✕</button>
          <span className="form-icon">🔧</span>
          <div className="form-title">Add New Part</div>
          <div className="form-sub">Add a part to inventory</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Part Name</label>
              <input className="form-input" type="text" placeholder="e.g. Brake Pad" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-input" type="text" placeholder="e.g. Brakes" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Stock</label>
                <input className="form-input" type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input className="form-input" type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Image</label>
              <label className="form-file" style={{ display: "block", cursor: "pointer" }}>
                📷 {fileName}
                <input type="file" style={{ display: "none" }} onChange={(e) => { setImage(e.target.files[0]); setFileName(e.target.files[0]?.name || "Click to upload image"); }} required />
              </label>
            </div>
            <button className="form-submit" type="submit">Add Part →</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPart;