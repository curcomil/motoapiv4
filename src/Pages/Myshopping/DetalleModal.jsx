import { RiTruckLine } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";
import { FaRegGrin } from "react-icons/fa";

const DetalleModal = ({ isOpen, onClose, compra }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center border-bg-[#0eff06]">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-[#0eff06]">Detalles de envío</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#0eff06] focus:outline-none text-xl"
          >
            &times;
          </button>
        </div>
        <div className="mb-4 border-2 p-2 rounded-md border-[#0eff06]">
          <div className="flex flex-grow space-x-2">
            <RiTruckLine size="1.5rem" className="text-[#0eff06] text-xl" />
            <h3 className="text-lg mb-2">Datos de envio</h3>
          </div>

          {compra.numero_guia ? (
            <>
              <p className="text-lg">{compra.paqueteria}</p>
              <p>Número de guía: {compra.numero_guia}</p>
              <p className="text-gray-400">
                Fecha de envío:{" "}
                {new Date(compra.fecha_de_envio).toLocaleDateString()}
              </p>{" "}
              <br />
              <p className="text-gray-400 border-t-2 border-[#0eff06]">
                Rastrea tu pedido desde la página de la paquetería ingresando tu
                número de guía
              </p>
            </>
          ) : (
            <p className="text-gray-400">
              Estamos preparando tu pedido, pronto te daremos tu número de guía
              para que puedas rastrearlo <FaRegGrin className="text-gray-400" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleModal;
