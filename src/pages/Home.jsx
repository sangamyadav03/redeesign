import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
      <p className="text-gray-400">Welcome to Ecom Admin Panel</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#131a24] p-6 rounded-lg">
          <p className="text-gray-400 text-sm">Total Products</p>
          <h2 className="text-2xl mt-2">100</h2>
        </div>

        <div className="bg-[#131a24] p-6 rounded-lg">
          <p className="text-gray-400 text-sm">Total Users</p>
          <h2 className="text-2xl mt-2">45</h2>
        </div>

        <div className="bg-[#131a24] p-6 rounded-lg">
          <p className="text-gray-400 text-sm">Revenue</p>
          <h2 className="text-2xl mt-2">₹2,50,000</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
