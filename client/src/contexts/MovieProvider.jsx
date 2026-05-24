import { useEffect, useState } from "react"
import api from "../utils/Api"
import MovieContext from './MovieContext'

const MovieProvider = ({ children }) => {
    const [moviesfetched, setMoviesfetched] = useState([])
    
    useEffect(() => {
      try {
        const fetchMovies = async () => {
            const response = await api.get('/movie/getMovies');

            setMoviesfetched(response.data.movies)
        }
        fetchMovies()
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    

    }, [])
    
  return (
    <MovieContext.Provider
    value={{
        moviesfetched
    }}
    >
        { children }
    </MovieContext.Provider>
  )
}

export default MovieProvider
