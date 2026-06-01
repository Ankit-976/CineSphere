import MovieCard from "./MovieCard";
import MovieContext from "../contexts/MovieContext";
import { useContext } from "react";
import { RiSparklingFill } from "@remixicon/react";

function MovieSection() {
  const { moviesfetched, loading } = useContext(MovieContext);

  if(loading) return null;
  return (
    <div className="flex flex-col gap-25">
      <div className="px-25 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-red-500 flex gap-1 text-[0.9rem] items-center font-[Nunito] font-bold tracking-wide">
            <RiSparklingFill size="17" />
            TRENDING NOW
          </span>
          <span className="text-6xl  tracking-wide font-[Bebas_Neue]">
            THE SEATS FILL BEFORE THE CREDITS ROLL.
          </span>
        </div>
        <div className="moviescrollbar flex overflow-x-scroll gap-8">
          {moviesfetched.map((movie, idx) => {
            return <MovieCard key={idx} movie={movie} />;
          })}
        </div>
      </div>
      <div className="px-25 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-red-500 text-[0.9rem] font-[Nunito] font-bold tracking-wide">
            NOW SHOWING
          </span>
          <span className="text-6xl  tracking-wide font-[Bebas_Neue]">
            IN THEATRES.
          </span>
        </div>
        <div className="moviescrollbar flex overflow-x-scroll gap-8">
          {moviesfetched.map((movie, idx) => {
            return <MovieCard key={idx} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
