import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .sm-root { min-height: 100vh; background: #0c0c0c; font-family: 'DM Sans', sans-serif; color: #e0e0e0; padding: 48px; }
  .sm-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
  .sm-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 4px; color: #fff; line-height: 1; }
  .sm-title span { color: #b8860b; }
  .sm-header-right { display: flex; gap: 12px; }
  .sm-back { padding: 11px 20px; background: #141414; border: 1px solid #2a2a2a; border-radius: 8px; color: #888; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .sm-back:hover { border-color: #555; color: #fff; }
  .sm-add { padding: 11px 20px; background: linear-gradient(135deg, #b8860b, #8b6508); border: none; border-radius: 8px; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 2px; cursor: pointer; transition: opacity 0.2s; }
  .sm-add:hover { opacity: 0.85; }

  .sm-table-wrap { background: #141414; border: 1px solid #1e1e1e; border-radius: 12px; overflow: hidden; }
  .sm-table { width: 100%; border-collapse: collapse; }
  .sm-table thead tr { background: #1a1a1a; border-bottom: 1px solid #2a2a2a; }
  .sm-table th { padding: 16px 24px; text-align: left; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #b8860b; font-weight: 500; }
  .sm-table tbody tr { border-bottom: 1px solid #1e1e1e; transition: background 0.15s; }
  .sm-table tbody tr:last-child { border-bottom: none; }
  .sm-table tbody tr:hover { background: #1a1a1a; }
  .sm-table td { padding: 18px 24px; font-size: 14px; color: #ccc; }

  .sm-role-badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; }
  .sm-role-staff { background: rgba(59,130,246,0.1); color: #60a5fa; border: 1px solid rgba(59,130,246,0.2); }
  .sm-role-admin { background: rgba(184,134,11,0.1); color: #b8860b; border: 1px solid rgba(184,134,11,0.2); }

  .sm-delete { padding: 8px 16px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); border-radius: 6px; color: #f87171; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .sm-delete:hover { background: rgba(239,68,68,0.2); }

  .sm-count { font-size: 12px; color: #555; letter-spacing: 1px; margin-bottom: 20px; }
  .sm-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #2a2a2a, #1a1a1a); border: 1px solid #2a2a2a; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 12px; vertical-align: middle; }
  .sm-name-wrap { display: flex; align-items: center; }
`;

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const token = localStorage.getItem("token");

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/staff`, { headers: { Authorization: `Bearer ${token}` } });
      setStaff(res.data);
    } catch { alert("Failed to load staff"); }
  };

  useEffect(() => { fetchStaff(); }, []);

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/users/staff/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchStaff();
    } catch { alert("Failed to delete staff"); }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="sm-root">
        <div className="sm-header">
          <div>
            <div className="sm-title">Staff <span>Management</span></div>
          </div>
          <div className="sm-header-right">
            <button className="sm-add" onClick={() => window.location.href = "/create-staff"}>+ Add Staff</button>
            <button className="sm-back" onClick={() => window.location.href = "/admin"}>← Dashboard</button>
          </div>
        </div>

        <div className="sm-count">{staff.length} staff member{staff.length !== 1 ? "s" : ""}</div>

        <div className="sm-table-wrap">
          <table className="sm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="sm-name-wrap">
                      <span className="sm-avatar">👤</span>
                      {user.name}
                    </div>
                  </td>
                  <td>{user.mobile}</td>
                  <td>
                    <span className={`sm-role-badge ${user.role === "admin" ? "sm-role-admin" : "sm-role-staff"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button className="sm-delete" onClick={() => deleteStaff(user._id)}>✕ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StaffManagement;