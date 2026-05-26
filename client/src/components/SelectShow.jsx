import { useState } from "react";
import ShowCard from "./ShowCard";
import { RiArrowRightLongLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const SelectShow = ({ movie }) => {
  const [selectedShow, setSelectedShow] = useState(null);
  const navigate = useNavigate();

  const shows = movie?.shows || [];

  return (
    <div className="h-fit p-25 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-[0.9rem] text-red-500 font-[Nunito] font-bold tracking-wider">
          SHOWTIMES
        </span>
        <div className="text-7xl flex justify-between font-[Bebas_Neue] tracking-wide items-center">
          PICK YOUR SCREENING
          {selectedShow && (
            <button
              onClick={() => {
                navigate(`/selectseat/${selectedShow.id}`);
              }}
              className="bg-red-600 h-11 rounded-full px-5 flex items-center justify-center text-[0.9rem] font-[Nunito] tracking-tight font-semibold cursor-pointer gap-2 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            >
              CONTINUE
              <RiArrowRightLongLine size={20} />
              PICKS SEATS
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
