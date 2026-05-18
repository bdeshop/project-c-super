import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import vipCardImage from "../../assets/vipcard_asset.png";
import Image1 from "../../assets/bronze.png";
import Image2 from "../../assets/silver.png";
import Image3 from "../../assets/ruby.png";
import Image4 from "../../assets/gold.png";
import Image5 from "../../assets/diamond.png";
import Image6 from "../../assets/sapphire.png";
import Image7 from "../../assets/platinum.png";
import ImageA from "../../assets/bronze_vip.png";
import ImageB from "../../assets/silver_vip.png";
import ImageC from "../../assets/ruby_vip.png";
import ImageD from "../../assets/gold_vip.png";
import ImageE from "../../assets/diamond_vip.png";
import ImageF from "../../assets/sapphire_vip.png";
import ImageG from "../../assets/platinum_vip.png";
import { useState } from "react";
import { API_BASE_URL } from "../../config/constants";

const CurrentVip = ({ levels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackBadges = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];
  const fallbackPrivileges = [
    { image: ImageA, name: "Level 1  Bronze" },
    { image: ImageB, name: "Level 2  Silver" },
    { image: ImageC, name: "Level 3  Ruby" },
    { image: ImageD, name: "Level 4  Gold" },
    { image: ImageE, name: "Level 5  Diamond" },
    { image: ImageF, name: "Level 6  Sapphire" },
    { image: ImageG, name: "Level 7  Platinum" }
  ];

  // Resolve Badge Images dynamically with fallback
  const badgeImages = levels && levels.length > 0
    ? levels.map((l, i) => {
        if (l.badgeImage) {
          return l.badgeImage.startsWith("http") ? l.badgeImage : `${API_BASE_URL}${l.badgeImage}`;
        }
        return fallbackBadges[i % fallbackBadges.length];
      })
    : fallbackBadges;

  // Resolve Privilege Images and Names dynamically with fallback
  const privilegeItems = levels && levels.length > 0
    ? levels.map((l, i) => {
        let imageSrc = fallbackPrivileges[i % fallbackPrivileges.length].image;
        if (l.privilegeImage) {
          imageSrc = l.privilegeImage.startsWith("http") ? l.privilegeImage : `${API_BASE_URL}${l.privilegeImage}`;
        }
        return {
          image: imageSrc,
          name: `Level ${l.levelNumber}  ${l.name}`
        };
      })
    : fallbackPrivileges;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + privilegeItems.length) % privilegeItems.length);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % privilegeItems.length);
  };

  return (
    <div className="mx-auto max-w-4xl md:px-6 lg:px-0">
      {/* Current status */}
      <div className="flex gap-4 items-center">
        <img src={vipCardImage} alt="VIP Card" className="w-[30%] hidden lg:block" />
        <div className="text-white px-2 lg:px-0 lg:w-[70%]">
          <h3 className="pb-3 text-sm font-semibold">Current status</h3>
          <p className="w-full h-[8px] bg-common-orange rounded-full mb-3"></p>
          <div className="flex justify-between items-center w-full">
            {badgeImages.map((image, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <p className="text-xs text-slate-500">|</p>
                <img 
                  src={image} 
                  alt={`Level Badge`} 
                  className="w-10 h-10 object-contain hover:scale-110 transition-all duration-300 mt-1" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block mt-12 mb-8">
        <hr className="border-slate-800" />
      </div>

      {/* VIP PRIVILEGES */}
      <div className="py-4 mt-8 px-2 lg:px-0 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-16 text-white">
        <div className="min-w-[150px]">
          <h3 className="whitespace-nowrap text-xs lg:text-base text-textPrimary font-bold">VIP PRIVILEGES</h3>
          <p className="lg:hidden text-sm py-2 font-semibold text-common-orange">
            {privilegeItems[currentIndex]?.name.toUpperCase()}
          </p>
        </div>

        {/* Desktop View Cards Grid */}
        <div className="lg:flex hidden gap-3 overflow-x-auto py-2">
          {privilegeItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-slate-900/30 p-2 rounded-xl border border-slate-800/40 hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-16 object-contain rounded" 
              />
              <span className="text-[10px] mt-1 text-slate-400 font-semibold whitespace-nowrap">
                {item.name.split("  ")[1] || item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile Slider View */}
        <div className="lg:hidden flex items-center justify-between gap-4 mt-2 px-4 py-3 bg-slate-900/20 rounded-2xl border border-slate-800/50">
          <button 
            onClick={handlePrev} 
            className="p-3 bg-slate-950/60 rounded-full border border-slate-800 hover:bg-slate-800 text-white transition-all"
            aria-label="Previous Privilege"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          
          <div className="flex flex-col items-center flex-1 py-1">
            <img 
              src={privilegeItems[currentIndex]?.image} 
              alt="VIP Privilege Card" 
              className="max-h-[140px] w-auto object-contain rounded-lg drop-shadow-[0_4px_12px_rgba(168,85,247,0.15)] animate-fade-in" 
            />
          </div>
          
          <button 
            onClick={handleNext} 
            className="p-3 bg-slate-950/60 rounded-full border border-slate-800 hover:bg-slate-800 text-white transition-all"
            aria-label="Next Privilege"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentVip;
