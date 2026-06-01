import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RiLogoutCircleRLine, RiMenuFold2Line } from "@remixicon/react";
import api from "../utils/Api";
import AuthContext from "../contexts/AuthContext";

const MobileDrawer = ({ isOpen, onClose, isLoggedIn, user }) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous || "";
    };
  }, [isOpen]);

  const logoutBtn = async () => {
    await api.post("/auth/user/logout");
    setIsLoggedIn(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex font-[Nunito] lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden
      />
      <aside className="ml-auto w-72 max-w-[80%] bg-[#0b0b0b] text-white px-6 py-3 shadow-xl transform transition-transform duration-300 z-50 h-screen flex flex-col justify-between overflow-y-auto pb-6">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-gray-300 hover:text-white"
            >
              <RiMenuFold2Line size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-gray-200">
            <Link to={"/"} onClick={onClose} className="hover:text-white">
              Home
            </Link>
            <Link to={"/movies"} onClick={onClose} className="hover:text-white">
              Movies
            </Link>
            {isLoggedIn && (
              <Link
                to={"/mybookings"}
                onClick={onClose}
                className="hover:text-white"
              >
                My Bookings
              </Link>
            )}
          </nav>
        </div>

        <div className="border-t border-gray-800 mt-4 pt-5 flex flex-col gap-3 px-1 pb-10">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full  bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)] flex items-center justify-center">
                  {user?.username?.slice(0, 1)?.toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.88rem]">{user.username}</span>
                  <span className="text-[0.85rem] text-gray-500/70">
                    {user.email}
                  </span>
                </div>
              </div>
              <button
                onClick={logoutBtn}
                className="text-red-500 flex items-center gap-2 py-2 px-1 font-semibold"
              >
                <RiLogoutCircleRLine size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="py-2 px-3 rounded-full bg-transparent border border-gray-700 text-center w-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="py-2 px-3 rounded-full bg-red-600 text-center w-full"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default MobileDrawer;
