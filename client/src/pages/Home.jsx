import GenreBox from "../components/GenreBox";
import HomeMovieSection from "../components/HomeMovieSection";
import HomeHeroSection from "../components/HomeHeroSection";
import MobileDrawer from "../components/MobileDrawer";

const HomeLayout = () => {
  return (
    <>
      <HomeHeroSection />
      <div className="w-full lg:-translate-y-18 -translate-y-10 bg-transparent">
      <GenreBox />
      </div>
      <HomeMovieSection />
      <MobileDrawer />
    </>
  );
};

export default HomeLayout;
