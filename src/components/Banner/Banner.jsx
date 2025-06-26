import "../../styles/global.css";
import Search from "../IconosReact/Search";
import { buscarLibro } from "../../services/libroService";

function Banner() {
  const SearchEvent = async () => {
    const inputSearch = document.querySelector("#inputSearch");
    // Valida que el input tenga datos
    inputSearch.value
      ? // Recive la data de la consulta ( deberia ser un array de libros y mostrar en cards de los libros)
        console.log(await buscarLibro(inputSearch.value.toLowerCase()))
      : console.error("No hay datos validos en el input...");
  };

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
        <div className="w-[70%] flex flex-col items-center">
          <div className="max-h-[34px] w-full md:w-[70%] lg:w-[70%] flex items-center relative">
            <input
              id="inputSearch"
              type="text"
              placeholder="Buscar libro"
              name=""
              className="bg-[#D9D9D9] w-full px-3 py-1 text-[13px] md:text-[15px] border-2 border-blue-800 rounded-2xl focus:outline-none"
            ></input>
            <Search SearchEvent={SearchEvent} />
          </div>
          {/* icono search */}
          <p className="text-gray-100 text-[15px] md:text-[18px] lg:text-[30px] w-full md:w-[70%] lg:w-[70%] text-start font-bold">
            DESCUBRE TU GRAN PROXIMA LECTURA
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
