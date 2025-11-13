import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FootWear = () => {
  const headerRef = useRef(null);
  const bottomImgRef = useRef(null);

  useEffect(() => {
    // Header animation (slide-down + fade-in)
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    // ScrollTrigger animation for bottom image
    gsap.from(bottomImgRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bottomImgRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });
  }, []);

  const images = [
    "https://i.pinimg.com/736x/0e/4e/f3/0e4ef37ca297da502d479b8ea50da929.jpg",
    "https://i.pinimg.com/736x/27/81/f4/2781f4183040bcf7dbe946b96b459024.jpg",
    "https://i.pinimg.com/736x/50/4e/c3/504ec32bb095f94e839c6f74528495ea.jpg",
    "https://i.pinimg.com/736x/8f/6c/b7/8f6cb73099349537103d23dabf5241c9.jpg",
  ];

  return (
    <div className="main p-5 relative bottom-5 overflow-hidden">
      <header
        ref={headerRef}
        className="flex items-center justify-between shadow-md shadow-amber-50 p-3 rounded-md"
      >
        <div className="txt relative w-30">
          <h1 className="text-4xl font-bold">Zudio</h1>
          <h1 className="text-2xl relative left-4">FootWear</h1>
        </div>
        <h1 className="text-3xl">Walk Your Way — Walk with Zudio</h1>
        <h1 className="text-xl text-gray-200 hover:text-white transition">
          Zudio Beauty Near You
        </h1>
      </header>

      <div className="w-full overflow-hidden py-10">
        <div className="flex gap-6 animate-scroll">
          {[...images, ...images].map((img, index) => (
            <div
              key={index}
              className="relative min-w-[300px] sm:min-w-[350px] h-[450px] rounded-lg overflow-hidden flex-shrink-0"
            >
              <h1 className="text-2xl absolute left-3 top-3 font-semibold text-white z-10">
                Classic
              </h1>
              <img
                src={img}
                alt={`Zudio ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-trigger image section */}
      <div
        ref={bottomImgRef}
        className="img w-full h-[562px] flex rounded-lg mt-5 overflow-hidden"
      >
        <img
          className="w-[50%] h-auto object-cover"
          src="https://i.pinimg.com/736x/e4/5e/37/e45e37a1392fcc0366bfdc0ed814fee4.jpg"
          alt=""
        />
         <img
          className="w-[50%] h-auto object-cover"
          src="https://i.pinimg.com/736x/47/73/d8/4773d8a2bba633508d45acbe9e59c524.jpg"
          alt=""
        />
      </div>

      <footer className="bg-black text-white py-8 px-6 rounded-t-2xl">
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

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FootWear;
