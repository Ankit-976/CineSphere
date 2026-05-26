import GenreBox from "./components/GenreBox";
import MovieSection from "./components/MovieSection";
import Home from "./pages/Home";

const Layout = () => {
  return (
    <>
      <Home />
      <div className="w-full -translate-y-18 bg-transparent">
      <GenreBox />
      </div>
      <MovieSection />
    </>
  );
};

export default Layout;
