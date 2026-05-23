import bg from "../assets/interstellerlandscape.jpg";
import { RiArrowRightCircleFill, RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";


const Home = () => {
  return (
    <div>
      <div
        className="h-[90%] overflow-hidden w-full bg-cover bg-top absolute top-0 left-0"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="text-white h-full flex flex-col p-25 justify-end gap-6">
          <div className="flex gap-5 font-['Nunito'] text-[0.85rem] tracking-wider">
            <span className="font-bold text-red-500 "><span className="font-bold">•</span> NOW SHOWING</span>
            <span className="font-bold text-[#363333]">SCIENCE FICTION</span>
          </div>
          <div>
            <span className="text-9xl tracking-wide font-bold font-[Bebas_Neue]">INTERSTELLAR</span>
          </div>
          <div className="w-[40%] font-[Nunito]">
            <span className="font-semibold text-[#8a8a8a]">
              Interstellar is a 2014 sci-fi film where a pilot enters a black
              hole to communicate with his daughter across time and dimensions,
              ultimately saving humanity.
            </span>
          </div>
          <div className="flex gap-5 text-[#8a8a8a] font-[Nunito] text-[0.9rem] font-bold">
            <span>⭐️ 8.2/10</span>
            <span>2h22m</span>
            <span>English</span>
          </div>
          <div className="flex gap-3 font-semibold">
              <button className="bg-red-600 rounded-full py-2 px-5 flex items-center justify-center text-[0.9rem] cursor-pointer gap-2">
                <RiArrowRightCircleFill size='20' />Book Tickets
              </button>
              <button className="border-gray-800 border-[0.1px] rounded-full py-2 px-7 flex items-center justify-center text-[0.9rem] cursor-pointer bg-black/10">
                More Details
              </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="block bg-[#323232] h-1 rounded-3xl w-10"></span>
              <span className="block bg-[#323232] h-1 rounded-3xl w-10"></span>
              <span className="block bg-[#323232] h-1 rounded-3xl w-10"></span>
              <span className="block bg-[#323232] h-1 rounded-3xl w-10"></span>
            </div>
            <div className="flex gap-1">
              <span className="block bg-[#373434] h-fit w-fit p-2 rounded-full border border-[#505050]"><RiArrowLeftSLine /></span>
              <span className="block bg-[#373434] h-fit w-fit p-2 rounded-full border border-[#505050]"><RiArrowRightSLine /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
