const prisma = require("../config/db");
const { get } = require("../routes/movie.route");

async function addMovie(req, res) {
  const {
    title,
    posterUrl,
    description,
    duration,
    releaseDate,
    genre,
    language,
  } = req.body;

  if (
    !title ||
    !description ||
    !duration ||
    !releaseDate ||
    !genre ||
    !language
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        posterUrl,
        description,
        duration,
        releaseDate,
        genre,
        language,
      },
    });

    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding movie", error: error.message });
  }
}

async function addShow(req, res) {
  const { movieId, startTime } = req.body;

  if (!movieId || !startTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newShow = await prisma.show.create({
      data: {
        movieId,
        startTime,
      },
    });

    res.status(200).json({
      message: "Show added successfully",
      show: newShow,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding show",
    });
  }
}

async function getMovies(req, res) {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        shows: true,
      },
    });

    if (!movies) {
      return res.status(404).json({
        message: "No movies found"
      });
    }

    res.status(200).json({
        message:"Movies fetched successfully",
        movies: movies
    })
  } catch (error) {
    res.status(400).json({ message: "Error fetching movies" });
  }
}

async function getShows(req, res) {

    try {
        const id = req.params.movieId;

        const shows = await prisma.movie.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                shows: true
            }
        });
        if (!shows) {
            return res.status(404).json({
                message: "No shows found"
            });
        }
        res.status(200).json({
            message: "Shows fetched successfully",
            shows: shows.shows
        });
    } catch (error) {
        res.status(400).json({ message: "Error fetching shows" });
    }
}

module.exports = {
  addMovie,
  addShow,
  getMovies,
  getShows
};
