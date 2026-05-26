import ShowCard from "./ShowCard";

const SelectShow = ({ movie }) => {
  console.log((movie.shows));

  const shows = movie?.shows || []
  
  return (
    <div className="h-fit p-25 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-[0.9rem] text-red-500 font-[Nunito] font-bold tracking-wider">
          SHOWTIMES
        </span>
        <span className="text-7xl font-[Bebas_Neue] tracking-wide">
          PICK YOUR SCREENING
        </span>
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
              return <ShowCard key={idx} show={show} />
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectShow;
