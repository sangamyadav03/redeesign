import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Login = ({ setToggle }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUser &&
      data.email === storedUser.email &&
      data.password === storedUser.password
    ) {
      alert(`Welcome back, ${storedUser.name}!`);
     localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid email or password. Please try again.");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex gap-10 flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-bold text-white">Zudio</h1>
      <div className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 border border-gray-700">
      
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none border border-transparent focus:border-blue-500 transition-all placeholder-gray-400 hover:border-blue-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none border border-transparent focus:border-blue-500 transition-all placeholder-gray-400 hover:border-blue-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 hover:from-indigo-600 hover:to-blue-600 hover:shadow-[0_0_15px_rgba(79,70,229,0.6)]"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-5 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => setToggle(true)}
            className="text-blue-400 hover:text-blue-500 transition-all cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
