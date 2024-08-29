import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const icon_whatsap = () => {
  return (
    <div className="text-white text-lg">
      <FaWhatsapp
        size="w-30px h-30px"
        className="text-white hover:text-[#0eff06]"
      />
      Contactanos para pedidos personalizados
    </div>
  );
};
