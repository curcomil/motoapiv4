import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { registerSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Message } from "../../Components/ui/Message";
import logo from "../../../dist/assets/logo_ars.png";

const SignUp = () => {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient-to-r-transparent border-2 border-[#0eff06] p-8 rounded-xl shadow-lg w-full max-w-sm">
        <img className="p-5" src={logo} alt="logo" />
        <h2 className="text-2xl text-white mb-6 text-center">Regístrate</h2>
        {registerErrors &&
          registerErrors.map((error, i) => <Message message={error} key={i} />)}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline mb-4"
              type="text"
              placeholder="Username"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="text-red-500">{errors.username?.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline mb-4"
              type="email"
              placeholder="Correo"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline mb-4"
              type="password"
              placeholder="Contraseña"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Contraseña
            </label>
            <input
              className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline mb-4"
              type="password"
              placeholder="Confirmar Contraseña"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 leading-tight"
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="text-gray-300 text-sm">
              Acepto los{" "}
              <button
                type="button"
                className="text-green-500 underline"
                onClick={() => setShowTermsModal(true)}
              >
                términos y condiciones
              </button>
            </label>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-full w-full"
              disabled={!termsAccepted}
            >
              Registro
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-300 mt-2">
            <a href="#" className="text-green-500">
              Olvidé mi contraseña
            </a>
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-green-500">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Términos y Condiciones</h3>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowTermsModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
