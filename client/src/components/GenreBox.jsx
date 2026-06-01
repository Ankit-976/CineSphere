import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

function GenreBox() {
  const { loading } = useContext(MovieContext)

  if(loading) return null;
  return (
    <div className="flex flex-col gap-5 lg:gap-8 lg:w-[85%] mx-auto rounded-2xl lg:p-7 p-5 bg-[#101010] border border-[#252525]">
      <div>
        <div className="flex flex-col">
          <span className="text-red-500 font-bold font-[Nunito] text-[0.85rem] lg:text-[0.9rem]">
            EXPLORE
          </span>
          <span className="text-3xl lg:text-5xl  font-[Bebas_Neue] tracking-wider">
            PICK YOUR OBSESSION.
          </span>
        </div>
        <div></div>
      </div>
      <div className="genreScroll flex gap-3 text-[0.9rem] lg:overflow-auto overflow-scroll text-[#d8cbcb]">
        <span className="bg-white border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit text-black">
          ALL
        </span>
        <span className="bg-[#202020] border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          ACTION
        </span>
        <span className="bg-[#202020] border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          SCI-FI
        </span>
        <span className="bg-[#202020] border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          THRILLER
        </span>
        <span className="bg-[#202020] border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          DRAMA
        </span>
        <span className="bg-[#202020] border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          HORROR
        </span>
        <span className="bg-[#202020] border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          ROMANCE
        </span>
        <span className="bg-[#202020] border border-[#353535] lg:py-1.5 lg:px-6 px-4 py-2 text-[0.85rem] lg:text-[1rem] shrink-0 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          ANIMATION
        </span>
      </div>
    </div>
  );
}

export default GenreBox;
