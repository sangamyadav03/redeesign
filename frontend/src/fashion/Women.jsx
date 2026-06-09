import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";

gsap.registerPlugin(ScrollTrigger);

const Women = () => {
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const imgSectionRef = useRef(null);

  const images = [
    "https://i.pinimg.com/736x/51/da/9e/51da9ea38e2815d918f3133b8ced2075.jpg",
    "https://i.pinimg.com/1200x/90/ba/d0/90bad0943fa2dc24435043165463e86e.jpg",
    "https://i.pinimg.com/736x/52/fa/dc/52fadc8d93d89f5d5e28c6bec33cdd07.jpg",
    "https://i.pinimg.com/736x/ac/49/52/ac4952a49f37bd8f5fdb23b6d579cc7f.jpg",
  ];

  const repeatedImages = [...images, ...images];
const womenProducts = data.filter(
  (item) => item.category?.toLowerCase() === "women"
);


  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += 1;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(scroll);
    };

    scroll();
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    gsap.from(header, {
      y: -100,
      opacity: 0,
      delay:1,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const imgSection = imgSectionRef.current;
    gsap.from(imgSection, {
      scrollTrigger: {
        trigger: imgSection,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="main p-5 relative bottom-5">
      <header
        ref={headerRef}
        className="flex items-center justify-between shadow-md shadow-amber-50 p-3 rounded-md"
      >
        <div className="txt relative w-30">
          <h1 className="text-4xl font-bold">Zudio</h1>
          <h1 className="text-2xl relative left-4">Women</h1>
        </div>
        <h1 className="text-3xl">Be Fierce. Be Fabulous. Be Zudio</h1>
        <h1 className="text-xl text-gray-200 hover:text-white transition">
          Zudio Beauty Near You
        </h1>
      </header>

      <div
        ref={scrollRef}
        className="overflow-x-hidden whitespace-nowrap no-scrollbar mt-6"
      >
        <div className="flex gap-4 px-4 py-2">
          {repeatedImages.map((src, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={src}
                alt={`Zudio ${index + 1}`}
                className="w-[350px] h-[450px] rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Women's Products Section */}
<section className="mt-20">
  <h1 className="text-5xl font-bold text-center mb-12">
    Women's Collection
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {womenProducts.map((item) => (
      <div
        key={item.id}
        className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <div className="h-72 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold mb-2">
            {item.name}
          </h2>

          <p className="text-gray-400 text-sm mb-4 min-h-[45px]">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-green-400 text-2xl font-bold">
              ₹{item.price}
            </span>

            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      <div
        ref={imgSectionRef}
        className="img w-full h-[562px] rounded-lg mt-5 overflow-hidden"
      >
        <img
          className="w-full h-auto object-cover"
          src="https://www.zudio.com/cdn/shop/files/6_dbb645f0-0077-48dc-8e70-a98a313d360c_1296x.jpg?v=1762412957"
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
              <a href="mailto:Zudiohelp@trent-tata.com" className="hover:underline">
                Zudiohelp@trent-tata.com
              </a>
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

export default Women;
