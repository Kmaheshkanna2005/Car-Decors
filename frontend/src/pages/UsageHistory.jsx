import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .uh-root { min-height: 100vh; background: #0c0c0c; font-family: 'DM Sans', sans-serif; color: #e0e0e0; padding: 48px; }
  .uh-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
  .uh-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 4px; color: #fff; line-height: 1; }
  .uh-title span { color: #b8860b; }
  .uh-back { padding: 11px 20px; background: #141414; border: 1px solid #2a2a2a; border-radius: 8px; color: #888; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .uh-back:hover { border-color: #555; color: #fff; }

  .uh-count { font-size: 12px; color: #555; letter-spacing: 1px; margin-bottom: 20px; }

  .uh-table-wrap { background: #141414; border: 1px solid #1e1e1e; border-radius: 12px; overflow: hidden; overflow-x: auto; }
  .uh-table { width: 100%; border-collapse: collapse; min-width: 700px; }
  .uh-table thead tr { background: #1a1a1a; border-bottom: 1px solid #2a2a2a; }
  .uh-table th { padding: 16px 24px; text-align: left; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #b8860b; font-weight: 500; white-space: nowrap; }
  .uh-table tbody tr { border-bottom: 1px solid #1a1a1a; transition: background 0.15s; }
  .uh-table tbody tr:last-child { border-bottom: none; }
  .uh-table tbody tr:hover { background: #1a1a1a; }
  .uh-table td { padding: 16px 24px; font-size: 14px; color: #ccc; white-space: nowrap; }

  .uh-part-name { color: #fff; font-weight: 500; }
  .uh-qty { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #b8860b; letter-spacing: 1px; }
  .uh-date { color: #555; font-size: 13px; }

  .uh-cat-badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; background: rgba(184,134,11,0.1); color: #b8860b; border: 1px solid rgba(184,134,11,0.2); }

  .uh-empty { text-align: center; padding: 80px; color: #444; font-size: 15px; }
`;

const UsageHistory = () => {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/reports/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch { alert("Failed to load history"); }
  };

  useEffect(() => { fetchHistory(); }, []);

  const totalRows = history.reduce((sum, r) => sum + r.partsUsed.length, 0);

  return (
    <>
      <style>{CSS}</style>
      <div className="uh-root">
        <div className="uh-header">
          <div>
            <div className="uh-title">Usage <span>History</span></div>
          </div>
          <button className="uh-back" onClick={() => window.location.href = "/admin"}>← Dashboard</button>
        </div>

        <div className="uh-count">{totalRows} usage record{totalRows !== 1 ? "s" : ""}</div>

        <div className="uh-table-wrap">
          <table className="uh-table">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Mobile</th>
                <th>Part</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {totalRows === 0 && (
                <tr><td colSpan={6} className="uh-empty">No usage records found.</td></tr>
              )}
              {history.map((record) =>
                record.partsUsed.map((item, index) => (
                  <tr key={`${record._id}-${index}`}>
                    <td>{record.staffId.name}</td>
                    <td>{record.staffId.mobile}</td>
                    <td className="uh-part-name">{item.partId.name}</td>
                    <td><span className="uh-cat-badge">{item.partId.category}</span></td>
                    <td><span className="uh-qty">×{item.quantity}</span></td>
                    <td className="uh-date">{new Date(record.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsageHistory;