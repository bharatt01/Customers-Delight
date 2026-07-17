import React from "react";
import heroVideo from "../../assets/work.mp4";

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      
      {/* 🎥 Background Video */}
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-videoZoom"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />

      {/* Soft Glow Lights */}
      <div className="absolute top-32 left-10 w-60 h-60 bg-orange-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-400/20 blur-[120px] rounded-full" />

      {/* ✨ HERO TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-snug drop-shadow-2xl animate-fadeUp max-w-5xl">
          Guranteed{" "}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
            Growth
          </span>
          <br />
          For Small{" "}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
            Retailers
          </span>{" "}
          
        </h1>

    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl drop-shadow-md animate-fadeUp delay-200">
  Turn your local store/shop into a thriving business with
  <span className="text-orange-300 font-semibold"> smarter selling, wider reach and consistent consistent growth.</span>
</p>

      </div>
    </div>
  );
};

export default HeroSection;
