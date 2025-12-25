import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";

const HomeLayout = () => {

  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex">
      
      <aside className="w-[260px] bg-[#0d121a] border-r border-white/10 flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-semibold mb-6">Ecom</h1>

          <nav className="flex flex-col gap-2">
            {[
              { name: "Home", path: "" },
              { name: "Products", path: "products" },
              { name: "Users", path: "users" },
            ].map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all
                   ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <button onClick={ () => nav("/")} className="bg-white text-black py-2 rounded-md text-sm">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
