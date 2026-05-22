import logo from "../assets/logo.png";
import bg from "../assets/bgSignup.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../utils/Api'


const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  useEffect(() => {

    const tl = gsap.timeline()
    
    gsap.set("#backBtn",{opacity: 0})
    gsap.set("#formHeading",{y:20, opacity: 0})
    gsap.set(".inputs", {y: 50, opacity: 0})
    tl.to("#formHeading",{
      opacity: 1,
      duration:0.5,
      y:0,
      ease: "sine.inOut"
    })
    tl.to(".inputs", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2
    })
    tl.to("#backBtn",{
      opacity: 1,
      duration: 0.3
    })

  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsPasswordSame(true)
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const data = {
      username: name,
      email: email,
      password: password,
      role: role
    }

    try {
      const response = await api.post(`/auth/user/register`, data, {withCredentials: true});
      
      navigate('/')
      toast.success(response.data.message);
      
    } catch (error) {
      toast.error(error.response?.data?.message );
      
    }

    
  };

  return (
    <div className="flex">
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
      <div className="w-[50%] flex justify-center items-center">
        <div className="flex flex-col w-[60%] h-[60%] gap-7">
          <div className="flex flex-col gap-2" id="formHeading">
            <span className="text-red-500/80 font-semibold font-['Nunito']  text-[0.8rem] tracking-widest">
              NEW FACE
            </span>
            <span className="text-5xl font-bold font-['Bebas_Neue'] tracking-wider">
              CREATE ACCOUNT.
            </span>
            <span className="font-['Nunito'] text-[0.9rem] text-white/60">
              Already have account?
              <Link to={"/login"}>
                <span className="text-white"> Sign In.</span>
              </Link>
            </span>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 inputs">
              <label
                htmlFor="name"
                className="text-white/60 text-[0.75rem] font-semibold font-['Nunito'] tracking-widest"
              >
                USERNAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="john_wick92"
                className="bg-white/7 py-2 px-4 rounded-xl border border-white/10 outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1 inputs">
              <label
                htmlFor="email"
                className="text-white/60 text-[0.75rem] font-semibold font-['Nunito'] tracking-widest"
              >
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="wow@cinema.io"
                className="bg-white/7 py-2 px-4 rounded-xl border border-white/10 outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1 inputs">
              <label
                htmlFor="email"
                className="text-white/60 text-[0.75rem] font-semibold font-['Nunito'] tracking-widest"
              >
                Role
              </label>
              <select name="role" id="role" defaultValue={"User"} onChange={(e) => {setRole(e.target.value)}}
                className="bg-white/7 py-2 px-4 rounded-xl border border-white/10 text-white/60 outline-none"
                >
                <option value="User" className="bg-zinc-900 border-none">User</option>
                <option value="Admin" className="bg-zinc-900">Admin</option>
              </select>
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
                required
              />
            </div>
            <div className="flex flex-col gap-1 inputs">
              <label
                htmlFor="confirmpassword"
                className="text-white/60 text-[0.75rem] font-semibold font-['Nunito'] tracking-widest"
              >
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="• • • • • • • • • •"
                className="bg-white/7 py-2 px-4 rounded-xl border border-white/10 outline-none"
                required
              />
            </div>
            {isPasswordSame && (<span className="font-['Nunito'] text-red-500/70">Set same password</span>)}
            <button type="submit"></button>
          </form>
        </div>
      </div>
      <div
        className="h-screen w-[50%] bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className=" p-20 h-full flex flex-col justify-end gap-4">
          <span className="text-[0.8rem] font-bold tracking-widest text-amber-400 font-['Nunito']">
            MEMBERS BENEFITS
          </span>
          <span className="text-5xl tracking-wider font-bold font-['Bebas_Neue']">
            YOUR TICKETS,<br /> ON A HOLOGRAPHIC<br /> STUB.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
