function CardDelivery({
  deliveryDescription,
  nameClient,
  priceDelivery,
  descriptionGuide,
  onEdit,
}) {
  return (
    <div className="cardDelivery border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{deliveryDescription}</h2>
      <p>
        <strong>Cliente:</strong> {nameClient}
      </p>
      <p>
        <strong>Precio:</strong> ${priceDelivery.toFixed(2)}
      </p>
      <p>
        <strong>Guía:</strong> {descriptionGuide}
      </p>
      <button
        onClick={onEdit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Editar
      </button>
    </div>
  );
}

export default CardDelivery;
