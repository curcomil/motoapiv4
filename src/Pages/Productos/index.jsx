import { ProductForm } from "../../Components/ProductForm";
import Admin_products from "../../Components/Admin_products";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom/dist";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Productos = () => {
  const apiUrl = import.meta.env.VITE_APIBACK_URL;
  const [responseMessage, setResponseMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getproducts`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    setDeletingProductId(productId);
  };

  const handleAddSubmit = async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/newproduct`, formData);
      setProducts([...products, response.data.product]);
      setResponseMessage("ok");
    } catch (error) {
      console.error("Error adding product:", error);
      setResponseMessage("error");
    }
  };

  const handleResponseSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const responseText = formData.get("response");

    if (!selectedQuestion) {
      console.error("No se ha seleccionado ninguna pregunta.");
      return;
    }

    const { productId, _id: questionId } = selectedQuestion;

    if (!productId || !questionId) {
      console.error("ID del producto o de la pregunta no están definidos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${apiUrl}/api/products/${productId}/questions/${questionId}/response`,
        { response: responseText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setIsResponseModalOpen(false);
      } else {
        console.error("Error al agregar la respuesta:", res.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  }

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="main min-h-screen min-w-screen bg-black flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        {responseMessage === "ok" ? (
          <div
            role="alert"
            className="alert alert-success bg-[#0EFF06] mb-4 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Archivo agregado correctamente!</span>
          </div>
        ) : responseMessage ? (
          <div>Algo salió mal.</div>
        ) : null}

        <div className="container flex flex-col sm:flex-row justify-between py-2 w-full">
          <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl p-2">
            Administrador ARS
          </h2>
          <button
            className="btn hover:bg-[#0eff0601] hover:text-white flex items-center justify-center rounded-full border border-[#0eff06e9] bg-[#0eff06] bg-gradient-to-tr from-[#0eff06] to-[#78c048]/70 px-4 sm:px-5 md:px-7 py-2.5 font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>

        <div className="container bg-[#202020] flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-10 text-1xl p-2 mb-2 rounded-lg w-full">
          <Link
            to="/Order"
            className="btn border-2 border-[#0eff06] text-[#0eff06] rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06] w-full sm:w-auto"
          >
            Ir a pedidos
          </Link>
          <button
            className="btn border-2 border-[#0eff06] text-[#0eff06] px-4 py-2 rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06] w-full sm:w-auto"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Agregar Producto
          </button>
          <div className="container bg-[#202020] p-2 mb-2 rounded-lg w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-2 rounded-lg text-white bg-transparent border-2 border-[#0fff07]"
            />
          </div>
          <dialog id="my_modal_4" className="modal bg-[#000000c7]">
            <div className="modal-action">
              <ProductForm
                onSubmit={handleAddSubmit}
                setResponseMessage={setResponseMessage}
              />
              <form method="dialog">
                <button className="btn border-2 border-[#0EFF06] rounded-lg p-3 text-white">
                  Cancelar
                </button>
              </form>
            </div>
          </dialog>
        </div>

        <div className="container bg-[#202020] p-4 rounded-lg border-2 border-[#0EFF06] w-full">
          {filteredProducts.map((product) => (
            <Admin_products
              key={product._id}
              id={product._id}
              name={product.productName}
              price={product.price}
              stock={product.stock}
              description={product.description}
              questions={
                <ul className="flex flex-col justify-center items-end">
                  {product.questions.map((q) => (
                    <li key={q._id}>
                      {q.body}
                      <button
                        className="btn bg-[#0EFF06] text-gray-800 p-1 rounded-lg m-2 hover:text-[#0EFF06]"
                        onClick={() => {
                          setSelectedQuestion({
                            productId: product._id,
                            _id: q._id,
                          });
                          setIsResponseModalOpen(true);
                        }}
                      >
                        Responder
                      </button>
                    </li>
                  ))}
                </ul>
              }
              images={product.images}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {isResponseModalOpen && (
        <dialog id="response_modal" className="modal bg-[#000000c7]" open>
          <div className="modal-action flex flex-col text-white p-4 bg-[#202020] rounded-lg w-3/4 sm:w-1/2">
            <h2 className="text-lg font-bold text-center mb-4">
              Responder Pregunta
            </h2>
            <form onSubmit={handleResponseSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1"></label>
                <input
                  placeholder="Escribe la respuesta..."
                  name="response"
                  type="text"
                  className="border border-gray-800 rounded-lg p-2 w-full text-black"
                  required
                />
              </div>
              <div className="flex justify-center my-2 mx-8">
                <button
                  type="button"
                  className="btn border-2 border-[#0EFF06] rounded-lg p-3 mr-2"
                  onClick={() => setIsResponseModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn border-2 border-[#0EFF06] rounded-lg p-3 mr-2"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Productos;
