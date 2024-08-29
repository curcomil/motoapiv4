import { useNavigate } from "react-router-dom";

//manda un valor a traves de paginas (query params)
export const ProductCard = (product) => {
  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate(`/detail?id=${product.id_product}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-sm h-96 mx-5 mb-6 border-gray-300">
      {/* Imagen del producto */}
      <div className="relative">
        <img
          src={product.images || "https://via.placeholder.com/150"} // Reemplaza con la URL de la imagen del producto
          alt="Product"
          className="h-48 w-full object-contain rounded-lg"
        />
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500"></button>
      </div>
      {/* Información del producto */}
      <div className="p-4">
        <h2 className="text-lg font-bold">{`Precio: $${product.price} MXN`}</h2>
        <p className="text-gray-600 truncate">
          {product.productName || "Nombre del producto"}
        </p>
        <p className="text-red-500  p-2">
          {product.stock
            ? `(${product.stock} Disponibles)`
            : "(Stock no disponible)"}
        </p>

        {/* Botón Ver más */}
        <button
          onClick={handleViewMore}
          className="w-full bg-gray-900 hover:bg-[#0eff06] text-white hover:text-black py-2 rounded-lg"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};
