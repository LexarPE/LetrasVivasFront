
import AuthForm from "../components/RegLog/AuthForm";
import "../styles/global.css";



function LogReg() {

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado formulario */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
        <AuthForm />
      </div>

      {/* Lado imagen + texto */}
      <div className="relative flex-1 hidden lg:block">
        <img
          src="/portada.jpg"
          alt="Portada"
          className="absolute w-full h-full object-cover"
        />
        <div className="relative z-10 flex justify-center h-full bg-black opacity-[50%] p-7">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#B5C3DC] font-bold text-start">
            El conocimiento está a una portada de distancia.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default LogReg