import GenreBox from "../components/GenreBox";
import HomeMovieSection from "../components/HomeMovieSection";
import HomeHeroSection from "../components/HomeHeroSection";

const HomeLayout = () => {
  return (
    <>
      <HomeHeroSection />
      <div className="w-full -translate-y-18 bg-transparent">
      <GenreBox />
      </div>
      <HomeMovieSection />
    </>
  );
};

export default HomeLayout;
