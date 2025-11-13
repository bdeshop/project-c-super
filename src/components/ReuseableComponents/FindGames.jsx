import { useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext";

const FindGames = () => {
  const { language } = useContext(LanguageContext);

  // ভাষার ভিত্তিতে টেক্সট সেট করা
  const text = {
    searchPlaceholder: language === "bn" ? "খেলা অনুসন্ধান করুন" : "Search games",
    sexy: language === "bn" ? "এই সেক্সি বাক্কারাট" : "Ae Sexy Baccarat",
    Live: language === "bn" ? "লাইভ লবি" : "Live Lobby",
    Top: language === "bn" ? "শীর্ষ খেলার লবি" : "Top Games Lobby",
    Popular: language === "bn" ? "জনপ্রিয় লবি" : "Popular Lobby",
    Wheel: language === "bn" ? "মেগা হুইল" : "Mega Wheel",
    Lotus: language === "bn" ? "লোটাস রুলেট" : "Lotus Roulette",
  };
  

  return (
    <div className="flex flex-row items-center py-2 bg-bg-Secondary px-4 pt-4 ">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 105.293 14.707l4.387 4.387a1 1 0 001.414-1.414l-4.387-4.387A8 8 0 0010 2zm-6 8a6 6 0 1112 0 6 6 0 01-12 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <select className="shadow-2xl rounded-md text-gray-600 font-medium p-2  border border-black md:w-[500px] w-full outline-none ">
          <option value="" disabled selected>
            {text.searchPlaceholder}
          </option>
          <option value="sexy">{text.sexy}</option>
          <option value="live">{text.Live}</option>
          <option value="top">{text.Top}</option>
          <option value="popular">{text.Popular}</option>
          <option value="wheel">{text.Wheel}</option>
          <option value="lotus">{text.Lotus}</option>
        </select>
      </div>
    </div>
  );
};

export default FindGames;
