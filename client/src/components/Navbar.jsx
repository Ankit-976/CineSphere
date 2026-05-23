import { useState, useContext } from "react";
import logo from "../assets/logo.png";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, loading } = useContext(AuthContext);
  const [isUserDropActive, setisUserDropActive] = useState(false);

  const userDropdown = () => {
    setisUserDropActive(!isUserDropActive);
  };

  if (loading) return null;

  return (
    <div className="py-3 z-999 flex justify-between items-center px-25 absolute top-0 left-0 w-full">
      <a
        href="/"
        className="flex items-center justify-center gap-2 cursor-pointer group"
      >
        <img
          src={logo}
          alt="Logo"
          className=" rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(239,68,68,0.8)]"
        />
        <span className="block text-xl font-['Stack_Sans_Notch']">
          CineSphere
        </span>
      </a>
      <ul className="flex gap-15 text-[0.9rem] text-gray-500 font-semibold">
        <li className="text-gray-300 cursor-pointer">Home</li>
        <li className="hover:text-gray-300 cursor-pointer">Movies</li>
        {isLoggedIn && (
          <li className="hover:text-gray-300 cursor-pointer">My Bookings</li>
        )}
      </ul>
      <div className="flex items-center gap-3 font-semibold">
        {!isLoggedIn ? (
          <>
            <Link to={"/login"}>
              <button className="bg-black/10 border-gray-800 border-[0.1px] rounded-full py-2 px-6 flex items-center justify-center text-[0.9rem] cursor-pointer">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-red-600 rounded-full py-2 px-6 flex items-center justify-center text-[0.9rem] cursor-pointer">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <button
            className="rounded-full py-2 px-3 flex bg-black/80 border-[0.1px] border-gray-800 gap-2 items-center justify-center cursor-pointer"
            onClick={userDropdown}
          >
            <span className="block rounded-full bg-red-500 h-6 w-6">U</span>
            <span>User</span>
          </button>
        )}
      </div>
      {isLoggedIn && (
        <UserDropdown
          setIsLoggedIn={setIsLoggedIn}
          setisUserDropActive={setisUserDropActive}
          isUserDropActive={isUserDropActive}
        />
      )}
    </div>
  );
};

export default Navbar;
