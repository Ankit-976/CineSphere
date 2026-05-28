import { RiCoupon2Line } from "@remixicon/react";
import { FormatTime } from "../utils/FormatTime";
import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-[#101010] h-65 rounded-2xl flex gap-5 py-5 px-7">
      <div
        className=" w-40 rounded-xl bg-cover shrink-0 bg-top"
        style={{ backgroundImage: `url(${booking.show.movie.posterUrl})` }}
      ></div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1 font-[Nunito]">
          <div className="text-[0.82rem] text-[#555] font-semibold">
            CONFIRMED
          </div>
          <div className="font-[Bebas_Neue] text-4xl tracking-wide">
            {booking.show.movie.title}
          </div>
          <div className=" text-[0.9rem] text-[#999]">CINELUX IMAX</div>
          <div className="text-[0.8rem] text-[#dad9d9]">
            Today <span className="text-[0.5rem]">•</span>{" "}
            {FormatTime(booking.show.startTime)} Seats:{" "}
            <span className="text-white">
              {booking.seats.map((seat, idx) => {
                return <span key={idx}>{seat.seatNumber} </span>;
              })}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className="text-[1.5rem] font-[Nunito] text-yellow-500 font-bold">
            $ {booking.totalPrice}
          </span>
          <Link to={`/mybookings/ticket/${booking.id}`}>
            <span className="text-[0.75rem] flex gap-1 items-center text-red-500 font-[Nunito] font-bold tracking-wider">
              <RiCoupon2Line size={13} />
              VIEW
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
