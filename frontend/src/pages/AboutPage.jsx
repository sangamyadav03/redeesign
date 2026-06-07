import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AboutPage = () => {
  const imagesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      imagesRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      }
    );
  }, []);

  const images = [
    "https://i.pinimg.com/736x/0b/7e/a6/0b7ea677416850ab40555f40a6e094c6.jpg",
    "https://i.pinimg.com/736x/21/70/06/21700691de1b48b9adecc641f5e88fe7.jpg",
    "https://i.pinimg.com/736x/cf/00/9e/cf009e68745e20f920f61193d954e567.jpg",
  ];

  return (
    <div className="">
      <div className="flex items-center mt-10 justify-center gap-5">
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => (imagesRef.current[i] = el)}
            className="img w-[30%] rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:rotate-1"
          >
            <img
              className="w-[500px] h-[600px] object-cover rounded-xl"
              src={src}
              alt=""
            />
          </div>
        ))}
      </div>

      <div
        className="img w-full h-[650px] rounded-lg mt-15 overflow-hidden"
      >
        <img
          className="w-full h-auto object-cover"
          src="https://i.pinimg.com/1200x/79/41/ad/7941ad3d0d74961921bc7abb593d7dbe.jpg"
          alt=""
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

export default AboutPage;
