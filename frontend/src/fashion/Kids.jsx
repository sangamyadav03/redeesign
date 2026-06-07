import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Kids = () => {
  const headerRef = useRef(null);
  const bottomImgRef = useRef(null);

  useEffect(() => {
   
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

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
    "https://i.pinimg.com/736x/1d/c6/3b/1dc63bcf74d28529230d582982832660.jpg",
    "https://i.pinimg.com/736x/21/ac/ce/21acce929f762e386c66c1be9ab34276.jpg",
    "https://www.zudio.com/cdn/shop/files/2_04562154-0729-418c-90e5-63d94c7968b7_1296x.jpg?v=1762412589",
    "https://i.pinimg.com/736x/1e/d8/bd/1ed8bdbfc51961bbdcc98b635b4db1f7.jpg",
  ];

  return (
    <div className="main p-5 relative bottom-5 overflow-hidden">
      <header
        ref={headerRef}
        className="flex items-center justify-between shadow-md shadow-amber-50 p-3 rounded-md"
      >
        <div className="txt relative w-30">
          <h1 className="text-4xl font-bold">Zudio</h1>
          <h1 className="text-2xl relative left-4">Kids</h1>
        </div>
        <h1 className="text-3xl">Aesthetic With zudio</h1>
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
                zudio aesthetic
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

      <div
        ref={bottomImgRef}
        className="img w-full h-[562px] rounded-lg mt-5 overflow-hidden"
      >
        <img
          className="w-full h-auto object-cover"
          src="https://www.zudio.com/cdn/shop/files/3_55e364db-b92d-4d93-8935-7f8d35ea5b64_1296x.jpg?v=1762412698"
          alt=""
        />
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

export default Kids;
