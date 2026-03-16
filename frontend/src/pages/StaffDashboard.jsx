import axios from "axios";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .sd-root {
    min-height: 100vh;
    background: #0c0c0c;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  .sd-card {
    background: #141414;
    border: 1px solid #1e1e1e;
    border-radius: 16px;
    padding: 60px 56px;
    width: 100%;
    max-width: 560px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .sd-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, #b8860b, #ff8c00, #b8860b);
  }

  .sd-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #b8860b, #8b0000);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    margin: 0 auto 24px;
    border: 2px solid rgba(184,134,11,0.3);
  }

  .sd-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 44px;
    letter-spacing: 4px;
    color: #fff;
    line-height: 1;
    margin-bottom: 6px;
  }

  .sd-sub {
    font-size: 13px;
    color: #555;
    letter-spacing: 1px;
    margin-bottom: 48px;
  }

  .sd-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sd-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    color: #ccc;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    width: 100%;
  }

  .sd-btn:hover {
    background: #1e1e1e;
    border-color: #b8860b;
    color: #fff;
  }

  .sd-btn-left { display: flex; align-items: center; gap: 12px; }
  .sd-btn-icon { font-size: 20px; }
  .sd-btn-label { font-size: 15px; font-weight: 500; }
  .sd-btn-desc { font-size: 12px; color: #555; margin-top: 2px; }
  .sd-btn-arrow { color: #444; font-size: 18px; transition: color 0.2s; }
  .sd-btn:hover .sd-btn-arrow { color: #b8860b; }

  .sd-btn-primary {
    background: linear-gradient(135deg, #b8860b, #8b6508);
    border-color: transparent;
    color: #fff;
  }

  .sd-btn-primary:hover { opacity: 0.9; border-color: transparent; }
  .sd-btn-primary .sd-btn-desc { color: rgba(255,255,255,0.5); }
  .sd-btn-primary .sd-btn-arrow { color: rgba(255,255,255,0.5); }

  .sd-logout {
    margin-top: 32px;
    background: none;
    border: none;
    color: #444;
    font-size: 12px;
    letter-spacing: 1px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
  }

  .sd-logout:hover { color: #ef4444; }
`;

const StaffDashboard = () => {
  const generateReport = async () => {
    try {
      const token = localStorage.getItem("token");
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

  const btns = [
    { icon: "🔧", label: "View Parts", desc: "Browse inventory", href: "/parts", primary: false },
    { icon: "🛒", label: "View Cart", desc: "Manage your cart", href: "/cart", primary: false },
    { icon: "⬇", label: "Generate Report", desc: "Download usage PDF", action: generateReport, primary: true },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="sd-root">
        <div className="sd-card">
          <div className="sd-avatar">👷</div>
          <div className="sd-title">Staff Dashboard</div>
          <div className="sd-sub">Welcome back — what would you like to do?</div>

          <div className="sd-actions">
            {btns.map((b) => (
              <button
                key={b.label}
                className={`sd-btn${b.primary ? " sd-btn-primary" : ""}`}
                onClick={b.action || (() => window.location.href = b.href)}
              >
                <div className="sd-btn-left">
                  <span className="sd-btn-icon">{b.icon}</span>
                  <div>
                    <div className="sd-btn-label">{b.label}</div>
                    <div className="sd-btn-desc">{b.desc}</div>
                  </div>
                </div>
                <span className="sd-btn-arrow">›</span>
              </button>
            ))}
          </div>

          <button className="sd-logout" onClick={() => { localStorage.clear(); window.location.href = "/"; }}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default StaffDashboard;