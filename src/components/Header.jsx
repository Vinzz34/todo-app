/* eslint-disable react/prop-types */
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";

const Header = ({darkMode,setDarkMode}) => {


  function handleMode(){
    setDarkMode(d => !d);
  }

  return (
    <div className="mt-12 sm:mt-[72px] mb-9 flex justify-between items-center w-full">
      <h1 className="text-white text-2xl sm:text-[40px] tracking-[10px] sm:tracking-[16px] font-bold">TODO</h1>
      <img className="cursor-pointer" src={`${darkMode ? sun : moon }`} onClick={handleMode} alt="mode" />
    </div>
  )
}

export default Header