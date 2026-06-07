<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { gsap } from "gsap";
import { useAuth } from "../context/AuthContext";
=======
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a

const HomeLayout = () => {

  const nav = useNavigate();
<<<<<<< HEAD
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoRef.current,
      { y: -100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2 }
    );

    tl.fromTo(
      linksRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
      },
      "-=0.6"
    );
  }, []);

  const navItems = [
    { name: "Zudio Near You", path: "zudio-near-you" },
    { name: "Z Products", path: "z-world" },
    { name: "Z Stories", path: "z-stories" },
    { name: "Gift Card", path: "gift-card" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-letrera z-10">
      <header className="w-full bg-black/95 backdrop-blur-md fixed top-0 left-0 z-50 shadow-md shadow-white/10">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-10 font-letrera">
          <h1 onClick={() => nav('/home')}
            ref={logoRef}
            className="text-3xl font-normal tracking-wide text-white md:text-5xl cursor-pointer"
          >
            zudio
          </h1>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full border border-white/20 px-3 py-2 text-sm text-white md:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>

          <nav className="hidden gap-8 text-base lg:gap-16 lg:text-lg md:flex items-center">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                ref={(el) => (linksRef.current[index] = el)}
                className="relative text-white transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-300 after:transition-all after:duration-500 hover:after:w-full hover:text-gray-400"
=======
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
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
              >
                {item.name}
              </NavLink>
            ))}
<<<<<<< HEAD
            <button
              type="button"
              onClick={() => {
                logout();
                nav('/');
              }}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Logout ({user?.name || 'User'})
            </button>
          </nav>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/10 bg-black/95 px-4 pb-4 pt-3 md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-white hover:bg-white/10"
              >
                {item.name}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                logout();
                setMenuOpen(false);
                nav('/');
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-left text-white hover:bg-white/10"
            >
              Logout ({user?.name || 'User'})
            </button>
          </nav>
        )}
      </header>

      <main className="pt-20">
=======
          </nav>
        </div>

        <button onClick={ () => nav("/")} className="bg-white text-black py-2 rounded-md text-sm">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
