function GenreBox() {
  return (
    <div className="h-50 flex flex-col gap-8 w-[85%] m-auto -translate-y-15 rounded-2xl p-7 bg-[#101010] border border-[#252525]">
      <div>
        <div className="flex flex-col">
          <span className="text-red-500 font-bold font-[Nunito] text-[0.9rem]">
            EXPLORE
          </span>
          <span className="text-5xl  font-[Bebas_Neue] tracking-wider">
            PICK YOUR OBSESSION.
          </span>
        </div>
        <div></div>
      </div>
      <div className="flex gap-3 text-[0.9rem] text-[#d8cbcb]">
        <span className="bg-white border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit text-black">
          ALL
        </span>
        <span className="bg-[#202020] border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          ACTION
        </span>
        <span className="bg-[#202020] border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          SCI-FI
        </span>
        <span className="bg-[#202020] border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          THRILLER
        </span>
        <span className="bg-[#202020] border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          DRAMA
        </span>
        <span className="bg-[#202020] border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          HORROR
        </span>
        <span className="bg-[#202020] border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          ROMANCE
        </span>
        <span className="bg-[#202020] border border-[#353535] py-1.5 px-6 font-semibold font-[Nunito] rounded-full flex justify-center items-center w-fit">
          ANIMATION
        </span>
      </div>
    </div>
  );
}

export default GenreBox;
