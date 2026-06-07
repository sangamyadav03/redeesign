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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await loginUser(data);
      login({ token: response.token, user: response.user });
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex gap-10 flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
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
