const prisma = require("../config/db");

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

async function getMovies(req, res) {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        shows: true,
      },
    });

    if (!movies.length) {
      return res.status(404).json({
        message: "No movies found",
      });
    }

    res.status(200).json({
      message: "Movies fetched successfully",
      movies: movies,
    });
  } catch (error) {
    res.status(400).json({ message: "Error fetching movies" });
  }
}

async function hideMovieById(req, res) {
  try {
    const movie = await prisma.movie.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        isActive: false,
      },
    });

    res.status(200).json({
      message: "Movie hidden successfully",
      movie,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error hiding movie", error: error.message });
  }
}

async function getMovieById(req, res) {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        shows: true,
      },
    });

    res.status(200).json({
      message: "Movie fetched successfully",
      movie: movie,
    });
  } catch (error) {
    console.log(error);
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

    const seats = [];

    for (let row of ["A", "B"]) {
      for (let i = 1; i <= 10; i++) {
        seats.push({
          seatNumber: `${row}${i}`,
          type: "Premium",
          price: 250,
          showId: newShow.id,
        });
      }
    }

    for (let row of ["C", "D", "E", "F"]) {
      for (let i = 1; i <= 10; i++) {
        seats.push({
          seatNumber: `${row}${i}`,
          type: "Normal",
          price: 150,
          showId: newShow.id,
        });
      }
    }

    for (let row of ["R"]) {
      for (let i = 1; i <= 10; i++) {
        seats.push({
          seatNumber: `${row}${i}`,
          type: "Recliner",
          price: 500,
          showId: newShow.id,
        });
      }
    }

    await prisma.seat.createMany({
      data: seats,
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

async function getShows(req, res) {
  try {
    const id = req.params.movieId;

    const shows = await prisma.show.findMany({
      where: {
        movieId: parseInt(id),
      },
      include: {
        seats: true,
      },
    });

    res.status(200).json({
      message: "Shows fetched successfully",
      shows: shows,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching shows", error: error.message });
  }
}

module.exports = {
  addMovie,
  getMovies,
  hideMovieById,
  getMovieById,
  addShow,
  getShows,
};
