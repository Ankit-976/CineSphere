import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/Api";
import { RiCoupon2Line } from "@remixicon/react";
import { FormatTime } from '../utils/FormatTime'
import toast from 'react-hot-toast'

const SelectSeat = () => {
  const { showId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null)
  const [booking, setBooking] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getShowAndSeats = async () => {
      const response = await api.get(`/movie/getShow/${showId}`);
      setShow(response.data.show)
      setSeats(response.data.show.seats)
    }
    getShowAndSeats()
  }, [showId]);

  const sortedSeats = [...seats].sort((a, b) => {
    const rowA = a.seatNumber[0];
    const rowB = b.seatNumber[0];

    if (rowA !== rowB) {
      return rowA.localeCompare(rowB);
    }

    const numA = parseInt(a.seatNumber.slice(1));

    const numB = parseInt(b.seatNumber.slice(1));

    return numA - numB;
  });

  const groupedSeats = sortedSeats.reduce((acc, seat) => {
    const row = seat.seatNumber[0];
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {});

  const handleSelectSeats = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prev) => {
      const alreadySelected = prev.some((s) => s.id === seat.id);
      if (alreadySelected) {
        return prev.filter((s) => s.id !== seat.id);
      }

      return [...prev, seat];
    });
  };

    const subtotal = selectedSeats.reduce(
      (acc, seat) => {
        return acc + seat.price;
      },
      0,
    );

    const conveniencefee = selectedSeats.length * 30 || 0;
    const totalPay = subtotal + conveniencefee;

    const handleBookingSeats = async () => {
      const seatIds = []
      selectedSeats.map((seat) => {
        seatIds.push(seat.id)
      })
      const data = {
        showId: Number(showId),
        seatIds: seatIds
      }
      

      const response = await api.post('/booking/', data)
      setBooking(response.data.booking)
      setSelectedSeats([])
      console.log(booking);
    }
    
    
  return (
    <div className="px-25 pt-35 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-[0.85rem] font-[Nunito] font-bold tracking-wide text-red-500">
          SEAT SELECTION
        </span>
        <span className="text-6xl font-[Bebas_Neue] tracking-wide">
          {show?.movie?.title}
        </span>
        <div className="font-[Nunito] tracking-wider text-[#909090]">
          CINELUX IMAX - Screen 1{"(IMAX)"} . Today {FormatTime(show?.startTime)}
        </div>
      </div>
      <div className="flex gap-10 ">
        <div className="flex flex-col items-end gap-5 px-15 pt-0">
          <div className="w-full flex flex-col items-end gap-3">
            <div className="w-[90%] bg-white/70 h-1.5 rounded-t-full flex justify-center"></div>
            <div className=" w-full flex justify-center">
              <span className="font-[Nunito] tracking-[0.4em] font-bold text-[0.8rem] text-[#777]">
                ALL EYES THIS WAY - SCREEN
              </span>
            </div>
          </div>
          <div className="flex flex-col p-5 pr-30 gap-6">
            {Object.entries(groupedSeats).map(([row, seats]) => {
              return (
                <div key={row} className="">
                  <div className=" flex gap-30">
                    <span className="w-8 h-8 text-[#777] font-[Nunito] flex justify-center items-center bg-">
                      {row}
                    </span>

                    <div className="flex gap-5">
                      {seats.map((seat) => {
                        return (
                          <div key={seat.id}>
                            <div
                              onClick={() => {
                                handleSelectSeats(seat);
                              }}
                              className={`
                                h-8 w-8 cursor-pointer  flex justify-center items-center border text-[0.8rem] font-[Nunito]  border-[#303030] rounded-xl
                                ${
                                  seat.isBooked
                                    ? "bg-[#202020] cursor-not-allowed text-[#555]"
                                    : selectedSeats.some(
                                          (s) => s.id === seat.id,
                                        )
                                      ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)]"
                                      : "bg-black hover:bg-[#2d2d2d]"
                                }
                                `}
                            >
                              {seat.seatNumber.slice(1)}
                            </div>
                            {seat.seatNumber.slice(1) == 5 && (
                              <div className="w-15"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {row == "C" && <div className="h-5"></div>}
                  {row == "F" && <div className="h-5"></div>}
                </div>
              );
            })}
            <div className=" flex justify-end">
              <div className="w-[80%]  flex justify-center font-[Nunito] text-[0.85rem] items-center gap-6">
                <div className="flex justify-center items-center gap-2">
                  <span className=" h-6 w-6  flex bg-black justify-center items-center border text-[0.8rem] font-[Nunito]  border-[#303030] rounded-lg"></span>
                  <span>Available</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <span className=" h-6 w-6  flex bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)] justify-center items-center border text-[0.8rem] font-[Nunito]  border-[#303030] rounded-lg"></span>
                  <span>Selected</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <span className=" h-6 w-6  flex bg-[#202020] justify-center items-center border text-[0.8rem] font-[Nunito]  border-[#303030] rounded-lg"></span>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-90 h-fit bg-[#101010] rounded-2xl py-2 border shrink-0 border-[#303030] ">
          <div className="flex flex-col border-b border-[#303030] px-6 pt-5 pb-4 gap-1">
            <span className="text-[0.9rem] font-[Nunito] font-bold tracking-wide text-red-500">
              YOUR ORDER
            </span>
            <span className="font-[Bebas_Neue] text-3xl tracking-wider">
              {show?.movie?.title}
            </span>
            <div className="font-[Nunito] text-[0.85rem] font-semibold tracking-wide text-[#909090]">
              CINELUX IMAX <br /> Screen 1{"(IMAX)"} . Today {FormatTime(show?.startTime)}
            </div>
          </div>
          <div className="flex flex-col p-6 gap-3">
            <span className="text-[0.85rem] font-[Nunito] font-bold text-[#505050]">
              SEATS
            </span>
            {selectedSeats.length ? (
              <div className="flex gap-2 flex-wrap">
                {selectedSeats.map((seat) => {
                  return (
                    <span
                      key={seat.id}
                      className="text-white px-2 w-fit text-[0.8rem] shrink-0 font-semibold border border-[#303030] py-0.5 rounded-md bg-[#202020]"
                    >
                      {seat.seatNumber} .{" "}
                      <span className="text-[#888]">{seat.type}</span>
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className="text-[0.85rem] block font-[Nunito] pb-1 font-bold text-[#505050]">
                Tap any seat in the layout to select.
              </span>
            )}
            <hr className="text-[#303030]" />
            <div className="flex justify-between items-center text-[0.9rem] text-[#909090] font-[Nunito]">
              <span>{`Subtotal (${selectedSeats.length})`}</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-[0.9rem] text-[#909090] font-[Nunito]">
              <span>Convenience fee</span>
              <span>{conveniencefee? `₹${conveniencefee}` : "-"}</span>
            </div>
            <div className="flex justify-between items-center text-[1.1rem] text-white font-[Nunito]">
              <span>Total</span>
              <span>₹{totalPay? `${totalPay}` : "0"}</span>
            </div>
            <button
              onClick={() => {
                handleBookingSeats()
                navigate('/mybookings')
                toast.success(`Your payable is ${totalPay} of seats `) 
              }}
              className={`
              flex items-center font-[Nunito] cursor-pointer text-[1rem] p-2.5 font-bold rounded-full justify-center gap-2
              ${
                selectedSeats.length
                  ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)]"
                  : "bg-[#505050]"
              }
              `}
            >
              <RiCoupon2Line size={15} />{" "}
              {selectedSeats.length ? `Pay ${totalPay}` : "Select Seats"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeat;
