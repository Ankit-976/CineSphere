import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../utils/Api'
import AuthContext from '../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false)
  const { setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set("#backBtn", { opacity: 0 });
    gsap.set("#formHeading", { y: 20, opacity: 0 });
    gsap.set(".inputs", { y: 50, opacity: 0 });
    tl.to("#formHeading", {
      opacity: 1,
      duration: 0.5,
      y: 0,
      ease: "sine.inOut",
    });
    tl.to(".inputs", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
    });
    tl.to("#backBtn", {
      opacity: 1,
      duration: 0.2,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      rememberMe: rememberMe
    }

    try {
      
      const response = await api.post(`/auth/user/login`, data);
      setIsLoggedIn(true)
      navigate('/');

      toast.success(`Welcome Back ${response.data.username}`)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  };

  return (
    <div className="flex">
      <div
        className="h-screen w-[50%]"
      >
        <div className="flex items-center justify-center gap-2 cursor-pointer group absolute top-15 right-15">
          <img
            src={logo}
            alt="Logo"
            className=" rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(239,68,68,0.8)]"
          />
          <span className="block text-2xl font-['Stack_Sans_Notch']">
            CineSphere
          </span>
        </div>
        <div className=" p-20 h-full flex flex-col justify-end gap-4">
          <span className="text-[0.8rem] font-bold tracking-widest text-red-500/80 font-['Nunito']">
            PREMIUM CINEMA
          </span>
          <span className="text-6xl tracking-wider font-bold font-['Bebas_Neue']">
            LIGHTS DOWN,
            <br /> HEART UP.
          </span>
        </div>
      </div>
      <div className="w-[50%] flex justify-center items-center">
        <div className="flex flex-col w-[60%] h-[60%] gap-10">
          <div className="flex flex-col gap-3" id="formHeading">
            <span className="text-red-500/80 font-semibold font-['Nunito']  text-[0.8rem] tracking-widest">
              WELCOME BACK
            </span>
            <span className="text-5xl font-bold font-['Bebas_Neue'] tracking-wider">
              SIGN IN.
            </span>
            <span className="font-['Nunito'] text-[0.9rem] text-white/60">
              New Here?
              <Link to={"/register"}>
                <span className="text-white"> Create an account.</span>
              </Link>
            </span>
          </div>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 inputs">
              <label
                htmlFor="email"
                className="text-white/60 text-[0.75rem] font-semibold font-['Nunito'] tracking-widest"
              >
                EMAIL
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="wow@cinema.io"
                className="bg-white/7 py-2 px-4 rounded-xl border border-white/10 outline-none"
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col gap-1 inputs">
              <label
                htmlFor="password"
                className="text-white/60 text-[0.75rem] font-semibold font-['Nunito'] tracking-widest"
              >
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="• • • • • • • • • •"
                className="bg-white/7 py-2 px-4 rounded-xl border border-white/10 outline-none"
                autoComplete="off"
                required
              />
            </div>
            <div className="flex justify-between items-center inputs">
              <span className="text-[0.9rem] font-semibold text-white/50 ">
                <input 
                type="checkbox"
                name="rememberMe" 
                id="rememberMe" 
                className="border accent-red-500"
                value={rememberMe}
                onChange={(e) => setRememberMe(e.target.value)}
                /> Remember Me
              </span>
              <span className="text-white/70 cursor-pointer">
                Forget Password?
              </span>
            </div>
              <span className="font-['Nunito'] hidden text-red-500/70">
                Invalid Credentials
              </span>
            <button type="submit"></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
