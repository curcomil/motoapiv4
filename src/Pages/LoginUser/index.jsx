import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";
import { Message } from "../../Components/ui/Message";
import logo from "../../../dist/assets/logo_ars.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient-to-r-transparent border-2 border-[#0eff06] p-8 rounded-xl shadow-lg w-full max-w-sm">
        <img className="p-5" src={logo} alt="logo" />
        <h2 className="text-2xl text-white mb-6 text-center">Inicia sesión</h2>
        {loginErrors &&
          loginErrors.map((error, i) => <Message message={error} key={i} />)}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo"
              {...register("email", { required: true })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2 leading-tight"
            />
            <label htmlFor="rememberMe" className="text-gray-300 text-sm">
              Recordarme
            </label>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-transparent hover:bg-[#0FFF07] hover:text-black transition-colors duration-300 border-2 border-white text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-300">
            ¿Aún no tienes cuenta?{" "}
            <Link to="/signup" className="text-green-500">
              Regístrate
            </Link>
          </p>
          <p className="text-gray-300 mt-2">
            <a href="#" className="text-green-500">
              Olvidé mi contraseña
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
