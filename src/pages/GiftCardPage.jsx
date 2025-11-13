import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GiftCardPage = () => {
  const [deliveryOption, setDeliveryOption] = useState("gift");
  const [deliveryDate, setDeliveryDate] = useState("today");
  const [deliveryMode, setDeliveryMode] = useState("email");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const headerRef = useRef(null);
  const formSectionsRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animate header
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate each form section with stagger
    gsap.from(formSectionsRef.current, {
      scrollTrigger: {
        trigger: formSectionsRef.current[0],
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
    });

    // Animate button on scroll
    gsap.from(buttonRef.current, {
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 90%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4 text-white">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-10">
        <h1 className="text-2xl text-black font-semibold">Zudio E-Gift Card</h1>
        <p className="text-gray-600 mt-2 text-sm max-w-2xl mx-auto">
          Running out of gift ideas? We’ve got something that’s really IN — Zudio E-Gift Cards! 
          Give your loved ones the gift of fashion and fits that are IN. Deliver WHAT’S IN straight to their inbox!
        </p>
      </div>

      {/* Gift Card Form */}
      <div className="w-full max-w-5xl bg-gray-900 text-white rounded-xl p-8 shadow-lg">
        {/* Denomination */}
        <section ref={(el) => (formSectionsRef.current[0] = el)}>
          <h2 className="text-lg font-medium text-center border-b border-gray-700 pb-3 mb-6">
            Enter Denomination
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="number"
              placeholder="Enter Amount (₹250 - ₹49,000)"
              className="border rounded-md px-4 py-2 flex-1 outline-none focus:ring-2 focus:ring-red-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Quantity (Min 1, Max 10)"
              className="border rounded-md px-4 py-2 flex-1 outline-none focus:ring-2 focus:ring-red-400"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </section>

        {/* Delivery Options */}
        <section ref={(el) => (formSectionsRef.current[1] = el)}>
          <h3 className="font-semibold mb-2">Delivery Options</h3>
          <div className="flex gap-6 mb-6">
            {["gift", "self"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryOption"
                  value={opt}
                  checked={deliveryOption === opt}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                {opt === "gift" ? "Send As Gift" : "Buy For Self"}
              </label>
            ))}
          </div>
        </section>

        {/* Delivery Date */}
        <section ref={(el) => (formSectionsRef.current[2] = el)}>
          <h3 className="font-semibold mb-2">Pick a Delivery Date</h3>
          <div className="flex gap-6 mb-6">
            {["today", "later"].map((date) => (
              <label key={date} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryDate"
                  value={date}
                  checked={deliveryDate === date}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
                {date === "today" ? "Today" : "Send Later"}
              </label>
            ))}
          </div>
        </section>

        {/* Delivery Mode */}
        <section ref={(el) => (formSectionsRef.current[3] = el)}>
          <h3 className="font-semibold mb-2">Mode of Delivery</h3>
          <div className="flex gap-6 mb-10">
            {["email", "sms", "both"].map((mode) => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryMode"
                  value={mode}
                  checked={deliveryMode === mode}
                  onChange={(e) => setDeliveryMode(e.target.value)}
                />
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </label>
            ))}
          </div>
        </section>

        {/* Theme */}
        <section ref={(el) => (formSectionsRef.current[4] = el)} className="text-center mb-10">
          <h3 className="font-semibold mb-4">Select EGV Design Theme</h3>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGy9ovx01jE5-R4jsLlZH2TW0IqVY5JWRR2A&s"
            alt="Gift"
            className="mx-auto w-32 h-32 object-contain rounded-lg shadow-md scale-[3] hover:scale-[3.1] transition-transform duration-300"
          />
        </section>

        {/* Sender & Receiver Details */}
        <section ref={(el) => (formSectionsRef.current[5] = el)} className="grid md:grid-cols-2 gap-8 mb-10">
          <div >
            <h3 className="font-semibold mb-3">Sender's Details</h3>
            <input type="text" placeholder="First Name" className="border w-full rounded-md px-4 py-2 mb-3 " />
            <input type="text" placeholder="Last Name" className="border w-full rounded-md px-4 py-2 mb-3 " />
            <input type="email" placeholder="Email Address" className="border w-full rounded-md px-4 py-2 mb-3 " />
            <input type="tel" placeholder="Mobile Number" className="border w-full rounded-md px-4 py-2 " />
          </div>

          <div>
            <h3 className="font-semibold mb-3">Receiver's Details</h3>
            <input type="text" placeholder="First Name" className="border w-full rounded-md px-4 py-2 mb-3 " />
            <input type="text" placeholder="Last Name" className="border w-full rounded-md px-4 py-2 mb-3 " />
            <input type="email" placeholder="Email Address" className="border w-full rounded-md px-4 py-2 mb-3 " />
            <textarea placeholder="Write a Message (optional)" className="border w-full rounded-md px-4 py-2 h-20 "></textarea>
          </div>
        </section>

        {/* Buttons */}
        <section ref={buttonRef} className="text-center mb-10">
          <button className="border border-red-500 text-red-500 px-6 py-2 rounded-md hover:bg-red-50 hover:text-black transition">
            PREVIEW E-GIFT CARD
          </button>
        </section>

        {/* Payment Section */}
        <section ref={(el) => (formSectionsRef.current[6] = el)} className="border-t border-gray-700 pt-6 mb-10">
          <h3 className="text-center text-lg font-semibold mb-4">Select Payment Method</h3>
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />
              <span className="text-sm">
                I agree to the{" "}
                <span className="text-red-400 cursor-pointer hover:underline">
                  Terms and Conditions
                </span>
              </span>
            </label>
            <p className="font-semibold text-gray-200">Payable Amount: ₹{amount || 0}.00</p>
          </div>

          <div className="text-center mt-6">
            <button
              className={`${
                agreeTerms ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
              } text-white px-8 py-3 rounded-lg transition`}
              disabled={!agreeTerms}
            >
              PAY NOW
            </button>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section ref={(el) => (formSectionsRef.current[7] = el)} className="border-t border-gray-700 pt-6 text-gray-300 text-sm leading-6">
          <h3 className="text-center text-lg font-semibold mb-4">Terms & Conditions</h3>
          <ul className="list-disc pl-6 max-w-3xl mx-auto text-left space-y-2">
            <li>E-Gift Voucher is valid for 12 months from the date of purchase/activation.</li>
            <li>Protect your E-Gift Voucher number and PIN to avoid misuse.</li>
            <li>Voucher can be redeemed for merchandise at Zudio stores only.</li>
            <li>Cannot be redeemed for cash, credit, or refunds.</li>
            <li>Partial redemption is allowed within validity.</li>
            <li>Redeemable only in India and subject to Zudio’s policies.</li>
            <li>For support, visit Zudio Help Center or nearest store.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default GiftCardPage;
