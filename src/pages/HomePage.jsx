import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const lettersRef = useRef([]);
  const titleRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const topLineContentRef = useRef(null);
  const bottomLineContentRef = useRef(null);
  const routesRef = useRef(null);

  useEffect(() => {
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
          className="routes w-30 h-60 z-30 top-80 left-10 text-gray-400 font-semibold flex flex-col gap-5 text-xl fixed"
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

        <div className="name text-[18rem] flex space-x-6 select-none mt-10 z-10">
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

      <div className="relative h-[730px] w-full bg-white flex justify-center">
        <h1 className="text-8xl text-black absolute top-14 z-10">
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
