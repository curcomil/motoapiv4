import React from "react";
import imgfondo from "../../../dist/assets/img_fondo.png";
import logo from "../../../dist/assets/logo2.png";

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute bottom-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${imgfondo})` }}
      ></div>

      {/* Logo */}
      <div className="absolute top-10 left-10 z-10">
        <img src={logo} alt="Logo" className="h-16" />
      </div>

      {/* 404 Text */}
      <h1 className="text-9xl font-bold text-[#0eff06] z-10">404</h1>
      <p className="text-xl text-[#0eff06] mt-4 z-10">
        A veces perderse no es tan malo.
      </p>
    </div>
  );
};

export default NotFound;
