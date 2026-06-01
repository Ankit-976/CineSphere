import {
  RiArrowRightCircleFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "@remixicon/react";
import { useEffect, useState, useRef, useContext } from "react";
import { gsap } from "gsap";
import MovieContext from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import HomeSkeleton from "./Skeletons/HomeSkeleton";

const Home = () => {
  const { moviesfetched, loading } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ratingTimeRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const requiredMovies = async () => {
      setMovies(moviesfetched.slice(0, 4));
    };

    requiredMovies();
  }, [moviesfetched]);

  const changeMovie = (newIndex) => {
    gsap.to(
      [titleRef.current, descRef.current, ratingTimeRef.current],

      {
        y: -10,
        opacity: 0,

        duration: 0.6,
        ease: "power2.in",

        stagger: 0.08,

        onComplete: () => {
          gsap.to(bgRef.current, {
            opacity: 0,

            duration: 0.5,
            ease: "power2.in",
          });
          setCurrentIndex(newIndex);
          gsap.fromTo(
            bgRef.current,

            {
              opacity: 0,
            },

            {
              opacity: 1,

              duration: 1,
              ease: "power2.out",
            },
          );

          gsap.fromTo(
            [titleRef.current, descRef.current, ratingTimeRef.current],

            {
              y: 10,
              opacity: 0,
            },

            {
              y: 0,
              opacity: 1,

              duration: 0.8,
              ease: "power3.out",

              stagger: 0.08,
            },
          );
        },
      },
    );
  };

  useEffect(() => {
    if (!movies.length) return;
    gsap.set(".movieline", { scaleX: 0, transformOrigin: "left" });
    gsap.to(`#movieline${currentIndex}`, {
      scaleX: 1,
      duration: 6,
      delay: 1,
      transformOrigin: "left",
      ease: "none",
    });
  }, [movies, currentIndex]);

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === movies.length - 1 ? 0 : currentIndex + 1;

      changeMovie(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies, currentIndex]);

  if(loading) {
    return <HomeSkeleton />
  }

  const currentMovie = movies[currentIndex];

  return (
    <>
      <div className="h-200">
        <div
          ref={bgRef}
          className="h-full  w-full bg-cover bg-center lg:bg-top"
          style={{ backgroundImage: `url(${currentMovie?.posterUrl})` }}
        >
          <div className="text-white h-full flex flex-col backdrop-brightness-75 px-7 py-15 lg:px-25 lg:py-20 justify-end gap-6">
            <div className="flex gap-5 font-['Nunito'] text-[0.85rem] tracking-wider">
              <span className="font-bold text-red-500 flex items-center gap-2">
                <span className="font-bold">•</span> NOW SHOWING
              </span>
              <span className="font-bold text-[#d5d5d5]">
                {currentMovie?.genre.toUpperCase()}
              </span>
            </div>
            <div>
              <span
                ref={titleRef}
                className="block text-7xl lg:text-9xl tracking-wide font-bold font-[Bebas_Neue]"
              >
                {currentMovie?.title}
              </span>
            </div>
            <div className="lg:w-[40%] w-[80%] font-[Nunito]">
              <span
                ref={descRef}
                className=" block font-semibold text-[#d5d5d5]"
              >
                {currentMovie?.description}
              </span>
            </div>
            <div
              ref={ratingTimeRef}
              className="flex gap-5 text-[#d5d5d5] font-[Nunito] text-[0.9rem] font-bold"
            >
              <span>⭐️ 8.2/10</span>
              <span>
                {currentMovie?.duration
                  && `${Math.floor(currentMovie.duration / 60)}h${
                      currentMovie.duration % 60
                    }m`}
              </span>
              <span>{currentMovie?.language}</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 font-semibold">
              <Link to={`/bookshow/${currentMovie?.id}`}>
                <button className="bg-red-600 rounded-full py-3 lg:py-2 px-5 flex w-full lg:w-fit items-center justify-center text-[0.9rem] cursor-pointer gap-2">
                  <RiArrowRightCircleFill size="20" />
                  Book Tickets
                </button>
              </Link>
              <Link to={`/bookshow/${currentMovie?.id}`}>
                <button className="border-gray-800 border-[0.1px] w-full lg:w-fit rounded-full py-3 lg:py-2 px-7 flex items-center justify-center text-[0.9rem] cursor-pointer bg-black/50">
                  More Details
                </button>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {movies.map((_, idx) => {
                  return (
                    <div key={idx} className="relative">
                      <span
                        className={`block h-1 rounded-3xl w-15 bg-[#323232]`}
                      ></span>
                      <span
                        id={`movieline${idx}`}
                        className={`block movieline absolute top-0 left-0 h-1 rounded-3xl w-15 ${currentIndex == idx ? "bg-red-500" : "bg-[#323232]"} `}
                      ></span>
                    </div>
                  );
                })}
              </div>
              <div className="lg:flex gap-1 hidden ">
                <span
                  onClick={() =>
                    changeMovie(
                      currentIndex === 0 ? movies.length - 1 : currentIndex - 1,
                    )
                  }
                  className="block bg-[#101010] h-fit w-fit p-2 rounded-full border border-[#505050] cursor-pointer"
                >
                  <RiArrowLeftSLine />
                </span>
                <span
                  onClick={() =>
                    changeMovie(
                      currentIndex === movies.length - 1 ? 0 : currentIndex + 1,
                    )
                  }
                  className="block bg-[#101010] h-fit w-fit p-2 rounded-full border border-[#505050] cursor-pointer"
                >
                  <RiArrowRightSLine />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
