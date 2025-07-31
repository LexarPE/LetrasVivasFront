import {
  LibraryBig,
  Album,
  BookHeart,
  House,
  CircleX,
  AlignJustify,
  User,
  UserX,
} from "lucide-react";
import { useState, useContext} from "react";
import { AuthContext } from "../context/Context";

export default function Nav() {
  const [activarNav, setActivarNav] = useState(false);
  const authContext = useContext(AuthContext);
  let acesoPermitido = authContext.acess;

  function closeSesion() {
    authContext.eliminarToken();
  }

  function onNav() {
    setActivarNav(!activarNav);
  }

  function offNav() {
    setActivarNav(!activarNav);
  }
  return !activarNav ? (
    <div className="h-6">
      <div className="w-max py-1 px-1 cursor-pointer relative z-50" onClick={onNav}>
        <AlignJustify size={"30px"} />
      </div>
    </div>
  ) : (
    <div className="h-6">
      <div className="fixed top-0 left-0 pl-4 py-2 z-30 text-[#ddd] h-full bg-[#1E2530] select-none transition-all">
        <span className="w-full flex justify-end absolute left-7 top-1">
          <span
            className="bg-[#1E2530] py-1 pl-2 pr-1 rounded-br-lg rounded-tr-lg cursor-pointer"
            onClick={offNav}
          >
            <CircleX size={"30px"} />
          </span>
        </span>
        <h1 className="text-2xl py-2">Letras Vivas</h1>
        <ul className="py-5 transition-all">
          <a href="/">
            <li className="flex items-center gap-1 mb-2 hover:bg-[#2c3646]  pr-16 pl-1 text-xl">
              <House size={"18px"} />
              <h4>Home</h4>
            </li>
          </a>
          <a href="/catalogo">
            <li className="flex items-center gap-1 mb-2 hover:bg-[#2c3646]  pr-16 pl-1 text-xl">
              <LibraryBig size={"18px"} />
              <h4>Catalogo</h4>
            </li>
          </a>
          {acesoPermitido ? (
            <a href="/favoritos">
              <li className="flex items-center gap-1 mb-2 hover:bg-[#2c3646]  pr-16 pl-1 text-xl">
                <BookHeart size={"18px"} />
                <h4>Favoritos</h4>
              </li>
            </a>
          ) : null}
          {acesoPermitido ? (
            <a href="/biblioteca">
              <li className="flex items-center gap-1 mb-2 hover:bg-[#2c3646]  pr-16 pl-1 text-xl">
                <Album size={"18px"} />
                <h4>Biblioteca</h4>
              </li>
            </a>
          ) : null}

          {!acesoPermitido ? (
            <a href="/aceder">
              <li className="flex items-center gap-1 mb-2 hover:bg-[#2c3646]  pr-16 pl-1 text-xl">
                <User size={"18px"} />
                <h4>Iniciar Sesion</h4>
              </li>
            </a>
          ) : null}

          {acesoPermitido ? (
            <li
              className="flex items-center gap-1 mb-2 hover:bg-[#2c3646]  pr-16 pl-1 text-xl"
              onClick={closeSesion}
            >
              <UserX size={"18px"} />
              <h4>Cerrar Sesion</h4>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
