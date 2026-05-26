import { useContext } from 'react'
import Genre from '../components/GenreBox'
import MovieCard from '../components/MovieCard'
import MovieContext from '../contexts/MovieContext'

const Movie = () => {
const {moviesfetched} = useContext(MovieContext)
  return (
    <div className='w-full min-h-screen py-30 flex flex-col gap-10'>
        <div className=' px-30 flex flex-col gap-3'>
            <span className='font-[Nunito] font-bold text-[0.9rem] text-red-500 tracking-wide'>CATALOGUE</span>
            <span className='font-[Bebas_Neue] text-6xl tracking-wide'>ALL MOVIES.</span>
            <p className='font-[Nunito] font-bold text-[#888] tracking-wide'>Browse the full library — running now and just around the corner.</p>
        </div>
        <div>
            <Genre />
        </div>
        <div className='flex gap-8 px-30 flex-wrap'>
            {moviesfetched.map((movie, idx) => {
                return <MovieCard key={idx} movie={movie}/>
            })}
        </div>
    </div>
  )
}

export default Movie
