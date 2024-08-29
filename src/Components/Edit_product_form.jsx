import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert2"; // Cambié ModalMessage por SweetAlert

const EditProductForm = ({ product, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_APIBACK_URL;

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      // Enviar los datos actualizados
      await axios.put(`${apiUrl}/api/products/${product.id}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      // Mostrar mensaje de éxito
      swal.fire(
        "Producto actualizado",
        "El producto ha sido actualizado correctamente.",
        "success"
      );

      // Recargar la página después de un breve retraso
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);

      // Mostrar mensaje de error
      swal.fire(
        "Error",
        "No se pudo actualizar el producto. Intenta de nuevo.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-[#0EFF06] rounded-lg p-3 bg-black text-lg ">
      <h2 className="text-center text-[#0eff06] text-xl font-bold mb-4">
        Editar Producto
      </h2>
      <form
        className="mt-2 px-4"
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="name">Nombre del producto:</label>
          <input
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            type="text"
            id="name"
            {...register("name", { required: true })}
            defaultValue={product.name} // Usar defaultValue
          />
        </div>
        <br />
        <div>
          <label htmlFor="price">Precio:</label>
          <input
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            type="number"
            id="price"
            {...register("price", { required: true })}
            defaultValue={product.price} // Usar defaultValue
            step="0.01"
          />
        </div>
        <br />
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            type="number"
            id="stock"
            {...register("stock", { required: true })}
            defaultValue={product.stock} // Usar defaultValue
          />
        </div>
        <br />
        <div>
          <label htmlFor="description">Descripción del producto:</label>
          <textarea
            className="textarea ml-1 w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none"
            id="description"
            {...register("description", { required: true })}
            defaultValue={product.description} // Usar defaultValue
            rows="4"
            cols="50"
          />
        </div>
        <br />

        <br />
        <button
          className="bg-[#0EFF06] rounded-lg p-2 text-white font-bold text-xl hover:bg-white w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
