import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Mens = () => {
  const headerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(imgRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="main p-5 relative bottom-5 overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>

      <header
        ref={headerRef}
        className="flex items-center justify-between shadow-md shadow-amber-50 p-3 rounded-md"
      >
        <div className="txt relative w-30">
          <h1 className="text-4xl font-bold">Zudio</h1>
          <h1 className="text-2xl relative left-4">MEN</h1>
        </div>

        <h1 className="text-3xl text-center">
          Unleash Your Style — The Zudio Way
        </h1>

        <h1 className="text-xl text-gray-300 hover:text-white transition duration-300">
          Zudio Beauty Near You
        </h1>
      </header>

      <div className="relative w-full overflow-hidden mt-6">
        <div className="flex w-max gap-4 animate-scroll">
          {[
            "https://i.pinimg.com/736x/88/de/9a/88de9ad1b8d7adc0bc7c03b2b528165c.jpg",
            "https://i.pinimg.com/1200x/3a/95/a1/3a95a172c7a1f216874da9c5736c29a5.jpg",
            "https://i.pinimg.com/1200x/0f/88/f2/0f88f27905a4f5c16dfdbc6b8d01a588.jpg",
            "https://i.pinimg.com/736x/dd/d0/5f/ddd05f400c4dc3e1ef06c3703dc5e814.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="relative w-[350px] h-[450px] rounded-lg overflow-hidden flex-shrink-0"
            >
              <h1 className="absolute left-2 top-2 text-2xl font-semibold text-black z-20">
                Classic
              </h1>
              <img
                src={src}
                alt={`Zudio ${i + 1}`}
                className="w-[350px] h-[450px] rounded-lg object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}

          {[
            "https://i.pinimg.com/736x/88/de/9a/88de9ad1b8d7adc0bc7c03b2b528165c.jpg",
            "https://i.pinimg.com/1200x/3a/95/a1/3a95a172c7a1f216874da9c5736c29a5.jpg",
            "https://i.pinimg.com/1200x/0f/88/f2/0f88f27905a4f5c16dfdbc6b8d01a588.jpg",
            "https://i.pinimg.com/736x/dd/d0/5f/ddd05f400c4dc3e1ef06c3703dc5e814.jpg",
          ].map((src, i) => (
            <div
              key={i + 4}
              className="relative w-[350px] h-[450px] rounded-lg overflow-hidden flex-shrink-0"
            >
              <h1 className="absolute left-2 top-2 text-2xl font-semibold text-black z-20">
                Classic
              </h1>
              <img
                src={src}
                alt={`Zudio ${i + 5}`}
                className="w-[350px] h-[450px] rounded-lg object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={imgRef}
        className="img w-full h-[562px] rounded-lg mt-5 overflow-hidden"
      >
        <img
          className="w-full h-auto object-cover"
          src="https://www.zudio.com/cdn/shop/files/5_ebd120d9-e584-4512-80c9-874732da9f22_1296x.jpg?v=1762412864"
          alt="Zudio Men"
        />
      </div>

      <footer className="bg-black text-white py-8 px-6 mt-10">
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
            <p>
              Contact us —{" "}
              <a className="hover:underline">Zudiohelp@trent-tata.com</a>
            </p>
            <p>
              Zudio Retail Business Associate Enquiry —{" "}
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

export default Mens;
