import { useEffect } from "react"
import BookShowHeroSection from "../components/BookShowHeroSection"
import SelectShow from "../components/SelectShow"
import api from '../utils/Api'
import { useParams } from "react-router-dom"
import { useState } from "react"

const BookShow = () => {
  const {movieId} = useParams()
  const [movie, setMovie] = useState([])
  

  useEffect(() => {
  const fetchMovie = async () => {

    const response = await api.get(`/movie/getMovie/${movieId}`)
    setMovie(response.data.movie)
  }

  fetchMovie()

}, [movieId])

  return (
    <div>
      <BookShowHeroSection movie={movie} />
      <SelectShow movie={movie}/>
    </div>
  )
}

export default BookShow
