import "../../styles/global.css";
import Search from "../IconosReact/Search";
import { buscarLibro } from "../../services/libroService";

function Banner() {

  return (
    <div className="h-[380px] flex lg:h-screen relative">
      <img
        src="https://i.ibb.co/0yLkxms0/image-5.png"
        alt="image-5"
        border="0"
        className="w-full h-full object-cover"
      />
      {/* Capa opaca del banner */}
      <div className="w-full h-full absolute z-10 bg-black opacity-50"></div>

      <div className="w-full h-full flex justify-center items-center absolute z-20">
        <div className="w-[80%] flex flex-col items-center">
          
          {/* icono search */}
          <p className="text-gray-100 text-[30px] md:text-[35px] lg:text-[67px] w-full md:w-[70%] lg:w-[70%] text-start font-bold">
            DESCUBRE TU GRAN PROXIMA LECTURA
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
