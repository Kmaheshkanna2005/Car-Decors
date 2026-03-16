import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { mobile, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      window.location.href = res.data.role === "admin" ? "/admin" : "/staff";
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .login-root {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        .login-left {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #b8860b 0%, #8b0000 50%, #0a0a0a 100%);
          opacity: 0.85;
        }

        .login-left-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .login-brand {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
        }

        .brand-logo-ring {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(255,215,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          position: relative;
        }

        .brand-logo-ring::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px solid rgba(255,215,0,0.25);
        }

        .brand-icon {
          font-size: 48px;
        }

        .brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          letter-spacing: 6px;
          line-height: 1;
          color: #fff;
        }

        .brand-tagline {
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,215,0,0.7);
          margin-top: 8px;
        }

        .login-right {
          width: 480px;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 50px;
          position: relative;
        }

        .login-right::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #b8860b, transparent);
        }

        .login-form-wrap {
          width: 100%;
        }

        .login-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 3px;
          color: #fff;
          margin-bottom: 6px;
        }

        .login-subheading {
          font-size: 13px;
          color: #666;
          letter-spacing: 1px;
          margin-bottom: 48px;
        }

        .field-group {
          margin-bottom: 24px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #b8860b;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .field-input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 14px 18px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .field-input:focus {
          border-color: #b8860b;
          box-shadow: 0 0 0 3px rgba(184,134,11,0.1);
        }

        .field-input::placeholder { color: #444; }

        .login-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #b8860b, #8b6508);
          border: none;
          border-radius: 6px;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 3px;
          cursor: pointer;
          margin-top: 16px;
          transition: opacity 0.2s, transform 0.1s;
          position: relative;
          overflow: hidden;
        }

        .login-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .login-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }

        .login-btn:hover::after { transform: translateX(100%); }

        @media (max-width: 768px) {
          .login-left { display: none; }
          .login-right { width: 100%; }
        }
      `}</style>

      <div className="login-root">
        <div className="login-left">
          <div className="login-left-grid" />
          <div className="login-brand">
            <div className="brand-logo-ring">
              <span className="brand-icon">🚗</span>
            </div>
            <div className="brand-name">Car Decors</div>
            <div className="brand-tagline">Premium Auto Parts Management</div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-wrap">
            <div className="login-heading">Sign In</div>
            <div className="login-subheading">Access your dashboard</div>

            <form onSubmit={handleLogin}>
              <div className="field-group">
                <label className="field-label">Mobile Number</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Enter your mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <input
                  className="field-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Authenticating..." : "Enter Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;