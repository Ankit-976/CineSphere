import gsap from "gsap";
import { useEffect, useRef } from "react";

const BookShow = ({ movie }) => {
  const movieCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(movieCardRef.current, 
      {
        y:10,
        opacity:0
      },
      {
        y:0,
        opacity:1,
        duration:0.7,
        ease: 'power3.inOut'
      }
        );
      gsap.fromTo('.movieInfor', 
        {
            y:10,
            opacity:0
        },
        {
            y: 0,
            opacity:1,
            duration:1,
            ease:'power3.inOut',
            stagger: 0.1
        }
    )
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <div
          className="h-screen bg-cover bg-top flex items-end justify-start px-20 py-10"
          style={{
            backgroundImage:
              `url(${movie.posterUrl})`,
          }}
        >
          <div
            ref={movieCardRef}
            className=" h-95 w-65 rounded-3xl border border-[#303030] bg-cover bg-center shrink-0"
            style={{
              backgroundImage: `url(${movie.posterUrl})`,
            }}
          ></div>
          <div className="flex flex-col gap-5 h-95 px-5 justify-center">
            <div className="flex flex-col gap-3">
              <span className="movieInfor text-red-500 font-[Nunito] font-bold text-[1rem] tracking-wide">
                {movie.genre}
              </span>
              <span className="movieInfor font-[Bebas_Neue] text-7xl">{movie.title}</span>
            </div>
            <p className="movieInfor font-[Nunito] italic text-[#dad1d1]">
              Some deals are sealed in shadow.
            </p>
            <div className="movieInfor font-[Nunito] text-[1rem] flex gap-5">
              <span>⭐️ 8.4/10</span>
              <span>{Math.floor(movie.duration/60)}h{" "}{movie.duration%60}m</span>
              <span>{movie.language}</span>
              <span>{movie.releaseDate}</span>
            </div>
            <p className="movieInfor w-[70%] font-[Nunito]">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookShow;
