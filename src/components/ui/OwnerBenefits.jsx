import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCw } from "lucide-react";

import loyal from "..//../assets/loyal.jpg";
import card from "..//../assets/card.jpg";
import trade from "..//../assets/trade.jpg";
import rewards from "..//../assets/rewards.jpg";
import cashback from "..//../assets/cashback.jpg";
import marketing from "..//../assets/marketing.jpg";

const services = [
  { title: "Consumer Rewards Program", image: loyal, link: "/services/rewards", text: "Rewards tailored for you" },
  { title: "Affinity Programs", image: card, link: "/services/affinity", text: "Stronger consumer connections" },
  { title: "Social Media Marketing", image: marketing, link: "/services/social", text: "Grow your brand reach" },
  { title: "Consumer Loyalty", image: rewards, link: "/services/loyalty", text: "Keep your customers coming back" },
  { title: "CashBack Programs", image: cashback, link: "/services/cashback", text: "Save and earn rewards" },
  { title: "Trade Loyalty Programs", image: trade, link: "/services/trade", text: "Partner loyalty made easy" },
];

const Services = () => {
  const navigate = useNavigate();
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => setFlippedIndex(null);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-900">
          <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
            Our Services
          </span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {/* Render first four cards */}
          {services.slice(0, 4).map((s, i) => {
            const isFlipped = flippedIndex === i;
            return (
              <div
                key={i}
                className="flip-card"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setFlippedIndex(isFlipped ? null : i);
                  } else {
                    navigate(s.link);
                  }
                }}
                onMouseLeave={() => setFlippedIndex(null)}
                aria-label={`Service card for ${s.title}`}
              >
                <div className="flip-inner" style={{ transform: isFlipped ? "rotateY(180deg)" : undefined }}>
                  {/* FRONT */}
                  <div className="flip-front relative group">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* White translucent text overlay, centered */}
                    <div className="absolute inset-x-6 top-1/3 bg-white/80 rounded-xl py-4 px-6 mx-auto max-w-[80%] text-center text-gray-900 font-semibold text-lg drop-shadow-md pointer-events-none transition-opacity duration-700 ease-in-out group-hover:opacity-100 opacity-90 animate-fadeUpSlow">
                      {s.text}
                    </div>
                    {/* Flip hint */}
                    <div
                      className="absolute bottom-6 left-6 bg-orange-400/90 text-white rounded-full px-4 py-1 flex items-center gap-2 text-sm font-semibold animate-pulse cursor-default select-none"
                      title="Hover or Tap to Flip"
                    >
                      <RotateCw size={16} className="animate-spin-slow" />
                      Flip Me
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="flip-back">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{s.title}</h3>
                    <button
                      className="px-7 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(s.link);
                      }}
                      aria-label={`View details of ${s.title}`}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Combined last two cards as one card */}
          <div
            className="flip-card md:col-span-2 rounded-3xl shadow-lg overflow-hidden cursor-pointer relative"
            onClick={() => {
              if (window.innerWidth < 768) {
                setFlippedIndex(flippedIndex === 4 ? null : 4);
              } else {
                navigate(services[4].link);
              }
            }}
            onMouseLeave={() => setFlippedIndex(null)}
            aria-label={`Service card for ${services[4].title} and ${services[5].title}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(services[4].link);
            }}
          >
            <div className="flip-inner" style={{ transform: flippedIndex === 4 ? "rotateY(180deg)" : undefined }}>
              {/* FRONT */}
              <div className="flip-front relative group">
                {/* Single combined image */}
                <img
                  src={cashback}
                  alt={`${services[4].title} & ${services[5].title}`}
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Combined text overlay */}
                <div className="absolute inset-x-6 top-1/3 bg-white/80 rounded-xl py-4 px-6 mx-auto max-w-[80%] text-center text-gray-900 font-semibold text-lg drop-shadow-md pointer-events-none transition-opacity duration-700 ease-in-out group-hover:opacity-100 opacity-90 animate-fadeUpSlow">
                  {`${services[4].text} & ${services[5].text}`}
                </div>
                {/* Flip hint */}
                <div
                  className="absolute bottom-6 left-6 bg-orange-400/90 text-white rounded-full px-4 py-1 flex items-center gap-2 text-sm font-semibold animate-pulse cursor-default select-none"
                  title="Hover or Tap to Flip"
                >
                  <RotateCw size={16} className="animate-spin-slow" />
                  Flip Me
                </div>
              </div>

              {/* BACK */}
              <div className="flip-back flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-orange-300">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  {services[4].title} &amp; {services[5].title}
                </h3>
                {/* Single combined button */}
                <button
                  className="px-10 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(services[4].link);
                  }}
                  aria-label={`View details of ${services[4].title} & ${services[5].title}`}
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .flip-card {
          width: 100%;
          height: 360px;
          perspective: 1200px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.9s ease;
          will-change: transform;
          border-radius: 1.5rem;
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
        }
        /* Hover flip on desktop */
        @media (hover: hover) and (pointer: fine) {
          .flip-card:hover .flip-inner {
            transform: rotateY(180deg);
          }
        }
        .flip-front,
        .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1.5rem;
          overflow: hidden;
        }
        .flip-front img {
          transition: transform 0.5s ease;
        }
        /* Scale image on hover */
        @media (hover: hover) and (pointer: fine) {
          .flip-card:hover .flip-front img {
            transform: scale(1.07);
          }
        }
        .flip-back {
          transform: rotateY(180deg);
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 24px;
          border: 2px solid rgba(255,165,0,0.3);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        @keyframes fadeUpSlow {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUpSlow {
          animation: fadeUpSlow 1.2s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Services;
