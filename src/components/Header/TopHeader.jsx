import { Link } from "react-router-dom";
import Jayalogo from "../../assets/logo3.png";
import Bdlogo from "../../assets/BDTHeader.svg";
import { isAuthenticated, logout } from "../../utils/auth";
import { useState, useEffect } from "react";

const TopHeader = ({
  amount,
  language,
  handleClick,
  isHovered,
  setIsHovered,
  toggleOpenLanguage,
  setIsOpenModal,
  siteSettings,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };

    checkAuthStatus();

    // Listen for storage changes (in case user logs in from another tab)
    window.addEventListener("storage", checkAuthStatus);

    // Listen for custom auth state changes (login/logout)
    window.addEventListener("authStateChanged", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authStateChanged", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false); // Update state immediately without refresh
    // Trigger custom event to notify other components about logout
    window.dispatchEvent(new CustomEvent("authStateChanged"));
  };

  const text = {
    en: {
      wallet: "Main Wallet",
      login: "Login",
      register: "Sign Up",
      deposit: "Deposit",
      profile: "Profile",
      logout: "Logout",
      currency: "BDT English",
    },
    bn: {
      wallet: "প্রধান ওয়ালেট",
      login: "প্রবেশ করুন",
      register: "নিবন্ধন",
      deposit: "আমানত",
      profile: "প্রোফাইল",
      logout: "লগআউট",
      currency: "BDT বাংলা",
    },
  };

  // Get dynamic logo and styles
  const logoSrc = siteSettings?.siteInfo?.logo || Jayalogo;
  const headerBgColor = siteSettings?.header?.bgColor || "#000000";
  const headerTextColor = siteSettings?.header?.textColor || "#ffffff";
  const logoWidth = siteSettings?.header?.logoWidth || "48px";
  const loginButtonBg = siteSettings?.header?.loginButtonBg || "#09bda2";
  const loginButtonTextColor =
    siteSettings?.header?.loginButtonTextColor || "#ffffff";
  const signupButtonBg = siteSettings?.header?.signupButtonBg || "#09bda2";

  return (
    <nav
      className="flex justify-center lg:justify-around items-center py-2"
      style={{
        backgroundColor: headerBgColor,
        color: headerTextColor,
      }}
    >
      <img
        src={logoSrc}
        alt="Logo"
        className="h-8 lg:h-12"
        style={{ width: logoWidth }}
      />

      <ul
        className="hidden lg:flex space-x-2 items-center text-white font-sans text-sm"
        style={{ maxWidth: "1400px" }}
      >
        <div className="flex flex-row gap-2 items-center">
          <h3 className="text-lg">{text[language].wallet}</h3>
          <span className="text-lg">
            ৳ {amount !== null ? amount.toFixed(2) : "*.*"}
          </span>

          <button onClick={handleClick}>
            <svg
              className={`transition-transform duration-300 ${
                isHovered ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                stroke={isHovered ? "#FFFFFF" : "#FFFFFF"}
                strokeWidth="1.5"
                d="M12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H6c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7z"
              />
            </svg>
          </button>
        </div>

        {/* <button
          onClick={() => setIsOpenModal(true)}
          className="border border-white px-4 py-2 hover:border-textPrimary outline-none rounded-sm text-white"
        >
          {text[language].login}
        </button>
        <ProbesKorun
          
        />
        <Link to="/nibondon">
          <button className="bg-common-orange px-8 py-2 rounded-sm">
            {text[language].register}
          </button>
        </Link> */}

        <Link to="/amanot">
          <button
            className="px-4 py-1 text-lg rounded-sm"
            style={{
              backgroundColor: loginButtonBg,
              color: loginButtonTextColor,
            }}
          >
            {text[language].deposit}
          </button>
        </Link>
        <Link to="/information">
          <button
            className="px-4 py-1 hover:border rounded-lg transition-all duration-300 ease-out text-lg"
            style={{
              color: headerTextColor,
              borderColor: siteSettings?.webMenu?.hoverColor || "#09bda2",
            }}
          >
            {text[language].profile}
          </button>
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-1 hover:border rounded-lg text-lg"
            style={{
              color: headerTextColor,
              borderColor: siteSettings?.webMenu?.hoverColor || "#09bda2",
            }}
          >
            {text[language].logout}
          </button>
        ) : (
          <button
            onClick={() => setIsOpenModal(true)}
            className="px-4 py-1 hover:border rounded-lg text-lg"
            style={{
              color: headerTextColor,
              borderColor: siteSettings?.webMenu?.hoverColor || "#09bda2",
            }}
          >
            {text[language].login}
          </button>
        )}

        <div>
          <span
            className="font-semibold text-lg flex items-center gap-0.5 hover:border px-2 py-1 rounded-lg cursor-pointer"
            onClick={toggleOpenLanguage}
            style={{
              color: headerTextColor,
              borderColor: siteSettings?.webMenu?.hoverColor || "#09bda2",
            }}
          >
            <span>
              <img src={Bdlogo} alt="BD Logo" className="w-4 h-4" />
            </span>
            {text[language].currency}
          </span>
        </div>
      </ul>
    </nav>
  );
};

export default TopHeader;
