import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importa correctamente desde sweetalert2

export const ProductForm = ({ product, onSubmit }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [categories, setCategories] = useState([
    "Protector de faro",
    "Slider frontal",
    "Slider trasero",
    "Porta alforja",
    "Parrilla de carga",
  ]);
  const [subcategories, setSubcategories] = useState([
    "Vento",
    "Dinamo",
    "Hero motos",
    "Veloci",
    "Italika",
    "Yamaha",
    "MB motor",
    "Universal",
  ]);

  const category = watch("category");
  const subcategory = watch("subcategory");

  useEffect(() => {
    if (product) {
      setValue("name", product.productName);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("subcategory", product.subcategory);
    }
  }, [product, setValue]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await onSubmit(formData, product ? product._id : undefined);
      Swal.fire(
        "¡Agregado!",
        "El producto ha sido agregado con exito",
        "success"
      );
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo agregar el producto. Intenta de nuevo.",
        "error"
      );
    }
  };

  return (
    <div className="border-2 border-[#0EFF06] rounded-lg p-3 bg-black text-lg">
      <h2 className="text-center text-[#0eff06] text-xl font-bold mb-4">
        Nuevo Producto
      </h2>
      <form
        className="mt-2 px-4"
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
        <div>
          <input
            placeholder="Nombre del producto"
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            type="text"
            id="name"
            {...register("name")}
          />
        </div>
        <br />
        <div>
          <input
            placeholder="Precio"
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            type="number"
            id="price"
            {...register("price")}
            step="0.01"
          />
        </div>
        <br />
        <div>
          <input
            placeholder="Stock"
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            type="number"
            id="stock"
            {...register("stock")}
          />
        </div>
        <br />
        <div>
          <textarea
            className="textarea ml-1 w-full bg-gray-800 text-white p-2 focus:outline-none rounded-lg"
            placeholder="Descripción del producto"
            id="description"
            {...register("description")}
            rows="4"
            cols="50"
          />
        </div>
        <br />
        <div>
          <select
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            {...register("category")}
          >
            <option value="" disabled>
              Categoria
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <select
            className="bg-gray-800 text-white p-2 rounded-lg w-full ml-1 focus:outline-none"
            {...register("subcategory")}
          >
            <option value="" disabled>
              Subcategoria
            </option>
            {subcategories.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="text-white">
          <label htmlFor="image">Cargar fotos:</label>
          <input
            className="file-input-primary w-full max-w-xs ml-2 bg-gray-800 text-white"
            type="file"
            id="image"
            {...register("image")}
            accept="image/jpeg"
          />
        </div>
        <br />
        <button
          className="bg-[#0EFF06] rounded-lg p-2 text-black font-bold text-xl hover:bg-white w-full"
          type="submit"
          closeModal={() => document.getElementById("my_modal_5").close()}
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};
