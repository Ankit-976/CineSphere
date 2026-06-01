import { RiArrowLeftLine } from "@remixicon/react";
import { useNavigate } from 'react-router-dom'


const BackBtn = () => {
  const navigate = useNavigate()
  return (
    <div id="backBtn" className=" fixed top-15 lg:left-10 left-5 flex gap-2 lg:px-3 lg:pr-4 py-2 px-2 pr-3 bg-[#181818] border border-[#787575] cursor-pointer rounded-3xl items-center text-white/80" onClick={() => {navigate(-1)}}>
      <RiArrowLeftLine size={20}/> 
      <span className="text-xl leading-5">Back</span>
    </div>
  )
}

export default BackBtn
