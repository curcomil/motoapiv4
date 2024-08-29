import { Navlink } from "../../Components/Navbar_";
import { Resenasforms } from "../../Components/resenas_forms";
import { Footer } from "../../Components/footer";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import StarRating from "../../Components/Stars_rating";
import swal from "sweetalert";

const ProductPage = () => {
  const apiUrl = import.meta.env.VITE_APIBACK_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get("id");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value) {
      axios
        .get(`${apiUrl}/api/getproduct`, { params: { id: value } })
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error al obtener el producto");
          setLoading(false);
          console.error("Error al obtener el producto:", error);
        });
    }
  }, [value]);

  const onclickcarrito = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/newpedido`,
        {
          productos: [
            {
              producto: product._id.toString(),
              cantidad: 1,
              precio: product.price,
              product_name: product.productName,
              image: product.images,
              product_stock: product.stock,
            },
          ],
        },
        {
          withCredentials: true,
        }
      );

      swal({
        title: "Agregado al carrito",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0eff06",
      });
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      swal({
        title: "Inicia sesión o crea una cuenta para continuar",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#0eff06",
      });
    }
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/products/${value}/questions`,
        data,
        {
          withCredentials: true,
        }
      );

      // Muestra el mensaje de éxito si la pregunta fue añadida
      if (
        response.data &&
        response.data.message === "Pregunta añadida con éxito"
      ) {
        swal({
          title: "Pregunta enviada con éxito!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#0eff06",
        });

        // Después de enviar la pregunta, vuelve a obtener la lista de preguntas
        const productResponse = await axios.get(`${apiUrl}/api/getproduct`, {
          params: { id: value },
        });

        setProduct(productResponse.data);

        reset();
      } else {
        console.error("Formato inesperado en la respuesta:", response.data);
        swal({
          title: "Error: Formato de respuesta no válido",
          icon: "error",
          button: "OK",
        });
      }
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
      swal({
        title: "Inicia sesión o crea una cuenta para continuar",
        icon: "error",
        button: "OK",
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navlink />
      <br />
      <br />
      <br />
      <br />
      <main className="p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:space-x-8 bg-gray-800 p-4 rounded-lg">
            <div className="lg:w-1/3 bg-gray-400">
              <img
                src={product?.images || "https://via.placeholder.com/400"}
                alt="Producto"
                className="w-full rounded-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-2 text-[#0eff06]">
                {product?.productName || "Nombre del producto"}
              </h1>
              <p className="text-white">Precio</p>
              <p className="text-2xl text-[#0eff06] mb-4 border-b-2 border-[#0eff06]">
                ${product?.price?.toFixed(2)} MXN
              </p>
              <p className="text-red-500 mb-4">
                (
                {product?.stock
                  ? `${product.stock} Disponibles`
                  : "Stock no disponible"}
                )
              </p>
              <button
                onClick={onclickcarrito}
                className="bg-[#0eff06] text-black font-bold py-2 px-4 rounded-full mb-4 hover:text-white hover:bg-gradient-to-r from-orange-300 to-[#0eff06]"
              >
                Agregar al carrito
              </button>
              <div className="flex items-center mb-4 w-1/2 bg-white">
                <img
                  src="https://autofinish.mx/wp-content/uploads/2022/05/iconpayautofinishpng.png"
                  alt="Payment Methods"
                />
              </div>
              <p className="mb-4">
                ¡Envío de 3 a 5 días hábiles!* Hasta 12 MSI con mercado crédito
              </p>
              <button className="border-2 border-[#0eff06] text-[#0eff06] px-4 py-2 rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06]">
                <a
                  href="../public/Manual_de_instalacion.pdf"
                  download="Manual_de_instalacion.pdf"
                  className="no-underline text-[#0eff06] hover:text-gray-800"
                >
                  Manual Instalación
                </a>
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 mt-8 rounded-lg">
            <details className="tabs mb-4">
              <summary className="px-4 py-2 bg-[#0eff06] text-gray-900 font-bold rounded-xl">
                Descripción
              </summary>
              <ul className="text-gray-300 text-justify m-6">
                {product?.description ||
                  "Descripción no disponible. Slider tipo jaula. Hecho de acero industrial y con pintura electrostática para mayor duración, incluso en climas costeros..."}
              </ul>
            </details>
            <details className="tabs mb-4">
              <summary className="px-4 py-2 bg-[#0eff06] text-gray-900 font-bold rounded-xl">
                Comentarios
              </summary>
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="text-gray-300 text-justify m-4 border-b-2 border-green-500 text-lg"
                  >
                    <div className="flex">
                      <h2 className="text-green-500 mr-4">{review.username}</h2>
                      <StarRating rating={review.rating}></StarRating>
                    </div>
                    <p>{review.opinion}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-300 text-justify m-6">
                  Todavía no hay comentarios sobre este producto{" "}
                  <svg
                    className="h-8 w-8 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="10" x2="9.01" y2="10" />
                    <line x1="15" y1="10" x2="15.01" y2="10" />
                    <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
                  </svg>
                </div>
              )}
            </details>
            <details className="tabs mb-4">
              <summary className="px-4 py-2 bg-[#0eff06] text-gray-900 font-bold rounded-xl">
                Información del envío
              </summary>
              <ul className="text-gray-300 text-justify m-6">
                - OPCIONES DE ENVIO:
                <br />
                La tarifa dentro de la CDMX es de $210.00, la tarifa al exterior
                de la republica $510.00.
                <br />
                - TIEMPOS DE ENTREGA ESTIMADOS: <br />
                Dentro de la CDMX tenemos un tiempo de entrega de 2 a 3 dias
                habiles, al exterior de 4 a 5 dias habiles.
                <br /> - SEGUIMIENTO DE ENVIOS: <br />
                Se podran consultar en MIS COMPRAS dentro de la pagina web con
                el numero de guia.
              </ul>
            </details>
          </div>

          <div className="flex justify-center m-8 ">
            <Link
              to="/Menu"
              className="border-2 border-[#0eff06] text-[#0eff06] px-4 py-2 rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06] mx-8"
            >
              Regresar al menu
            </Link>{" "}
            <button
              className="border-2 border-[#0eff06] text-[#0eff06] px-4 py-2 rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06]"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Agregar comentario
            </button>
          </div>

          <dialog id="my_modal_5" className="modal bg-[#000000c7]">
            <div className="modal-action">
              <Resenasforms
                id={value}
                closeModal={() => document.getElementById("my_modal_5").close()}
              />
              <form method="dialog">
                <button className="btn border-2 border-[#0EFF06] rounded-lg p-3">
                  Cancelar
                </button>
              </form>
            </div>
          </dialog>

          <div className="bg-gray-800 p-4 mt-8 rounded-lg">
            <h2 className="text-xl mb-4">Hacer una pregunta</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
              <input
                {...register("body", { required: true })}
                className="w-full px-3 py-2 text-gray-900 rounded-lg"
                type="text"
                placeholder="Hacer una pregunta..."
              />
              <button
                type="submit"
                className="border-2 border-[#0eff06] text-[#0eff06] px-4 py-2 rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06]"
              >
                Enviar Pregunta
              </button>
            </form>
            <details className="tabs mb-4 mt-4">
              <summary className="px-4 py-2 bg-[#0eff06] text-gray-900 font-bold rounded-xl">
                Preguntas
              </summary>
              {product.questions.length > 0 ? (
                product.questions.map((questions, index) => (
                  <div
                    key={index}
                    className="text-gray-300 text-justify m-4 border-b-2 border-green-500 text-lg flex flex-col"
                  >
                    <h2 className="text-green-500 mr-4">{questions.author}:</h2>
                    <p>{questions.body}</p>
                    <div>
                      {questions.response && (
                        <p>
                          <span className="text-yellow-500">Respuesta: </span>
                          <span className="text-white">
                            {questions.response}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-300 text-justify m-4">
                  Todavía no hay preguntas sobre este producto{" "}
                  <svg
                    className="h-8 w-8 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="10" x2="9.01" y2="10" />
                    <line x1="15" y1="10" x2="15.01" y2="10" />
                    <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
                  </svg>
                </div>
              )}
            </details>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
