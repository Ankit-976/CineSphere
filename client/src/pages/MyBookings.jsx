import { Link } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import api from "../utils/Api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { RiCoupon2Line } from "@remixicon/react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await api.get("/booking/getBookings");
      setBookings(response.data.bookings);
    };

    fetchBookings();
  }, []);

  if (!user) return null;

  return (
    <div className="p-30 flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <span className="font-[Nunito] text-[0.9rem] font-bold text-red-500 tracking-wider">
          YOUR PASS VAULT
        </span>
        <span className="font-[Bebas_Neue] text-7xl tracking-wide">
          MY BOOKINGS.
        </span>
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-[#999] font-[Nunito] font-semibold">
            Signed in as {user?.email}
          </span>
          <Link to={`/movies`}>
            <button className="border-gray-800 border-[0.1px] rounded-full py-2 px-7 flex items-center justify-center text-[0.9rem] cursor-pointer font-[Nunito] font-bold bg-black/10">
              Explore Movies
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-10">
        {bookings.length ? (
          bookings.map((booking, idx) => {
            return <BookingCard key={idx} booking={booking} />;
          })
        ) : (
          <div className="w-full h-100 bg-[#101010] flex-col rounded-2xl flex justify-center items-center gap-5">
            <span className="rounded-full h-17 w-17 bg-[#222] border border-[#444] text-[#999] flex justify-center items-center">
              <RiCoupon2Line size={30} />
            </span>
            <span className="font-[Bebas_Neue] text-5xl tracking-wide">
              NO TICKETS YET.
            </span>
            <p className="font-[Nunito] text-[#777] font-semibold tracking-wide">
              Your bookings will land here as soon as you grab your first seat.
            </p>
            <button className="bg-red-600 h-11 rounded-full px-5 flex items-center justify-center text-[1rem] font-[Nunito] tracking-tight font-bold cursor-pointer gap-2 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
              Find a movie
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
