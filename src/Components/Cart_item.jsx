import { useState } from "react";

const CartItem = ({
  id,
  name,
  quantity,
  price,
  onDelete,
  onQuantityChange,
  product_stock,
  image,
}) => {
  const [itemQuantity, setItemQuantity] = useState(1); // Inicializamos en 1, asumiendo que siempre se empieza con al menos un elemento en el carrito

  const handleIncrease = () => {
    if (itemQuantity < product_stock) {
      const newQuantity = itemQuantity + 1;
      setItemQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
    }
  };

  const handleDecrease = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
    }
  };

  const getTotalPrice = () => itemQuantity * price;
  console.log("La cantidad es:", product_stock);

  return (
    <div className="p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center bg-[#1f1f1f] text-lg mb-3 rounded-lg max-w-4xl mx-auto space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-24 h-24 flex justify-center items-center">
          <img
            src={image}
            alt="Product"
            className="w-full h-full rounded object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-auto">
          <h2 className="text-center lg:text-left text-sm lg:text-base font-semibold text-white">
            {name}
          </h2>
          {itemQuantity >= product_stock && (
            <p className="text-slate-400 font-thin text-sm">
              Por el momento solo tenemos disponible {product_stock} en stock
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-auto lg:space-x-4">
        <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
          <button
            className="p-2 bg-gray-700 text-white rounded"
            onClick={handleDecrease}
          >
            -
          </button>
          <h2 className="mx-4 text-white">{itemQuantity}</h2>
          <button
            className={`p-2 rounded ${
              itemQuantity >= product_stock
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-gray-700 text-white"
            }`}
            onClick={handleIncrease}
            disabled={itemQuantity >= product_stock} // Deshabilitamos el botón si se alcanza el límite
          >
            +
          </button>
        </div>

        <div className="flex justify-center items-center w-full lg:w-auto">
          <h2 className="text-white">${getTotalPrice()} MXN</h2>
        </div>

        <div className="mt-4 lg:mt-0 flex justify-center lg:justify-end items-center w-full lg:w-auto">
          <button
            className="p-2 text-red-500 hover:text-red-700"
            onClick={() => onDelete(id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
