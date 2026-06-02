import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const BookShow = ({ movie }) => {
  const movieCardRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        movieCardRef.current,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.inOut",
        },
      );
      gsap.fromTo(
        ".movieInfor",
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.1,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {

    const card = movieCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = -((y - centerY) / centerY) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(movieCardRef.current, {
      rotateX: 0,
      rotateY: 0,

      duration: 0.5,

      ease: "power3.out",
    });
  };

  const date = new Date(movie?.releaseDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <>
      <div className="h-screen">
        <div
          className="pt-30 lg:h-screen h-fit lg:bg-cover lg:bg-top flex flex-col lg:flex-row lg:items-end lg:justify-start gap-3 lg:gap-0 lg:px-20 lg:py-10 px-7  items-center justify-end"
          style={{
            backgroundImage: isLargeScreen ? `url(${movie?.posterUrl})` : "none",
          }}
        >
          <div
            ref={movieCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-95 w-65 rounded-3xl border transform-gpu border-[#303030] bg-cover bg-center shrink-0"
            style={{
              backgroundImage: `url(${movie?.posterUrl})`,
            }}
          ></div>
          <div className="flex flex-col lg:gap-5 gap-2 lg:h-95 pb-20  lg:px-5 justify-center">
            <div className="flex flex-col gap-1 lg:gap-3">
              <span className="movieInfor text-red-500 font-[Nunito] font-bold text-[1rem] tracking-wide">
                {movie.genre}
              </span>
              <span className="movieInfor font-[Bebas_Neue] text-7xl">
                {movie.title}
              </span>
            </div>
            <div className="movieInfor font-[Nunito] text-[0.9rem] lg:text-[1rem] flex gap-5">
              <span className="shrink-0">⭐️ 8.4/10</span>
              <span className="shrink-0">
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </span>
              <span className="shrink-0">{movie.language}</span>
              <span className="shrink-0">{date}</span>
            </div>
            <p className="movieInfor lg:w-[70%] font-[Nunito]">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookShow;
