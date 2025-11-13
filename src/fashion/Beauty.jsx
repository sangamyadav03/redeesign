import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Beauty = () => {
  const images = [
    "https://i.pinimg.com/736x/2a/d3/cc/2ad3cc87c449c9f7737f6150bfeb2536.jpg",
    "https://i.pinimg.com/736x/78/ca/6a/78ca6a828d3d7d08baae7c2e6760f117.jpg",
    "https://i.pinimg.com/736x/fa/67/19/fa6719f1bc72df35beb71529fe32e0b1.jpg",
    "https://i.pinimg.com/736x/a0/62/20/a06220afe2d9645175fe374f3c8179f3.jpg",
  ];

  const headerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(imgRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="main p-5 relative bottom-5 overflow-hidden">
      <header
        ref={headerRef}
        className="flex items-center justify-between shadow-md shadow-amber-50 p-3 rounded-md"
      >
        <div className="txt relative w-30">
          <h1 className="text-4xl font-bold">Zudio</h1>
          <h1 className="text-2xl relative left-4">Beauty</h1>
        </div>
        <h1 className="text-3xl">Make Up Your Mood with Zudio</h1>
        <h1 className="text-xl text-gray-200 hover:text-white transition">
          Zudio Beauty Near You
        </h1>
      </header>

      <div className="w-full overflow-hidden py-10">
        <div className="flex gap-6 animate-scroll">
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="relative min-w-[300px] sm:min-w-[350px] h-[450px] rounded-lg overflow-hidden flex-shrink-0"
            >
              <img
                src={img}
                alt={`Zudio ${i + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={imgRef}
        className="img w-full h-[650px] rounded-lg mt-5 overflow-hidden"
      >
        <img
          className="w-full h-auto object-cover"
          src="https://i.pinimg.com/736x/d0/85/c0/d085c0690ba1e8d43c8cd0eeb8515b70.jpg"
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

export default Beauty;
