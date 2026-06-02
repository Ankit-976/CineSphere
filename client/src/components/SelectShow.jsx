import { useState } from "react";
import ShowCard from "./ShowCard";
import { RiArrowRightLongLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const SelectShow = ({ movie }) => {
  const [selectedShow, setSelectedShow] = useState(null);
  const navigate = useNavigate();

  const shows = movie?.shows || [];

  return (
    <div className=" lg:p-25 px-7 pb-7 flex flex-col gap-5 lg:gap-10">
      <div className="flex flex-col gap-3">
        <span className="lg:text-[0.9rem] text-[0.85rem] text-red-500 font-[Nunito] font-bold tracking-wider">
          SHOW TIMES
        </span>
        <div className="lg:text-7xl text-6xl flex justify-between font-[Bebas_Neue] tracking-wide lg:items-center items-end">
          <span>PICK YOUR SCREENING</span>
          {selectedShow && (
            <button
              onClick={() => {
                navigate(`/selectseat/${selectedShow.id}`);
              }}
              className="bg-red-600 h-11 rounded-full px-5 flex items-center justify-center text-[0.9rem] font-[Nunito] -translate-y-2 lg:translate-y-0 tracking-tight font-semibold cursor-pointer gap-2 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            >
              <span className="hidden lg:flex">CONTINUE</span>
              <RiArrowRightLongLine size={20} className="order-2"/>
              <span className="order-1">PICKS SEATS</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className=" flex flex-col gap-12 rounded-2xl p-7 bg-[#101010] border border-[#252525]">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between font-[Nunito] tracking-wider text-[#606060]">
              <span>CITY</span>
              <span>TODAY</span>
            </div>
            <div className="text-3xl/1">CINELUX IMAX</div>
          </div>
          <div className="flex gap-5 flex-wrap">
            {shows.map((show, idx) => {
              return (
                <ShowCard
                  key={idx}
                  show={show}
                  selectedShow={selectedShow}
                  setSelectedShow={setSelectedShow}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectShow;
