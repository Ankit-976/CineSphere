import logo from '../assets/logo.png'
import bg from '../assets/bgSignup.png'

const Signup = () => {
  return (
    <div className='flex'>
      <div className="flex items-center justify-center gap-2 cursor-pointer group absolute top-20 right-20">
        <img
          src={logo}
          alt="Logo"
          className=" rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(239,68,68,0.8)]"
        />
        <span className="block text-2xl font-['Stack_Sans_Notch']">
          CineSphere
        </span>
      </div>
      <div className='w-[50%]'></div>
      <div className='h-screen w-[50%] bg-cover bg-center' style={{backgroundImage: `url(${bg})`}}></div>
    </div>
  );
};

export default Signup;
