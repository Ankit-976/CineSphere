const ShowCard = ({ show }) => {
  const time = new Date(show.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="py-2 px-5  shrink-0 bg-[#202020] border border-[#404040] flex flex-col justify-center items-center rounded-2xl ">
      <span className="font-[Nunito] text-[#aba8a8] tracking-wide text-[0.8rem]">
        SCREEN 1
      </span>
      <span className="font-[Nunito] text-[1rem] tracking-wider text-white">
        {time}
      </span>
    </div>
  );
};

export default ShowCard;
