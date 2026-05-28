import { Link } from 'react-router-dom'
import BookingCard from '../components/BookingCard';
import api from '../utils/Api'
import { useEffect, useState } from 'react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
      const fetchBookings = async () => {
        const response = await api.get('/booking/getBookings')
        setBookings(response.data.bookings)
      }

      fetchBookings()
    }, [])
    
  return (
    <div className="p-30 flex flex-col gap-10">
      <div className='flex flex-col gap-1'>
        <span className='font-[Nunito] text-[0.9rem] font-bold text-red-500 tracking-wider'>YOUR PASS VAULT</span>
        <span className='font-[Bebas_Neue] text-7xl tracking-wide'>MY BOOKINGS.</span>
        <div className='flex justify-between items-center'>
          <span className='text-[1rem] text-[#999] font-[Nunito] font-semibold'>Signed in as ankit</span>
          <Link to={`/movies`}>
            <button className="border-gray-800 border-[0.1px] rounded-full py-2 px-7 flex items-center justify-center text-[0.9rem] cursor-pointer font-[Nunito] font-bold bg-black/10">
              Explore Movies
            </button>
          </Link>
        </div>
      </div>
      <div className='w-full flex flex-col gap-10'>
        {bookings.map((booking, idx) => {
            return <BookingCard key={idx} booking={booking}/>
        })}
      </div>
    </div>
  );
};

export default MyBookings;
