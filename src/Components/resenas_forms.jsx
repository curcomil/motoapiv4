import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

export const Resenasforms = ({ id, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const apiUrl = import.meta.env.VITE_APIBACK_URL;

  const onSubmit = async (data) => {
    if (!data.rating) {
      data.rating = 5; // Asignar calificación por defecto si no se selecciona ninguna
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/products/${id}/reviews`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      reset();
      closeModal();
      swal({
        title: "Comentario Agregado",
        icon: "success",
        button: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      closeModal();
      reset();
      swal({
        title: "Parece que no has comprado este articulo todavía",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <div className="border-2 border-[#0EFF06] rounded-lg p-3 bg-gray-800 text-lg max-w-lg mx-auto">
      <h2 className="text-xl text-center md:text-2xl">Nueva Reseña</h2>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="opinion" className="block text-sm md:text-base">
            Opinión:
          </label>
          <textarea
            className="textarea textarea-bordered w-full mt-1"
            placeholder="Escribe tu opinión aquí"
            id="opinion"
            {...register("opinion")}
            rows="4"
            cols="50"
          />
        </div>
        <br />

        <div>
          <label htmlFor="rating" className="block text-sm md:text-base">
            Calificación:
          </label>
          <div className="rating gap-1 mt-1 flex justify-center md:justify-start">
            <input
              type="radio"
              id="rating-1"
              value="1"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-2"
              value="2"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-3"
              value="3"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-4"
              value="4"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
            />
            <input
              type="radio"
              id="rating-5"
              value="5"
              {...register("rating")}
              className="mask mask-star-2 bg-green-500"
              defaultChecked
            />
          </div>
        </div>
        <br />

        <button
          className="w-full bg-[#0EFF06] rounded-lg p-2 text-black font-bold text-xl hover:bg-white transition duration-300"
          type="submit"
          closeModal={() => document.getElementById("my_modal_5").close()}
        >
          Agregar comentario
        </button>
      </form>
    </div>
  );
};
