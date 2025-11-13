import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Axios = () => {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      console.log(response.data); // ✅ Check API data in console
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-400">
        <div className="text-blue-600 text-xl font-semibold animate-pulse">
          Loading products...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-10 px-5">
      <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
        Products
      </h2>

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer p-5 flex flex-col items-center w-60"
            >
              <h1 className="text-xl font-semibold absolute top-0 left-2 text-black">zudio</h1>
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-sm font-semibold text-gray-700 text-center line-clamp-2">
                Name :- {item.title}
              </h3>
              <p className="text-blue-600 font-bold mt-2">
                Price:- ${item.price}
              </p>
              <p className="text-gray-600 text-sm mt-1 text-center line-clamp-3">
                Description:- {item.description}
              </p>
              <div className="btn flex items-center justify-between w-full mt-3">
                <button className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition">
                  Add to Cart
                </button>
                <button onClick={() => nav('/buyform')}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300 col-span-full">
            No products found.
          </p>
        )}
      </div>
      
      {/* Footer Section */}
      <footer className="bg-black text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm">
          <div className="space-y-2">
            <p className="font-semibold">COPYRIGHT © 2025 ZUDIO</p>
            <p className="uppercase tracking-wide">
              Don't miss out on the latest in fashion.
            </p>
            <p className="flex items-center gap-2">
              Follow us{" "}
              <span className="flex items-center gap-3 font-semibold">
                @MYZUDIO, @MYZUDIO
              </span>
            </p>
          </div>

          <div className="space-y-2 text-right">
            <div className="flex flex-col md:flex-row md:gap-5 font-semibold">
              <a href="#" className="hover:underline">
                Cookie Policy
              </a>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </div>
            <p className="relative right-43">
              Contact us -{" "}
              <a className="hover:underline">Zudiohelp@trent-tata.com</a>
            </p>
            <p>
              Zudio Retail Business Associate Enquiry -{" "}
              <a
                href="mailto:zudio.rba@trent-tata.com"
                className="hover:underline"
              >
                zudio.rba@trent-tata.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Axios;
