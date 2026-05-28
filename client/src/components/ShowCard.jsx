import { FormatTime } from "../utils/FormatTime";

const ShowCard = ({ show, selectedShow, setSelectedShow }) => {
  return (
    <div
      onClick={() =>
        setSelectedShow(selectedShow?.id === show.id ? null : show)
      }
      className={`py-2 px-5 shrink-0 cursor-pointer bg-[#202020] border border-[#404040] flex flex-col justify-center items-center rounded-2xl
        ${selectedShow?.id === show.id ? "bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.5)]" : "bg-[#202020]"}
        `}
    >
      <span className="font-[Nunito] text-[#d6d5d5] tracking-wide text-[0.8rem]">
        SCREEN 1
      </span>
      <span className="font-[Nunito] text-[1rem] tracking-wider text-white">
        {FormatTime(show.startTime)}
      </span>
    </div>
  );
};

export default ShowCard;
