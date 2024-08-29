import { useState } from "react";
import EditProductForm from "./Edit_product_form";
import Swal from "sweetalert2";
import axios from "axios";

const Admin_products = ({
  id,
  name,
  price,
  stock,
  description,
  images,
  onDelete,
  questions,
}) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_APIBACK_URL;


  const handleEdit = () => {
    setEditingProduct({
      id,
      name,
      price,
      stock,
      description,
      questions,
    });
  };

  const handleDelete = async (productId) => {
    setDeletingProductId(productId);

    Swal.fire({
      title: "¿Estás seguro de eliminar este producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0EFF06",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}/api/products/${productId}`);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );

          Swal.fire(
            "Eliminado",
            "El producto ha sido eliminado.",
            "success"
          ).then(() => {
            // Recargar la página después de confirmar la eliminación
            window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          Swal.fire(
            "Error",
            "No se pudo eliminar el producto. Intenta de nuevo.",
            "error"
          );
        }
      }
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="p-4 flex flex-col lg:flex-row lg:justify-between mb-3 rounded-lg">
      <table className="table w-full border-collapse bg-[#3F3F3F] shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm text-center">
          <tr>
            <th className="p-4 text-left">Producto</th>
            <th className="p-4 text-center">Stock</th>
            <th className="p-4 text-center">Preguntas</th>
            <th className="p-4 text-center">Edición</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={images} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{truncateText(name, 20)}</div>
                  <div className="text-gray-500">Precio: ${price}</div>
                  <div className="text-sm text-gray-400">ID: {id}</div>
                </div>
              </div>
            </td>
            <td className="p-4 text-center font-bold">{stock}</td>
            <td className="p-4 flex justify-center text-center">
              {truncateText(questions, 100)}
            </td>
            <td className="p-4 text-center">
              <div className="flex justify-center items-center space-x-3">
                <button
                  className="btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg"
                  onClick={handleEdit}
                >
                  Editar
                </button>
                <button
                  className="btn bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(id)}
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {editingProduct && (
        <dialog
          open
          className="modal bg-[#000000c7] fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="modal-action p-4 bg-transparent rounded-lg shadow-lg">
            <EditProductForm
              product={editingProduct}
              closeModal={() => setEditingProduct(null)}
            />
            <button
              className="btn border-2 border-[#0EFF06] rounded-lg p-3 mt-4 text-white"
              onClick={() => setEditingProduct(null)}
            >
              Cancelar
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Admin_products;
