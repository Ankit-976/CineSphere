import { useContext } from 'react'
import Genre from '../components/GenreBox'
import MovieCard from '../components/MovieCard'
import MovieContext from '../contexts/MovieContext'

const Movie = () => {
const {moviesfetched} = useContext(MovieContext)
  return (
    <div className='w-full min-h-dvh lg:py-30 pt-30 px-7 lg:px-0 flex flex-col gap-10'>
        <div className=' lg:px-30 flex flex-col gap-3'>
            <span className='font-[Nunito] font-bold text-[0.9rem] text-red-500 tracking-wide'>CATALOGUE</span>
            <span className='font-[Bebas_Neue] text-6xl tracking-wide'>ALL MOVIES.</span>
            <p className='font-[Nunito] font-bold text-[#888] tracking-wide'>Browse the full library — running now and just around the corner.</p>
        </div>
        <div className='w-full'>
            <Genre />
        </div>
        <div className='moviescrollbar flex gap-8 lg:px-30 overflow-x-scroll lg:flex-wrap'>
            {moviesfetched.map((movie, idx) => {
                return <MovieCard key={idx} movie={movie}/>
            })}
        </div>
    </div>
  )
}

export default Movie
