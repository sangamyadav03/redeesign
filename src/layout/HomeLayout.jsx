import React, { useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { gsap } from "gsap";

const HomeLayout = () => {
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const nav = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate logo
    tl.fromTo(
      logoRef.current,
      { y: -100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2 }
    );

    // Animate NavLinks
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
      {/* ✅ Fixed Header with z-index */}
      <header className="flex w-full h-[70px] bg-black justify-between items-center px-10 py-6 font-letrera fixed top-0 left-0 z-50 shadow-md shadow-white">
        {/* Logo */}
        <h1 onClick={() => nav('/home')}
          ref={logoRef}
          className="text-5xl font-normal tracking-wide text-white"
        >
          zudio
        </h1>

        {/* Navigation Links */}
        <nav className="flex gap-16 text-lg">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              ref={(el) => (linksRef.current[index] = el)}
              className="relative text-white transition-all duration-300 
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 
                         after:w-0 after:h-[2px] after:bg-gray-300 
                         after:transition-all after:duration-500 
                         hover:after:w-full hover:text-gray-400"
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* ✅ Offset the main content so it’s not hidden behind the fixed header */}
      <main className="pt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
