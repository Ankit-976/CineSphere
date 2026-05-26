const ShowCard = ({ show, selectedShow, setSelectedShow }) => {
  const time = new Date(show.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
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
        {time}
      </span>
    </div>
  );
};

export default ShowCard;
