import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import BackBtn from './components/BackBtn'
import Login from './pages/Login'

import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import BookShow from "./pages/BookShow";

const App = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/register" || location.pathname === "/login";
  return (
    <div>
      {location.pathname !== "/" && <BackBtn />}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/bookshow/:movieId" element={<BookShow />} />
      </Routes>
    </div>
  );
};

export default App;
