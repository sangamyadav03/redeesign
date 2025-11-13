import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const StoreLocator = () => {
  const sectionRef = useRef(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const stateCityData = {
    Telangana: ["Hyderabad", "Adilabad", "Warangal"],
    "Tamil Nadu": ["Chennai", "Trichy", "Coimbatore"],
    Gujarat: ["Ahmedabad", "Ankleshwar", "Surat"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Delhi: ["Connaught Place", "Dwarka", "Saket"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
    Karnataka: ["Bengaluru", "Mysore", "Hubli"],
    Kerala: ["Kochi", "Trivandrum", "Calicut"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
  };

  const stores = [
    {
      name: "Zudio - Adilabad, Hyderabad",
      state: "Telangana",
      city: "Hyderabad",
      address:
        "Ramnagar Colony, Adilabad Main Road, Adilabad, Hyderabad - 504001, Telangana",
    },
    {
      name: "Zudio - BSR Mall, OMR Road",
      state: "Tamil Nadu",
      city: "Chennai",
      address:
        "378, Ground Floor, Near Starbucks BSR Mall, Rajiv Gandhi Salai Road, Thoraipakkam, Chennai - 600097, Tamil Nadu",
    },
    {
      name: "Zudio - Muthiah Towers, Trichy",
      state: "Tamil Nadu",
      city: "Trichy",
      address:
        "No 1, Muthiah Towers, Royal Road, Cantonment, Tiruchirappalli - 620001, Tamil Nadu",
    },
    {
      name: "Zudio - Saffron Arcade, Ankleshwar",
      state: "Gujarat",
      city: "Ankleshwar",
      address: "Main Road, Ankleshwar, Gujarat",
    },
    {
      name: "Zudio - Phoenix Marketcity, Mumbai",
      state: "Maharashtra",
      city: "Mumbai",
      address:
        "Phoenix Marketcity, LBS Road, Kurla West, Mumbai - 400070, Maharashtra",
    },
    {
      name: "Zudio - Seasons Mall, Pune",
      state: "Maharashtra",
      city: "Pune",
      address:
        "Ground Floor, Seasons Mall, Magarpatta City, Pune - 411013, Maharashtra",
    },
    {
      name: "Zudio - Gopalan Mall, Bengaluru",
      state: "Karnataka",
      city: "Bengaluru",
      address:
        "Gopalan Innovation Mall, Bannerghatta Road, Bengaluru - 560076, Karnataka",
    },
    {
      name: "Zudio - South Ex, Delhi",
      state: "Delhi",
      city: "Connaught Place",
      address:
        "D-Block, South Extension Part II, New Delhi - 110049, Delhi",
    },
    {
      name: "Zudio - Dwarka Sector 12, Delhi",
      state: "Delhi",
      city: "Dwarka",
      address: "Plot No. 3, Dwarka Sector 12, New Delhi - 110078, Delhi",
    },
    {
      name: "Zudio - C21 Mall, Indore",
      state: "Madhya Pradesh",
      city: "Indore",
      address:
        "C21 Mall, A.B. Road, Vijay Nagar, Indore - 452010, Madhya Pradesh",
    },
    {
      name: "Zudio - DB City Mall, Bhopal",
      state: "Madhya Pradesh",
      city: "Bhopal",
      address:
        "DB City Mall, Arera Hills, Bhopal - 462011, Madhya Pradesh",
    },
  ];

  const filteredStores = stores.filter((store) => {
    if (selectedState && selectedCity) {
      return store.state === selectedState && store.city === selectedCity;
    } else if (selectedState) {
      return store.state === selectedState;
    } else {
      return true;
    }
  });

  useEffect(() => {
    gsap.from(sectionRef.current.children, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, [filteredStores]);

  return (
    <div className="w-full min-h-screen bg-white text-gray-800 p-10">
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-1">›</span> Store Locator
      </div>

      <h1 className="text-2xl font-semibold tracking-wider mb-8">
        STORE LOCATOR
      </h1>

      <div className="bg-gray-100 p-8 rounded-md mb-10 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          FIND THE ZUDIO STORE CLOSEST TO YOU
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <select
            className="border border-gray-300 p-3 w-60 rounded-md"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
          >
            <option value="">Select State</option>
            {Object.keys(stateCityData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 p-3 w-60 rounded-md"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {selectedState &&
              stateCityData[selectedState].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-center text-xl font-semibold mb-6">
          ALL STORES ({filteredStores.length})
        </h2>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStores.map((store, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-md shadow-sm border border-gray-200"
            >
              <h3 className="font-semibold text-lg mb-2">{store.name}</h3>
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-bold">Address:</span> {store.address}
              </p>
              <button className="bg-black text-white text-sm font-semibold py-2 px-4 rounded hover:bg-gray-800 transition">
                MORE DETAILS »
              </button>
            </div>
          ))}
        </div>
      </div>

      
      {/* Footer Section */}
      <footer className="bg-black w-full mt-10 rounded-lg text-white py-8 px-6">
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

export default StoreLocator;
