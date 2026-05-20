import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div className="py-3 flex justify-between items-center px-25">
      <a href="/" className="flex items-center justify-center gap-2 cursor-pointer group">
        <img
          src={logo}
          alt="Logo"
          className=" rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(239,68,68,0.8)]"/>
        <span className="block text-xl">CineSphere</span>
      </a>
      <ul className="flex gap-15 text-[0.9rem] text-gray-500 font-semibold">
        <li className="text-gray-300 cursor-pointer">Home</li>
        <li className="hover:text-gray-300 cursor-pointer">Movies</li>
        <li className="hover:text-gray-300 cursor-pointer">My Bookings</li>
      </ul>
      <div className="flex items-center gap-3 font-semibold">
        <button className="bg-transparent border-gray-800 border-[0.1px] rounded-full py-2 px-6 flex items-center justify-center text-[0.9rem] cursor-pointer">
          Login
        </button>
        <button className="bg-red-600 rounded-full py-2 px-6 flex items-center justify-center text-[0.9rem] cursor-pointer">
          Sign Up
        </button>
        <button className="rounded-full py-2 px-3 flex bg-transparent border-[0.1px] border-gray-800 hidden gap-2 items-center justify-center cursor-pointer">
          <span className="block rounded-full bg-emerald-800 h-6 w-6">U</span>
          <span>User</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
