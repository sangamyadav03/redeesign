import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = ({ setToggle }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm();

<<<<<<< HEAD
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await loginUser(data);
      login({ token: response.token, user: response.user });
=======
  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUser &&
      data.email === storedUser.email &&
      data.password === storedUser.password
    ) {
      alert(`Welcome back, ${storedUser.name}!`);
      localStorage.setItem("isLoggedIn", "true");
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex gap-10 flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
=======
    <div className="min-h-screen flex gap-10 flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
      <div className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 border border-gray-700">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              {...register("email", { required: true })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none border border-transparent focus:border-blue-500 transition-all placeholder-gray-400 hover:border-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
<<<<<<< HEAD
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none border border-transparent focus:border-blue-500 transition-all placeholder-gray-400 hover:border-blue-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="mt-2 text-xs text-blue-300 hover:text-blue-200"
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
=======
              type="password"
              {...register("password", { required: true })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none border border-transparent focus:border-blue-500 transition-all placeholder-gray-400 hover:border-blue-400"
              placeholder="Enter your password"
            />
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
          </div>

          {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-md font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-300 hover:from-indigo-600 hover:to-blue-600 hover:shadow-[0_0_15px_rgba(79,70,229,0.6)] disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
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
