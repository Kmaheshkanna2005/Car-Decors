import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import PartsPage from "./pages/PartsPage";
import CartPage from "./pages/CartPage";
import UsageHistory from "./pages/UsageHistory";
import AddPart from "./pages/AddPart";
import CreateStaff from "./pages/CreateStaff";
import StaffManagement from "./pages/StaffManagement";
import EditPart from "./pages/EditPart";
function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={token ? <CartPage /> : <Navigate to="/" />} />
        <Route path="/history" element={<UsageHistory />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route path="/create-staff" element={<CreateStaff />} />
        <Route path="/staff-management" element={<StaffManagement />} />
        <Route path="/edit-part/:id" element={<EditPart />} />
        <Route
          path="/admin"
          element={
            token && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/staff"
          element={
            token && role === "staff" ? (
              <StaffDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/parts"
          element={token ? <PartsPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;