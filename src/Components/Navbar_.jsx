import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import logo from "../../dist/assets/logo2.png";
import axios from "axios";

export const Navlink = () => {
  const { isAuthenticated, user, logout, getprofile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_APIBACK_URL;
  const [itemCount, setItemCount] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isitems = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${apiUrl}/api/pedido`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItemCount(response.data.length);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    }
  };

  useEffect(() => {
    isitems();
  }, []);

  const AuthenticatedLinks = () => (
    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
      <li className="text-[#c2ff35] hover:text-white text-lg flex gap-3 items-start text-bold">
        {user.avatar && (
          <img
            src={`/avatars/${user.avatar}`}
            alt="User Avatar"
            className="w-9 h-9 rounded-full"
          />
        )}
        Bienvenid@ {user.username}
      </li>
      <Link
        to="/Menu"
        className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
      >
        Productos
      </Link>
      <Link
        to="/serviceAtention"
        className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
      >
        Atención al cliente
      </Link>
      <Link
        to="/Shopping"
        className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
      >
        Mis compras
      </Link>
      <Link
        to="/editoruser"
        className="text-gray-100 hover:text-[#0eff06] dark:text-white flex gap-3 items-start link link-hover"
      >
        Mi perfil <FaRegUser className="mt-1" />
      </Link>
      <Link
        to="/carrito"
        className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
      >
        <div className="indicator">
          {itemCount > 0 && (
            <span className="indicator-item badge badge-secondary">
              {itemCount}
            </span>
          )}
          <div className="p-2">
            <IoCartOutline size={24} />
          </div>
        </div>
      </Link>
      <button
        onClick={logout}
        className="nav-button ease-in hover:bg-[#0eff0601] hover:text-white flex w-auto items-center justify-center rounded-full border border-[#0eff06e9] bg-[#0eff06] bg-gradient-to-tr from-[#0eff06] to-[#78c048]/70 px-7 py-2.5 font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1"
      >
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );

  const GuestLinks = () => (
    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
      <Link
        to="/Menu"
        className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
      >
        Productos
      </Link>
      <Link
        to="/carrito"
        className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
      >
        <IoCartOutline size={24} />
      </Link>
      <Link
        to="/login"
        className="nav-button hover:bg-[#0eff0601] hover:text-white flex w-auto items-center justify-center rounded-full border border-[#0eff06e9] bg-[#0eff06] bg-gradient-to-tr from-[#0eff06] to-[#78c048]/70 px-7 py-2.5 font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1"
      >
        <span>Iniciar Sesión</span>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="ml-2"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          ></path>
        </svg>
      </Link>
    </div>
  );

  const MobileMenu = () => (
    <div
      className={`fixed top-0 right-0 h-auto bg-[#272927cb] py-4 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-40`}
      style={{ width: "75vw" }}
    >
      <div className="flex justify-end pr-4">
        <button
          onClick={toggleMenu}
          className="text-[#0eff06] p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0eff06]"
        >
          <IoClose size={24} />
        </button>
      </div>
      <ul className="flex flex-col items-center space-y-4 mt-16">
        <li>
          <Link
            to="/Menu"
            className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
          >
            Productos
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link
                to="/serviceAtention"
                className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
              >
                Atención al cliente
              </Link>
            </li>
            <li>
              <Link
                to="/Shopping"
                className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
              >
                Mis compras
              </Link>
            </li>
            <li>
              <Link
                to="/editoruser"
                className="text-gray-100 hover:text-[#0eff06] dark:text-white flex items-center link link-hover"
              >
                Mi perfil <FaRegUser className="ml-1" />
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            to="/carrito"
            className="text-gray-100 hover:text-[#0eff06] dark:text-white link link-hover"
          >
            <IoCartOutline size={24} />
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button
              onClick={logout}
              className="nav-button hover:bg-[#0eff0601] hover:text-white flex w-auto items-center justify-center rounded-full border border-[#0eff06e9] bg-[#0eff06] bg-gradient-to-tr from-[#0eff06] to-[#78c048]/70 px-7 py-2.5 font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1"
            >
              <span>Cerrar Sesión</span>
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="nav-button hover:bg-[#0eff0601] hover:text-white flex w-auto items-center justify-center rounded-full border border-[#0eff06e9] bg-[#0eff06] bg-gradient-to-tr from-[#0eff06] to-[#78c048]/70 px-7 py-2.5 font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1"
            >
              <span>Iniciar Sesión</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="ml-2"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                ></path>
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-b from-[#076404] via-[#076404cc] to-[#07640400]">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-16" alt="logo" />
        </Link>
        <div className="flex lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#0eff06] p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0eff06]"
          >
            {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
        <div className="hidden lg:flex justify-end flex-1 px-10">
          {isAuthenticated ? <AuthenticatedLinks /> : <GuestLinks />}
        </div>
        {isOpen && <MobileMenu />}
      </div>
    </nav>
  );
};
