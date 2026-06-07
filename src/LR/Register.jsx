import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = ({ setToggle }) => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");
=======
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    alert(" Account created successfully! ");
    setToggle(false);
  };
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a

    try {
      const response = await registerUser(data);
      login({ token: response.token, user: response.user });
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex gap-10 flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-bold text-white">Zudio</h1>
=======
    <div className="min-h-screen flex gap-10 flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
      <div className="bg-gray-800/80 p-8 rounded-2xl shadow-lg w-96 border border-gray-700">
        <h2 className="text-3xl text-white text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              {...register("email", { required: true })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
<<<<<<< HEAD
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password should be at least 6 characters" } })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="mt-2 text-xs text-blue-300 hover:text-blue-200"
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
=======
              type="text"
              {...register("password", { required: true })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
              placeholder="Enter your password"
            />
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
          </div>

          {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-md font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-300 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-5 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setToggle(false)}
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
