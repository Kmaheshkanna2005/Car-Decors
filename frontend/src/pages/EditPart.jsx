// ─────────────────────────────────────────────
// EditPart.jsx
// ─────────────────────────────────────────────
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  .form-file-label { width: 100%; background: #1a1a1a; border: 1px dashed #2a2a2a; border-radius: 8px; padding: 18px 16px; color: #666; font-size: 14px; cursor: pointer; text-align: center; display: block; transition: border-color 0.2s; }
  .form-file-label:hover { border-color: #b8860b; color: #ccc; }
  .form-submit { width: 100%; padding: 16px; background: linear-gradient(135deg, #b8860b, #8b6508); border: none; border-radius: 8px; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; cursor: pointer; margin-top: 8px; transition: opacity 0.2s, transform 0.1s; }
  .form-submit:hover { opacity: 0.88; transform: translateY(-1px); }
  .form-hint { font-size: 11px; color: #444; margin-top: 6px; letter-spacing: 0.5px; }
`;

const EditPart = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Click to replace image (optional)");
  const token = localStorage.getItem("token");

  const fetchPart = async () => {
    const res = await axios.get("http://localhost:5000/api/parts", { headers: { Authorization: `Bearer ${token}` } });
    const part = res.data.find((p) => p._id === id);
    setName(part.name);
    setCategory(part.category);
    setPrice(part.price);
  };

  useEffect(() => { fetchPart(); }, []);

  const updatePart = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    if (image) formData.append("image", image);
    await axios.put(`http://localhost:5000/api/parts/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
    });
    alert("Part updated successfully");
  };
  const deletePart = async () => {

  const confirmDelete = window.confirm("Are you sure you want to delete this part?");

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `http://localhost:5000/api/parts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Part deleted successfully");

    window.location.href = "/parts";

  } catch (error) {
    console.error(error);
    alert("Failed to delete part");
  }
};

  return (
    <>
      <style>{FORM_CSS}</style>
      <div className="form-root">
        <div className="form-card">
          <button className="form-back" onClick={() => window.location.href = "/parts"}>✕</button>
          <span className="form-icon">✏️</span>
          <div className="form-title">Edit Part</div>
          <div className="form-sub">Update part information</div>

          <form onSubmit={updatePart}>
            <div className="form-group">
              <label className="form-label">Part Name</label>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Part name" />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            </div>
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input className="form-input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            </div>
            <div className="form-group">
              <label className="form-label">Image</label>
              <label className="form-file-label">
                📷 {fileName}
                <input type="file" style={{ display: "none" }} onChange={(e) => { setImage(e.target.files[0]); setFileName(e.target.files[0]?.name || "Click to replace image"); }} />
              </label>
              <div className="form-hint">Leave empty to keep current image</div>
            </div>
            <button className="form-submit" type="submit">Update Part →</button>
            <button
  type="button"
  onClick={deletePart}
  style={{
    width: "100%",
    padding: "16px",
    background: "#8b0000",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontFamily: "Bebas Neue",
    fontSize: "18px",
    letterSpacing: "3px",
    cursor: "pointer",
    marginTop: "12px"
  }}
>
  Delete Part
</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPart;