const UserDropdown = ({ setIsLoggedIn, setisUserDropActive }) => {
  const logoutBtn = () => {
    setIsLoggedIn(false);
    setisUserDropActive(false);
  };
  return (
    <div className="absolute bg-black top-15 right-25 flex flex-col font-semibold gap-1 w-50 rounded-xl border-[0.1px] border-gray-600/50 font-['Nunito']">
      <div className="flex flex-col px-5 pt-4">
        <span className="text-[0.85rem]">Username</span>
        <span className="text-[0.8rem] text-gray-500/70">Emailusernahah</span>
      </div>
      <hr className="w-[90%] m-auto text-gray-600/60" />
      <div className="flex flex-col text-[0.9rem] px-5 pb-4 gap-2">
        <span className="cursor-pointer">My Bookings</span>
        <span className="text-red-700 cursor-pointer" onClick={logoutBtn}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default UserDropdown;
