import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../../Components/SearchInput";
import CardDelivery from "../../../Components/CardModuleDelivery";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function OrderPages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const apiUrl = import.meta.env.VITE_APIBACK_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/orders`);
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error al obtener las órdenes", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
  };

  const handleConfirmEdit = async () => {
    if (selectedOrder) {
      try {
        await axios.put(`${apiUrl}/api/orders/${selectedOrder._id}`, {
          items: selectedOrder.items,
          numero_guia: selectedOrder.numero_guia,
          total: selectedOrder.total,
        });
        setShowPopup(false);
        const response = await axios.get(`${apiUrl}/api/orders`);
        setOrders(response.data || []);

        // Agregando SweetAlert al confirmar la edición
        Swal.fire({
          title: "Pedido actualizado",
          text: "El pedido se actualizó correctamente.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#0eff06",
        });
      } catch (error) {
        console.error("Error al actualizar la orden", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el pedido.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "##201F1F",
        });
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-black flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="container bg-[#202020] flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-10 p-4 mb-4 rounded-lg w-full max-w-screen-lg">
        <p className="font-bold text-4xl text-white">Pedidos</p>
        <Link
          to="/Productos"
          className="buttonProduct border-2 border-[#0eff06] text-[#0eff06] rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06] p-2"
        >
          Ir a productos
        </Link>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <main className="w-full max-w-screen-lg">
        <div className="bg-[#202020] p-4 rounded-lg border-2 border-[#0EFF06]">
          <p className="textMain text-white mb-4">
            Resultado de la búsqueda: {searchQuery}
          </p>

          {Array.isArray(orders) &&
            orders
              .filter(
                (order) =>
                  order.orderId.includes(searchQuery) ||
                  order.username_author
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((order) => (
                <CardDelivery
                  key={order._id}
                  orderId={order._id}
                  deliveryDescription={`Order ID: ${order.orderId}`}
                  nameClient={order.username_author}
                  priceDelivery={order.total}
                  descriptionGuide={order.numero_guia}
                  parcelService={order.paqueteria}
                  shippingDate={order.fecha_de_envio}
                  productName={order.items
                    .map((item) => item.product_name)
                    .join(", ")}
                  onEdit={() => handleEditOrder(order)}
                />
              ))}
        </div>
      </main>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <p className="text-lg font-semibold text-center">
              ¿Deseas confirmar la edición de esta orden?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleConfirmEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Confirmar
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPages;
