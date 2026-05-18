const prisma = require('../config/db');

async function addMovie(req, res) {

    const { title, posterUrl, description, duration, releaseDate, genre, language } = req.body;

    if (!title || !description || !duration || !releaseDate || !genre || !language) {
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
                language
            }
        })

        res.status(201).json({ message: "Movie added successfully", movie: newMovie })
    } catch (error) {
        res.status(400).json({message: "Error adding movie", error: error.message})
    }
}

module.exports = {
    addMovie
}