import { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

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
import { useGameCategories } from "../../hooks/useGameCategories";

const Header = ({ isModal, isOpenModal, setIsOpenModal }) => {
  const { translations, language, setLanguage } = useContext(LanguageContext);
  const { siteSettings } = useOutletContext() || {};
  const { categories: gameCategories } = useGameCategories();
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

  // Build dynamic game categories menu only
  const dynamicMenuItems = gameCategories.map((category) => ({
    name: language === "en" ? category.nameEnglish : category.nameBangla,
    path: `/games?category=${category._id}`,
    categoryId: category._id,
    mainIcons: (category.providers || []).map((provider) => ({
      id: provider._id,
      name: provider.name,
      mIcon: provider.logo,
      providerId: provider._id,
      categoryId: category._id,
    })),
  }));

  // Static menu items (always shown)
  const staticMenuItems = [
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

      <BottomNavbarTwo
        toggleOpenLanguage={toggleOpenLanguage}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isOpenLanguage={isOpenLanguage}
        toggleCloseLanguage
      />

      <div
        className="text-white w-full"
        style={{
          backgroundColor: siteSettings?.webMenu?.bgColor || "#012b2b",
        }}
      >
        <nav className="mx-auto" style={{ maxWidth: "1400px" }}>
          <LargeNavbar
            location={location}
            dynamicMenuItems={dynamicMenuItems}
            staticMenuItems={staticMenuItems}
            siteSettings={siteSettings}
          />

          <Smallbars
            location={location}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            menuRef={menuRef}
            dynamicMenuItems={dynamicMenuItems}
            staticMenuItems={staticMenuItems}
            language={language}
            toggleOpenLanguage={toggleOpenLanguage}
          />
          <BDTModal
            isOpenLanguage={isOpenLanguage}
            toggleCloseLanguage={toggleCloseLanguage}
            currentLang={language}
            toggleLanguage={toggleLanguage}
            setLanguage={setLanguage}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
