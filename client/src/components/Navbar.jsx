import { useState, useContext, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import UserDropdown from "./UserDropdown";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import  gsap  from 'gsap'
import MovieContext from "../contexts/MovieContext";

gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
  const { loading } = useContext(MovieContext)
  const [isUserDropActive, setisUserDropActive] = useState(false);
  const navbarRef = useRef(null);

  const userDropdown = () => {
    setisUserDropActive(!isUserDropActive);
  };

useEffect(() => {
  if (loading) return;

  if (!navbarRef.current) return;

  const ctx = gsap.context(() => {
    gsap.to(navbarRef.current, {
      backgroundColor: "#000",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=200 top",
        end: "top+=100 top",
        scrub: 1,
      }
    });
  });

  return () => ctx.revert();
}, [loading]);


  return (
    <div 
    ref={navbarRef}
    className="py-2 z-999 flex justify-between items-center px-25 fixed top-0 left-0 w-full">
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
        <NavLink to={'/'} className={({ isActive }) => `hover:text-gray-300 cursor-pointer ${isActive && 'text-gray-300'}`}>Home</NavLink>
        <NavLink to={'/movies'} className={({ isActive }) => `hover:text-gray-300 cursor-pointer ${isActive && 'text-gray-300'}`}>Movies</NavLink>
        {isLoggedIn && (
        <NavLink to={'/mybookings'} className={({ isActive }) => `hover:text-gray-300 cursor-pointer ${isActive && 'text-gray-300'}`}>My Bookings</NavLink>
        )}
      </ul>
      <div className="flex items-center gap-3 font-semibold">
        {!isLoggedIn ? (
          <>
            <Link to={"/login"}>
              <button className="bg-[#101010] border-gray-800 border-[0.1px] rounded-full py-2 px-6 flex items-center justify-center text-[0.9rem] cursor-pointer">
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
            <span className=" flex justify-center items-center rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)] h-6 w-6">
              {user.username.slice(0, 1).toUpperCase()}
            </span>
            <span>{user.username}</span>
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
