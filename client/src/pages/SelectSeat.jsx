import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../utils/Api"


const SelectSeat = () => {
  const { showId } = useParams()
  const [seats, setSeats] = useState([])
  

  useEffect(() => {
    
    const getShowSeats = async () => {
      const response = await api.get(`/movie/getSeats/${showId}`)
      setSeats(response.data.seats)
    }
  
    getShowSeats()
  }, [showId])
  
  return (
    <div>
      {seats.length}
    </div>
  )
}

export default SelectSeat
