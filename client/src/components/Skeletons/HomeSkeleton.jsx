import Skeleton from "react-loading-skeleton";

const HomeSkeleton = () => {
  return (
    <>
      <div className="h-dvh">
        <div className="h-full  w-full">
          <div className=" h-full flex flex-col px-7 lg:px-25 py-20 justify-end gap-6">
            <div className="flex gap-5 text-[0.85rem] tracking-wider">
                <Skeleton highlightColor="#444"  baseColor="#333" width={100} height={25}/>
            </div>
            <div>
              <span className="block text-9xl tracking-wide font-bold font-[Bebas_Neue]">
                <Skeleton highlightColor="#444" baseColor="#333" />
              </span>
            </div>
            <div className="w-[40%]">
              <span className=" block font-semibold">
                <Skeleton highlightColor="#444" baseColor="#333" height={30}/>
              </span>
            </div>
            <div className="flex gap-5 text-[0.9rem] font-bold">
                <Skeleton highlightColor="#444" baseColor="#333" width={70} height={20}/>
                <Skeleton highlightColor="#444" baseColor="#333" width={70} height={20}/>
                <Skeleton highlightColor="#444" baseColor="#333" width={70} height={20}/>
            </div>
            <div className="flex gap-3 flex-col lg:flex-row font-semibold">
                <Skeleton highlightColor="#444" baseColor="#333" height={35}/>
                <Skeleton highlightColor="#444" baseColor="#333" height={35}/>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex ">
                <Skeleton highlightColor="#444" baseColor="#333" containerClassName="flex-1" height={10} width={270}/>
              </div>
              <div className="lg:flex gap-3 hidden">
                <Skeleton highlightColor="#444" height={40} width={40} baseColor="#333" circle="true" containerClassName="flex-1"/>
                <Skeleton highlightColor="#444" height={40} width={40} baseColor="#333" circle="true" containerClassName="flex-1"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSkeleton;
