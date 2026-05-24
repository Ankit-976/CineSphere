import img from "../assets/interstellerportrait.jpg";

const MovieCard = () => {
  return (
    <div className="h-110 w-60 overflow-hidden rounded-2xl bg-[#101010] group">
      {/* <img src={img} /> */}
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="bg-cover overflow-hidden flex flex-col justify-between  h-[80%] bg-center "
      >
        <div className="flex justify-between items-center font-[Nunito] p-4">
          <span className=" text-[0.85rem] bg-black/50 pr-2 pl-1 py-1 rounded-xl flex items-center justify-center">⭐️ 8.2</span>
          <span className="text-white text-[0.8rem] bg-red-500 px-2 py-1 rounded-xl font-bold">TRENDING</span>
        </div>
        <div className="flex flex-col  gap-2 p-3 translate-y-20 group-hover:translate-0 transition-transform duration-400 ease-in-out">
          <span className="text-[0.85rem] font-[Nunito] tracking-wide text-[#505050] font-bold">{"1H 36M"} . {"Genre"}</span>
          <button className="bg-red-600 rounded-full py-2 px-4 flex items-center w-fit justify-center text-[0.95rem] cursor-pointer gap-1 font-[Nunito] font-semibold text-white">
            Book Tickets
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-[20%] items-start pt-5 px-3">
        <span className="font-[Bebas_Neue] text-2xl/5 tracking-wide">
          {"Movie name"}
        </span>
        <span className="font-[Nunito] text-[#d4d4d4]">{"Genre"}</span>
      </div>
    </div>
  );
};

export default MovieCard;
