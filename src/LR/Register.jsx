import React from "react";
import { useForm } from "react-hook-form";

const Register = ({ setToggle }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    alert("Account created successfully!");
    setToggle(false); // ✅ Go to Login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800/80 p-8 rounded-2xl shadow-lg w-96 border border-gray-700">
        <h2 className="text-3xl text-white text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="text"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
          >
            Register
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
