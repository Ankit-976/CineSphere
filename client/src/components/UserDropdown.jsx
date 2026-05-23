import { RiCouponLine, RiLogoutCircleRLine } from "@remixicon/react";
import api from "../utils/Api";
import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";

const UserDropdown = ({ setisUserDropActive, isUserDropActive }) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const logoutBtn = async () => {
    await api.post("/auth/user/logout");
    setIsLoggedIn(false);
    setisUserDropActive(false);
  };

  useEffect(() => {
    gsap.set(dropdownRef.current, {
      scale: 0.8,
      opacity: 0,
    });
  }, []);

  useEffect(() => {
    if (isUserDropActive) {
      gsap.to(dropdownRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
        transformOrigin: "top right",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(dropdownRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
        transformOrigin: "top right",
        pointerEvents: "auto",
      });
    }
  }, [isUserDropActive]);
  return (
    <div
      id="userDropdown"
      ref={dropdownRef}
      className="absolute bg-black top-15 right-25 flex flex-col font-semibold gap-2 w-55 rounded-xl border-[0.1px] border-gray-600/50 font-['Nunito']"
    >
      <div className="flex flex-col px-5 pt-3">
        <span className="text-[0.88rem]">Username</span>
        <span className="text-[0.85rem] text-gray-500/70">Emailusernahah</span>
      </div>
      <hr className="w-[90%] m-auto text-gray-600/60" />
      <div className="flex flex-col text-[0.86rem] px-5 pb-3 gap-2">
        <span className="cursor-pointer flex items-center gap-2">
          <RiCouponLine size={17} />
          My Bookings
        </span>
        <span
          className="text-red-700 cursor-pointer flex items-center gap-2"
          onClick={logoutBtn}
        >
          <RiLogoutCircleRLine size={17} />
          Logout
        </span>
      </div>
    </div>
  );
};

export default UserDropdown;
