import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from './pages/Login'
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/register" || location.pathname === "/login";
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
