import { Link } from "react-router-dom";
import Jayalogo from "../../assets/logo3.png";
import BdLogo from "../../assets/BD.png";
import LiveLogo from "../../assets/live.png";
import referIcon from "../../assets/refer.png";
import affiliateIcon from "../../assets/affiliate.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { useState } from "react";

const Smallbars = ({
  isOpen,
  setIsOpen,
  location,
  language,
  menuRef,
  dynamicMenuItems,
  staticMenuItems,
  toggleOpenLanguage,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const options = [
    {
      img: BdLogo,
      textBn: "ভাষা",
      textEn: "Language",
      onClick: toggleOpenLanguage,
    },
    {
      img: LiveLogo,
      textBn: "সরাসরি কথোপকথন",
      textEn: "24/7 live chat",
      onClick: toggleOpenLanguage,
    },
  ];

  const menuDataTwo = [
    {
      to: "/manual-one",
      icon: referIcon,
      alt: "Manual One",
      enLabel: "Referral",
      bnLabel: "সুপারিশ",
    },
    {
      to: "/manual-two",
      icon: affiliateIcon,
      alt: "Manual Two",
      enLabel: "Agent Affiliate",
      bnLabel: "এজেন্ট অধিভুক্ত",
    },
  ];

  return (
    <div>
      {/* Small & Medium Screen - Menu Button */}
      <div className="lg:hidden absolute top-0 left-0 flex items-center px-4 py-2">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="white"
          >
            <path
              d="M3 6h18M3 12h18m-18 6h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Menu (Small & Medium Screen) */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full overflow-y-auto pb-4 w-full text-white bg-black shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="bg-black flex justify-around">
          <button onClick={() => setIsOpen(false)} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="white"
            >
              <path
                d="M3 6h18M3 12h18m-18 6h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <img src={Jayalogo} alt="" className="h-8 lg:h-12" />
          <button onClick={() => setIsOpen(false)} className="text-white">
            <FaLongArrowAltRight />
          </button>
        </div>

        {/* Static Menu Items */}
        <div>
          <ul className="flex flex-col p-4 gap-2">
            {staticMenuItems.map((item, index) => (
              <Link key={index} to={item.path} onClick={() => setIsOpen(false)}>
                <ul className="flex items-center p-2 justify-between">
                  <li className="flex gap-2 justify-center whitespace-nowrap items-center text-center">
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-6 h-6"
                      />
                    )}
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.extra}
                  </li>
                  <li>
                    <FaAngleRight className="w-6 h-6 p-1 text-black rounded-full bg-white bg-opacity-80" />
                  </li>
                </ul>
              </Link>
            ))}
            {/* Quick Links */}
            {menuDataTwo.map((item, index) => (
              <Link key={index} to={item.to} onClick={() => setIsOpen(false)}>
                <ul className="flex items-center p-2 justify-between">
                  <li className="flex gap-2 justify-center whitespace-nowrap items-center text-center">
                    <img src={item.icon} alt={item.alt} className="w-6 h-6" />
                    <span className="text-sm font-medium">
                      {language === "en" ? item.enLabel : item.bnLabel}
                    </span>
                  </li>
                  <li>
                    <FaAngleRight className="w-6 h-6 p-1 text-black rounded-full bg-white bg-opacity-80" />
                  </li>
                </ul>
              </Link>
            ))}
          </ul>
        </div>

        {/* Dynamic Game Categories Grid */}
        <div>
          <h3 className="text-sm font-semibold px-4 py-2 text-gray-300">
            {language === "en" ? "Game Categories" : "গেম ক্যাটাগরি"}
          </h3>
          <ul className="grid grid-cols-3 px-2 gap-2">
            {dynamicMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path || "#"}
                onClick={() => setIsOpen(false)}
              >
                <li
                  className={`flex flex-col p-2 gap-1 w-full justify-center whitespace-nowrap items-center ${
                    location.pathname === item.path
                      ? "bg-white bg-opacity-20"
                      : "hover:bg-white hover:bg-opacity-20"
                  } text-center`}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>

          {/* Expandable Providers Section */}
          {dynamicMenuItems.length > 0 && (
            <div className="px-4 py-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold mb-3 text-gray-300">
                {language === "en" ? "Providers" : "প্রদানকারী"}
              </h3>
              <ul className="flex flex-col gap-2">
                {dynamicMenuItems.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category._id
                            ? null
                            : category._id,
                        )
                      }
                      className="w-full flex items-center justify-between p-2 hover:bg-white hover:bg-opacity-10 rounded transition"
                    >
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <FaAngleRight
                        className={`w-4 h-4 transition-transform ${
                          expandedCategory === category._id ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* Providers for this category */}
                    {expandedCategory === category._id && (
                      <ul className="ml-4 mt-2 flex flex-col gap-1">
                        {category.mainIcons?.map((provider, pIndex) => (
                          <Link
                            key={pIndex}
                            to={`/games?provider=${provider.providerId}&category=${provider.categoryId}&providerName=${encodeURIComponent(provider.name)}`}
                            onClick={() => setIsOpen(false)}
                          >
                            <li className="text-xs p-2 hover:bg-white hover:bg-opacity-10 rounded transition">
                              {provider.name}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Language & Support Options */}
        <ul className="flex flex-col gap-2 p-4 border-t border-gray-700">
          {options.map((item, index) => (
            <li
              key={index}
              className="flex font-medium p-2 gap-3 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded transition"
              onClick={item.onClick}
            >
              <img src={item.img} alt="Option" className="w-6 h-6" />
              {language === "bn" ? item.textBn : item.textEn}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Smallbars;
