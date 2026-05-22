import { RiArrowLeftLine } from "@remixicon/react";
import { useNavigate } from 'react-router-dom'


const BackBtn = ({ id }) => {
  const navigate = useNavigate()
  return (
    <div id={id} className=" absolute top-10 left-10 flex gap-2 px-3 pr-4 py-2 border border-gray-500/40 cursor-pointer rounded-3xl items-center text-white/80" onClick={() => {navigate(-1)}}>
      <RiArrowLeftLine size={20}/> 
      <span className="text-xl leading-5">Back</span>
    </div>
  )
}

export default BackBtn
