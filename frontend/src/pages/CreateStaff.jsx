import { useState } from "react";
import axios from "axios";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .form-root { min-height: 100vh; background: #0c0c0c; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; padding: 40px; }
  .form-card { background: #141414; border: 1px solid #1e1e1e; border-radius: 16px; padding: 56px 52px; width: 100%; max-width: 480px; position: relative; overflow: hidden; }
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
  .form-submit { width: 100%; padding: 16px; background: linear-gradient(135deg, #b8860b, #8b6508); border: none; border-radius: 8px; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; cursor: pointer; margin-top: 8px; transition: opacity 0.2s, transform 0.1s; }
  .form-submit:hover { opacity: 0.88; transform: translateY(-1px); }
`;

const CreateStaff = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/staff", { name, mobile, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Staff created successfully");
      setName(""); setMobile(""); setPassword("");
    } catch { alert("Failed to create staff"); }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="form-root">
        <div className="form-card">
          <button className="form-back" onClick={() => window.location.href = "/staff-management"}>✕</button>
          <span className="form-icon">👤</span>
          <div className="form-title">Create Staff</div>
          <div className="form-sub">Add a new staff member</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" placeholder="Staff name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input className="form-input" type="text" placeholder="10-digit mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="form-submit" type="submit">Create Staff →</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStaff;