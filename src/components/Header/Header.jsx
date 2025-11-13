import { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import betswizIcon from "../../assets/cricketmenuicon.png";
import newIcon from "../../assets/new_icon.png";
import CricketLogo from "../../assets/cricketmenu.webp";
import CricketLogoTwo from "../../assets/cricketmenuTwo.webp";

import livecasinoLogo1 from "../../assets/livecasino1.webp";
import livecasinoLogo2 from "../../assets/laivecasino2.webp";
import livecasinoLogo3 from "../../assets/livecasino3.webp";
import livecasinoLogo4 from "../../assets/livecasino4.webp";
import livecasinoLogo5 from "../../assets/livecasino5.webp";
import livecasinoLogo6 from "../../assets/livecasino6.webp";
import livecasinoLogo7 from "../../assets/livecasino7.webp";

import slotLogo1 from "../../assets/slotlogo1.webp";
import slotLogo2 from "../../assets/slotlogo2.webp";
import slotLogo3 from "../../assets/slotlogo3.webp";
import slotLogo4 from "../../assets/slotlogo4.webp";
import slotLogo5 from "../../assets/slotlogo5.webp";
import slotLogo6 from "../../assets/slotlogo6.webp";
import slotLogo7 from "../../assets/slotlogo7.webp";
import slotLogo8 from "../../assets/slotlogo8.webp";
import slotLogo9 from "../../assets/slotlogo9.webp";
import slotLogo10 from "../../assets/slotlogo10.webp";
import slotLogo11 from "../../assets/slotlogo11.webp";
import slotLogo12 from "../../assets/slotlogo12.webp";

import tableLogo1 from "../../assets/slotlotterylogo.webp";
import tableLogo2 from "../../assets/tablelogo2.webp";
import tableLogo3 from "../../assets/tablelogo3.webp";
import tableLogo4 from "../../assets/tablelogo4.webp";
import tableLogo5 from "../../assets/tablelogo5.webp";

import sportsmenuLogo from "../../assets/sportsmenulogo.webp";
import crashmenuLogo1 from "../../assets/crash new spribe.webp";

import crashmenuLogo2 from "../../assets/crashmenulogo2.webp";
import crashmenuLogo3 from "../../assets/crashmenulogo3.webp";
import crashmenuLogo4 from "../../assets/crashmenulogo4.webp";
import crashmenuLogo5 from "../../assets/crashmenulogo5.webp";
import crashmenuLogo6 from "../../assets/crashmenulogo6.webp";
import crashmenuLogo7 from "../../assets/crashmenulogo7.webp";

import fishingLogo1 from "../../assets/fishingLogo1.webp";
import fishingLogo2 from "../../assets/fishingLogo2.webp";

import homeLogo from "../../assets/home.png";
import cricketLogo from "../../assets/cricket.png";
import livecasinoLogo from "../../assets/liveCasino.png";
import slotLogo from "../../assets/seven.png";
import tablegameLogo from "../../assets/table.png";
import sportsLogo from "../../assets/sports.png";
import fishingLogo from "../../assets/fishing.png";
// import lotteryLogo from "../../assets/lottery.png";
import crashLogo from "../../assets/crash.png";
import promotionLogo from "../../assets/promo.png";
import vipLogo from "../../assets/vip.png";
import jayarankLogo from "../../assets/jaya.png";

import TopHeader from "./TopHeader";
import LargeNavbar from "./LargeNavbar";
import BDTModal from "../BDTModal/BDTModal";
import Smallbars from "./Smallbars";

import { LanguageContext } from "../../Context/LanguageContext";
import BottomNavbarTwo from "./BottomNavbarTwo";
import { useOutletContext } from "react-router-dom";

const Header = ({ isModal, isOpenModal, setIsOpenModal }) => {
  const { translations, language, setLanguage } = useContext(LanguageContext);
  const { siteSettings } = useOutletContext() || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const [amount, setAmount] = useState(0);
  const [isReloading, setIsReloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef(null);

  const handleClick = () => {
    if (amount === 0) {
      setAmount(20);
      setIsReloading(true);
      console.log("Reloading started:", isReloading);
    } else {
      setAmount(0);
      setIsReloading(false);
    }
  };

  const toggleOpenLanguage = () => {
    setIsOpenLanguage(true);
  };

  const toggleCloseLanguage = () => {
    setIsOpenLanguage(false);
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const menuItems = [
    { name: translations.header?.home || "বাড়ি", path: "/", icon: homeLogo },
    {
      name: translations.header?.slot || "স্লট ",
      path: "/slotgames",
      icon: slotLogo,
      mainIcons: [
        { id: 1, name: "PG Soft", nameLogo: betswizIcon, mIcon: slotLogo1 },
        { id: 2, name: "JILLI", nameLogo: betswizIcon, mIcon: slotLogo2 },
        { id: 3, name: "Boongo", nameLogo: betswizIcon, mIcon: slotLogo3 },
        {
          id: 4,
          name: "Spade Gaming",
          nameLogo: betswizIcon,
          mIcon: slotLogo4,
        },
        { id: 5, name: "PlayTech", nameLogo: betswizIcon, mIcon: slotLogo5 },
        {
          id: 6,
          name: "Pragmatic Play",
          nameLogo: betswizIcon,
          mIcon: slotLogo6,
        },
        { id: 7, name: "JDB", nameLogo: betswizIcon, mIcon: slotLogo7 },
        { id: 8, name: "Habanero", nameLogo: betswizIcon, mIcon: slotLogo8 },
        { id: 9, name: "One Slot", nameLogo: betswizIcon, mIcon: slotLogo9 },
        { id: 9, name: "Play N' go", nameLogo: betswizIcon, mIcon: slotLogo10 },
        { id: 9, name: "NetEnt", nameLogo: betswizIcon, mIcon: slotLogo11 },
        {
          id: 9,
          name: "Relax Gaming",
          nameLogo: betswizIcon,
          mIcon: slotLogo12,
        },
      ],
    },
    {
      name: translations.header?.livecasino || "লাইভ ক্যাসিনো",
      path: "/livecasino",
      icon: livecasinoLogo,
      mainIcons: [
        {
          id: 1,
          name: "Evolution Gaming",
          nameLogo: betswizIcon,
          mIcon: livecasinoLogo1,
        },
        {
          id: 2,
          name: "Pragmatic Play",
          nameLogo: betswizIcon,
          mIcon: livecasinoLogo2,
        },
        {
          id: 3,
          name: "AE Casino",
          nameLogo: betswizIcon,
          mIcon: livecasinoLogo3,
        },
        {
          id: 4,
          name: "PlayTech",
          nameLogo: betswizIcon,
          mIcon: livecasinoLogo4,
        },
        {
          id: 5,
          name: "Pragmatic Play",
          nameLogo: betswizIcon,
          mIcon: livecasinoLogo5,
        },
        {
          id: 6,
          name: "Royal Gaming",
          nameLogo: betswizIcon,
          mIcon: livecasinoLogo6,
        },
        {
          id: 7,
          name: "Aura Gaming",
          nameLogo: betswizIcon,
          mIcon: livecasinoLogo7,
        },
      ],
    },
    {
      name: translations.header?.cricket || "ক্রিকেট",
      path: "/cricket",
      icon: cricketLogo,
      mainIcons: [
        { id: 1, name: "Betswiz", nameLogo: betswizIcon, mIcon: CricketLogo },
        {
          id: 2,
          name: "Dream Exchange",
          nameLogo: betswizIcon,
          mIcon: CricketLogoTwo,
        },
      ],
    },
    {
      name: translations.header?.crash || "ক্র্যাশ",
      path: "/crash",
      icon: crashLogo,
      mainIcons: [
        { id: 1, name: "SPRIBE", nameLogo: newIcon, mIcon: crashmenuLogo1 },
        {
          id: 2,
          name: "Aviatrix",
          nameLogo: betswizIcon,
          mIcon: crashmenuLogo2,
        },
        { id: 3, name: "JILI", nameLogo: betswizIcon, mIcon: crashmenuLogo3 },
        {
          id: 4,
          name: "BetSolution",
          nameLogo: betswizIcon,
          mIcon: crashmenuLogo4,
        },
        {
          id: 5,
          name: "Pragmatic Play",
          nameLogo: betswizIcon,
          mIcon: crashmenuLogo5,
        },
        { id: 6, name: "JDB", nameLogo: betswizIcon, mIcon: crashmenuLogo6 },
        {
          id: 7,
          name: "Smart Soft",
          nameLogo: betswizIcon,
          mIcon: crashmenuLogo7,
        },
      ],
    },
    {
      name: translations.header?.tablegames || "টেবিল গেম",
      path: "/tablegames",
      icon: tablegameLogo,
      mainIcons: [
        { id: 1, name: "JILI", nameLogo: newIcon, mIcon: tableLogo1 },
        { id: 2, name: "King Maker", nameLogo: betswizIcon, mIcon: tableLogo2 },
        { id: 3, name: "JILI", nameLogo: betswizIcon, mIcon: tableLogo3 },
        { id: 4, name: "JDB", nameLogo: betswizIcon, mIcon: tableLogo4 },
        { id: 5, name: "Play N'Go", nameLogo: betswizIcon, mIcon: tableLogo5 },
      ],
    },
    {
      name: translations.header?.sports || "স্পোর্টস",
      path: "/sports",
      icon: sportsLogo,
      mainIcons: [
        {
          id: 1,
          name: "IBC Sports",
          nameLogo: betswizIcon,
          mIcon: sportsmenuLogo,
        },
      ],
    },
    {
      name: translations.header?.fishing || "মাছ ধরা",
      path: "/machdhora",
      icon: fishingLogo,
      mainIcons: [
        { id: 1, name: "JILI", nameLogo: betswizIcon, mIcon: fishingLogo1 },
        { id: 2, name: "TITO", nameLogo: betswizIcon, mIcon: fishingLogo2 },
      ],
    },
    {
      name: translations.header?.promotion || "প্রমোশন",
      path: "/promotion",
      icon: promotionLogo,
    },
    {
      name: translations.header?.VIP || "ভিআইপি",
      path: "/vip",
      icon: vipLogo,
    },
    {
      name: translations.header?.jayarank || "K88 Pass",
      path: "/jayarank",
      icon: jayarankLogo,
      extra: (
        <span className="px-1 py-1 bg-green-600 rounded-lg text-white font-bold text-xs">
          New
        </span>
      ),
    },
  ];

  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 bg-white shadow-md font-sans z-40 ${
        isModal ? "sticky top-16" : "sticky top-0"
      }`}
    >
      <TopHeader
        amount={amount}
        handleClick={handleClick}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        toggleOpenLanguage={toggleOpenLanguage}
        toggleCloseLanguage={toggleCloseLanguage}
        toggleLanguage={toggleLanguage}
        isOpenLanguage={isOpenLanguage}
        language={language}
        setLanguage={setLanguage}
        siteSettings={siteSettings}
      />

      {/* <BottomNavbarOne /> */}
      <BottomNavbarTwo
        toggleOpenLanguage={toggleOpenLanguage}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isOpenLanguage={isOpenLanguage}
        toggleCloseLanguage
      />

      <nav
        className="text-white"
        style={{ backgroundColor: siteSettings?.webMenu?.bgColor || "#012b2b" }}
      >
        <LargeNavbar
          location={location}
          menuItems={menuItems}
          siteSettings={siteSettings}
        />

        <Smallbars
          location={location}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          menuRef={menuRef}
          menuItems={menuItems}
          language={language}
          toggleOpenLanguage={toggleOpenLanguage}
        />
        <BDTModal
          isOpenLanguage={isOpenLanguage}
          toggleCloseLanguage={toggleCloseLanguage}
          currentLang={language}
          toggleLanguage={toggleLanguage}
          setLanguage={setLanguage} // ✅ Pass this function
        />
      </nav>
    </header>
  );
};

export default Header;
