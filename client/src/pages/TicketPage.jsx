import { QRCode } from "react-qr-code";
import ticketBg from "../assets/bgSignup.png";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { RiShareLine, RiDownload2Line } from "@remixicon/react";
import api from "../utils/Api";
import { useParams } from "react-router-dom";
import { FormatTime } from "../utils/FormatTime";

const TicketPage = () => {
  const ticketRef = useRef(null);
  const headingRef = useRef(null);
  const { bookingId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await api.get(`/booking/getTicket/${bookingId}`);

      setTicket(response.data.ticket);
    };

    fetchTicket();
  }, [bookingId]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 5,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.inOut",
        },
      );
      gsap.fromTo(
        ticketRef.current,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.inOut",
        },
      );
      gsap.fromTo(
        ".ticketInfor",
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.1,
        },
      );
      gsap.to(".status", {
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const card = ticketRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = -((y - centerY) / centerY) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 3000,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(".barcode-bar", {
      scaleY: 1.2,
      stagger: 0.02,
      yoyo: true,
      transformOrigin: "bottom",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ticketRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(".barcode-bar", {
      scaleY: 1,
      stagger: 0.02,
    });
  };
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen px-30 pt-20 pb-10">
      <div className="flex flex-col items-center w-[55%] gap-5">
        <div ref={headingRef} className="flex flex-col w-full gap-2">
          <span className="font-[Nunito] font-bold text-red-500 tracking-wider">
            YOUR PASS
          </span>
          <span className="font-[Bebas_Neue] text-6xl tracking-wide">
            DIGITAL TICKET.
          </span>
        </div>
        <div
          ref={ticketRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-cover rounded-3xl bg-top w-full flex flex-col  h-fit relative overflow-hidden"
          style={{ backgroundImage: `url(${ticketBg})` }}
        >
          <div className="h-8 w-8 bg-black rounded-full absolute -left-4 top-1/2"></div>
          <div className="h-8 w-8 bg-black rounded-full absolute -right-4 top-1/2"></div>
          <div className="p-8 backdrop-brightness-75 flex flex-col gap-8">
            <div className="ticketInfor flex gap-5">
              <div
                className="shrink-0 h-40 w-30 rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${ticket?.show?.movie?.posterUrl})`,
                }}
              ></div>
              <div className="flex flex-col justify-center border-r-2 border-dashed border-[#444] w-full">
                <span className="font-light text-[#e6e5e5] text-[0.9rem]">
                  NOW FEATURING
                </span>
                <span className="font-[Bebas_Neue] text-5xl">
                  {ticket?.show?.movie?.title}
                </span>
                <p className="font-[Nunito] font-semibold text-[#999] text-[0.95rem]">
                  CINELUX VELVET - Marina <br /> Bay Screen A
                </p>
              </div>
            </div>
            <div className="ticketInfor flex flex-col gap-3 items-center">
              <div className="p-2 rounded-2xl bg-white">
                <QRCode value="hello" size={170} />
              </div>
              <span className="text-[0.95rem] font-[Nunito] font-semibold">
                BKID-{bookingId}
              </span>
            </div>
            <div className="ticketInfor flex justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[0.9rem] font-[Nunito] text-[#666] tracking-widest">
                  DATE
                </span>
                <span className="font-[Nunito] font-semibold tracking-wider text-[0.95rem]">
                  Today
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.9rem] font-[Nunito] text-[#666] tracking-widest">
                  TIME
                </span>
                <span className="font-[Nunito] font-semibold tracking-wider text-[0.95rem]">
                  {FormatTime(ticket?.show?.startTime)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.9rem] font-[Nunito] text-[#666] tracking-widest">
                  SEATS
                </span>
                <span className="font-[Nunito] font-semibold tracking-wider text-[0.95rem]">
                  {ticket?.seats.map((seat, idx) => {
                    return <span key={idx}>[{seat.seatNumber}] </span>;
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.9rem] font-[Nunito] text-[#666] tracking-widest">
                  TOTAL
                </span>
                <span className="text-yellow-600 font-[Bebas_Neue] font-bold text-[1.35rem] tracking-wide">
                  ₹ {ticket?.totalPrice}
                </span>
              </div>
            </div>
          </div>
          <div className="ticketInfor border-t-2 backdrop-brightness-75 border-dashed border-[#222] flex justify-between items-center px-8 py-5">
            <div className="flex items-end gap-0.5 h-10">
              {[
                18, 35, 28, 42, 22, 30, 15, 40, 25, 38, 20, 45, 28, 32, 18, 36,
                24, 40, 30, 22,
              ].map((height, idx) => (
                <span
                  key={idx}
                  className="barcode-bar w-0.75 bg-white/80"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="flex flex-col  items-end">
              <span className="font-light tracking-widest text-[#777]">
                STATUS
              </span>
              <span className="status font-[Nunito] font-semibold tracking-wider text-green-500">
                Confirmed
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-8 pt-5">
          <div className="flex gap-15 justify-center">
            <button className="border-gray-800 border-[0.1px] rounded-full py-2 px-5 flex items-center justify-center text-[0.9rem] cursor-pointer font-bold bg-black/10 gap-2">
              <RiShareLine size={18} />
              Share
            </button>
            <button className="border-gray-800 border-[0.1px] rounded-full py-2 px-5 flex items-center justify-center text-[0.9rem] cursor-pointer bg-white font-bold text-black gap-2">
              <RiDownload2Line size={18} />
              Save to Wallet
            </button>
          </div>
          <span className="text-[0.9rem] font-[Nunito] font-semibold text-[#353535] tracking-widest">
            PLEASE ARRIVE 15 MINUTES BEFORE SHOW TIME.
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
