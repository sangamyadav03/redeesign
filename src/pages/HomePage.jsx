import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import api from "../api/client";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const lettersRef = useRef([]);
  const titleRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const topLineContentRef = useRef(null);
  const bottomLineContentRef = useRef(null);
  const routesRef = useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    loadProducts();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    tl.fromTo(
      topLineRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      bottomLineRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    tl.fromTo(
      lettersRef.current,
      { y: 150, opacity: 0, rotateX: 90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.8"
    );

    gsap.to(topLineContentRef.current, {
      xPercent: -30,
      repeat: -1,
      duration: 10,
      ease: "linear",
    });

    gsap.to(bottomLineContentRef.current, {
      xPercent: -30,
      repeat: -1,
      duration: 10,
      ease: "linear",
    });

    gsap.fromTo(
      routesRef.current,
      { x: -150, opacity: 0, rotateY: 45 },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 1,
      }
    );
  }, []);

  const letters = ["Z", "U", "D", "I", "O"];

  return (
    <div className="main">
      <div
        ref={titleRef}
        className="title w-full h-[650px] text-white flex flex-col items-center justify-center font-letrera overflow-hidden relative"
        style={{
          opacity: 75,
          backgroundImage:
            "url('https://i.pinimg.com/1200x/6c/b5/2d/6cb52d7afb3150819a0ea88f52ce9de8.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div
          ref={routesRef}
          className="routes z-30 top-24 left-4 right-4 md:top-28 md:left-10 md:w-32 md:h-60 md:fixed md:flex md:flex-col md:gap-5 text-sm md:text-xl text-gray-200 bg-black/60 md:bg-transparent backdrop-blur md:backdrop-blur-none p-3 md:p-0 rounded-2xl shadow-lg md:shadow-none"
        >
          <NavLink to={"beauty"}>
            <span className="hover:text-green-400">Beauty</span>
          </NavLink>
          <NavLink to={"mens"}>
            <span className="hover:text-blue-400">Mens</span>
          </NavLink>
          <NavLink to={"women"}>
            <span className="hover:text-pink-400">Womens</span>
          </NavLink>
          <NavLink to={"kids"}>
            <span className="hover:text-orange-400">Kids</span>
          </NavLink>
          <NavLink to={"footwear"}>
            <span className="hover:text-purple-600">FootWear</span>
          </NavLink>
        </div>

        <div
          ref={topLineRef}
          className="relative w-full h-11 bg-white text-gray-600 overflow-hidden mt-10 z-10"
        >
          <div
            ref={topLineContentRef}
            className="absolute flex items-center gap-10 text-4xl font-semibold whitespace-nowrap"
          >
            {Array(30)
              .fill("ZUDIO")
              .map((text, index) => (
                <h1 key={index}>{text}</h1>
              ))}
          </div>
        </div>

        <div className="name text-[4rem] md:text-[10rem] lg:text-[18rem] flex flex-wrap justify-center gap-3 md:gap-6 select-none mt-10 z-10 leading-none">
          {letters.map((char, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index] = el)}
              className="inline-block"
            >
              {char}
            </span>
          ))}
        </div>

        <div
          ref={bottomLineRef}
          className="relative w-full h-11 bg-white text-gray-600 overflow-hidden mt-10 z-10"
        >
          <div
            ref={bottomLineContentRef}
            className="absolute flex items-center gap-10 text-4xl font-semibold whitespace-nowrap"
          >
            {Array(30)
              .fill("ZUDIO")
              .map((text, index) => (
                <h1 key={index}>{text}</h1>
              ))}
          </div>
        </div>
      </div>

      <section className="px-4 py-10 md:px-8 lg:px-12 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="uppercase tracking-[0.35em] text-sm text-rose-500">Live storefront</p>
              <h2 className="text-3xl md:text-5xl font-semibold">The latest looks, now powered by our backend</h2>
            </div>
            <p className="max-w-xl text-gray-600">Fresh products and gift-card requests are now handled by a real API, so the experience feels connected from browsing to checkout.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <article key={product.id} className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <img src={product.image} alt={product.title} className="h-44 w-full rounded-2xl object-cover" />
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.25em] text-rose-500">{product.category}</p>
                  <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-black">₹{product.price}</span>
                    <button className="rounded-full bg-black px-4 py-2 text-sm text-white">View look</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="relative min-h-[420px] md:h-[730px] w-full bg-white flex justify-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-black absolute top-6 md:top-14 z-10 text-center px-4">
          the zudio runway
        </h1>

        <div className="img w-full h-full overflow-hidden z-0">
          <img
            className="w-full scale-[1.29] origin-center transition-transform duration-700 hover:scale-[1.15]"
            src="https://i.pinimg.com/1200x/0d/4b/d2/0d4bd2feace001bac5816328cad0d709.jpg"
            alt=""
          />
        </div>
      </div>

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
              Contact us - <a className="hover:underline">Zudiohelp@trent-tata.com</a>
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

export default HomePage;
