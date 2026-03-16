import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCharts from "../pages/DashboardCharts";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .ad-root {
    min-height: 100vh;
    background: #0c0c0c;
    font-family: 'DM Sans', sans-serif;
    color: #e0e0e0;
  }

  /* ── Sidebar ── */
  .ad-sidebar {
    position: fixed;
    left: 0; top: 0; bottom: 0;
    width: 240px;
    background: #111;
    border-right: 1px solid #1e1e1e;
    display: flex;
    flex-direction: column;
    padding: 32px 0;
    z-index: 100;
  }

  .ad-logo {
    padding: 0 28px 40px;
    border-bottom: 1px solid #1e1e1e;
  }

  .ad-logo-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 4px;
    color: #fff;
    line-height: 1;
  }

  .ad-logo-sub {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #b8860b;
    margin-top: 4px;
  }

  .ad-nav {
    flex: 1;
    padding: 28px 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ad-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 28px;
    font-size: 13px;
    letter-spacing: 0.5px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
    border-left: 2px solid transparent;
    background: none;
    border-right: none;
    border-top: none;
    border-bottom: none;
    text-align: left;
    width: 100%;
    font-family: 'DM Sans', sans-serif;
  }

  .ad-nav-item:hover { color: #fff; background: #1a1a1a; }
  .ad-nav-item.active { color: #fff; border-left-color: #b8860b; background: #1a1a1a; }

  .ad-nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .ad-sidebar-footer {
    padding: 20px 28px;
    border-top: 1px solid #1e1e1e;
    font-size: 12px;
    color: #444;
  }

  /* ── Main ── */
  .ad-main {
    margin-left: 240px;
    padding: 48px 48px 80px;
  }

  .ad-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 48px;
  }

  .ad-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    letter-spacing: 4px;
    color: #fff;
    line-height: 1;
  }

  .ad-date {
    font-size: 12px;
    letter-spacing: 1px;
    color: #555;
  }

  .ad-report-btn {
    padding: 12px 28px;
    background: linear-gradient(135deg, #b8860b, #8b6508);
    border: none;
    border-radius: 6px;
    color: #fff;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
  }

  .ad-report-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  /* ── Stat Cards ── */
  .ad-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }

  .ad-stat-card {
    background: #141414;
    border: 1px solid #1e1e1e;
    border-radius: 10px;
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .ad-stat-card:hover { border-color: #b8860b; }

  .ad-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, #b8860b, transparent);
  }

  .ad-stat-icon {
    font-size: 24px;
    margin-bottom: 16px;
    display: block;
  }

  .ad-stat-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 44px;
    letter-spacing: 2px;
    color: #fff;
    line-height: 1;
  }

  .ad-stat-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #555;
    margin-top: 6px;
  }

  /* ── Quick Actions ── */
  .ad-section-title {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 16px;
  }

  .ad-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .ad-action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    color: #ccc;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .ad-action-btn:hover {
    background: #1e1e1e;
    border-color: #b8860b;
    color: #fff;
  }

  /* ── Low Stock ── */
  .ad-alert {
    background: linear-gradient(135deg, rgba(139,0,0,0.2), rgba(139,0,0,0.05));
    border: 1px solid rgba(220,38,38,0.3);
    border-radius: 10px;
    padding: 24px 28px;
    margin-bottom: 40px;
  }

  .ad-alert-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 2px;
    color: #ef4444;
    margin-bottom: 14px;
  }

  .ad-alert-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .ad-alert-item {
    background: rgba(220,38,38,0.1);
    border: 1px solid rgba(220,38,38,0.2);
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 13px;
    color: #fca5a5;
  }

  .ad-alert-stock { color: #ef4444; font-weight: 600; }
`;

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [lowStock, setLowStock] = useState([]);
  const [parts, setParts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", { headers: { Authorization: `Bearer ${token}` } });
      setStats(res.data);
    } catch { alert("Failed to load stats"); }
  };

  const fetchParts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/parts", { headers: { Authorization: `Bearer ${token}` } });
      setParts(res.data);
    } catch {}
  };

  const fetchLowStock = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/parts/low-stock", { headers: { Authorization: `Bearer ${token}` } });
      setLowStock(res.data);
    } catch {}
  };

  useEffect(() => { fetchStats(); fetchLowStock(); fetchParts(); }, []);

  const generateReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports/usage", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      const today = new Date().toLocaleDateString("en-GB").split("/").join("-");
      link.href = url;
      link.setAttribute("download", `usage_report(${today}).pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch { alert("Failed to generate report"); }
  };

  const statCards = [
    { icon: "📦", label: "Total Parts", value: stats.totalParts ?? "—" },
    { icon: "🗄️", label: "Total Stock", value: stats.totalStock ?? "—" },
    { icon: "👷", label: "Total Staff", value: stats.totalStaff ?? "—" },
    { icon: "📋", label: "Today's Usage", value: stats.todayUsage ?? "—" },
  ];

  const actions = [
    { icon: "📜", label: "Usage History", href: "/history" },
    { icon: "🔧", label: "View Parts", href: "/parts" },
    { icon: "➕", label: "Add New Part", href: "/add-part" },
    { icon: "👤", label: "Create Staff", href: "/create-staff" },
    { icon: "⚙️", label: "Manage Staff", href: "/staff-management" },
  ];

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <style>{CSS}</style>
      <div className="ad-root">
        {/* Sidebar */}
        <aside className="ad-sidebar">
          <div className="ad-logo">
            <div className="ad-logo-name">Car Decors</div>
            <div className="ad-logo-sub">Admin Panel</div>
          </div>
          <nav className="ad-nav">
            {actions.map((a) => (
              <button key={a.href} className={`ad-nav-item${window.location.pathname === a.href ? " active" : ""}`}
                onClick={() => window.location.href = a.href}>
                <span className="ad-nav-icon">{a.icon}</span>
                {a.label}
              </button>
            ))}
          </nav>
          <div className="ad-sidebar-footer">
            👑 Admin Account
          </div>
        </aside>

        {/* Main */}
        <main className="ad-main">
          <div className="ad-topbar">
            <div>
              <div className="ad-title">Dashboard</div>
              <div className="ad-date">{today}</div>
            </div>
            <button className="ad-report-btn" onClick={generateReport}>⬇ Generate Report</button>
          </div>

          {/* Stats */}
          <div className="ad-stats">
            {statCards.map((s) => (
              <div className="ad-stat-card" key={s.label}>
                <span className="ad-stat-icon">{s.icon}</span>
                <div className="ad-stat-val">{s.value}</div>
                <div className="ad-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="ad-section-title">Quick Actions</div>
          <div className="ad-actions">
            {actions.map((a) => (
              <button key={a.href} className="ad-action-btn" onClick={() => window.location.href = a.href}>
                <span>{a.icon}</span>{a.label}
              </button>
            ))}
          </div>

          {/* Low Stock Alert */}
          {lowStock.length > 0 && (
            <div className="ad-alert">
              <div className="ad-alert-title">⚠ Low Stock Alert</div>
              <ul className="ad-alert-list">
                {lowStock.map((part) => (
                  <li key={part._id} className="ad-alert-item">
                    {part.name} — <span className="ad-alert-stock">{part.stock} left</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Charts */}
          <DashboardCharts parts={parts} />
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;