import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../Context/LanguageContext";

// import Cricketlogo from "../../assets/cricketmenu.webp";
// import livecasinologo1 from "../../assets/livecasino1.webp";
// import livecasinologo2 from "../../assets/laivecasino2.webp";
// import livecasinologo3 from "../../assets/livecasino3.webp";
// import slotlogo1 from "../../assets/slotlogo1.webp";
// import slotlogo2 from "../../assets/slotlogo2.webp";
// import slotlogo3 from "../../assets/slotlogo3.webp";
// import slotlogo4 from "../../assets/slotlogo4.webp";
// import slotlogo5 from "../../assets/slotlogo5.webp";
// import slotlogo6 from "../../assets/slotlogo6.webp";
// import slotlogo7 from "../../assets/slotlogo7.webp";
// import slotlogo8 from "../../assets/slotlogo8.webp";
// import slotlogo9 from "../../assets/slotlogo9.webp";
// import tablelogo1 from "../../assets/slotlotterylogo.webp";
// import tablelogo2 from "../../assets/tablelogo2.webp";
// import tablelogo3 from "../../assets/tablelogo3.webp";
// import tablelogo4 from "../../assets/tablelogo4.webp";
// import tableelogo5 from "../../assets/tablelogo5.webp";
// import sportsmenulogo from "../../assets/sportsmenulogo.webp";
// import crashmenulogo1 from "../../assets/crash new spribe.webp";

// import crashmenulogo2 from "../../assets/crashmenulogo2.webp";
// import crashmenulogo3 from "../../assets/crashmenulogo3.webp";
// import crashmenulogo4 from "../../assets/crashmenulogo4.webp";
// import crashmenulogo5 from "../../assets/crashmenulogo5.webp";
// import crashmenulogo6 from "../../assets/crashmenulogo6.webp";
// import betswizicon from "../../assets/cricketmenuicon.png";
// import newicon from "../../assets/new_icon.png";

const LargeNavbar = ({ location, menuItems, siteSettings }) => {
  const { language } = useContext(LanguageContext);
  const navItems = [
    {
      path: "/promotion",
      labelEn: "Promotion",
      labelBn: "প্রমোশন",
    },
    {
      path: "/vip",
      labelEn: "VIP",
      labelBn: "ভিআইপি",
    },
  ];

  // Get dynamic styles
  const webMenuBgColor = siteSettings?.webMenu?.bgColor || "#012b2b";
  const webMenuTextColor = siteSettings?.webMenu?.textColor || "#ffffff";
  const webMenuFontSize = siteSettings?.webMenu?.fontSize || "15px";
  const webMenuHoverColor = siteSettings?.webMenu?.hoverColor || "#09bda2";
  const webMenuActiveColor = siteSettings?.webMenu?.activeColor || "#01aea1";

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: webMenuBgColor }}
    >
      <ul
        className="lg:flex hidden justify-center items-center whitespace-nowrap"
        style={{
          color: webMenuTextColor,
          fontSize: webMenuFontSize,
        }}
      >
        <Link to="/downloadmobileapp" className="">
          <li
            className={`border-r p-2 border-white border-opacity-20 transition ${
              location.pathname === "/downloadmobileapp"
                ? "border-b-2 border-yellow-300"
                : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="24"
              height="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <path d="M17 10l-5 5-5-5"></path>
              <path d="M12 15V3"></path>
            </svg>
          </li>
        </Link>
        {/* mainBars */}
        {menuItems.slice(0, 8).map((item, index) => {
          const isFirst = index === 0;

          return (
            <Link
              key={index}
              to={item.path}
              className="transition"
              style={{
                color: webMenuTextColor,
                ":hover": { color: webMenuHoverColor },
              }}
            >
              <li
                className={`inline-block ${
                  location.pathname === item.path
                    ? "border-b-2 border-r-[rgba(255,255,255,0.2)]"
                    : "border-r-[rgba(255,255,255,0.2)]"
                }`}
                style={{
                  borderBottomColor:
                    location.pathname === item.path
                      ? webMenuActiveColor
                      : "transparent",
                }}
              >
                <div className="group border-r border-white p-2 border-opacity-20">
                  {isFirst ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill={webMenuTextColor}
                      stroke={webMenuTextColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="inline"
                    >
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                  ) : (
                    <>
                      {item.name}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke={webMenuTextColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline ml-2"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </>
                  )}

                  <div className="absolute  left-0 right-0 mt-2 bg-black w-full  bg-opacity-70 text-black  rounded-md shadow-xl opacity-0 invisible transform scale-y-0 origin-top transition-all duration-700 ease-out group-hover:opacity-100 group-hover:visible group-hover:scale-y-100">
                    <div
                      className="w-full overflow-hidden"
                      style={{ backgroundColor: `${webMenuHoverColor}30` }}
                    >
                      <ul className="flex flex-wrap gap-4 mx-auto max-w-6xl">
                        {item.mainIcons?.map((mainIcon, subIndex) => (
                          <li key={subIndex} className="w-[15%] ">
                            {/* ✅ icon এর জায়গায় mainIcon এর mIcon */}
                            <img
                              src={mainIcon.mIcon}
                              alt={mainIcon.name}
                              className="w-[80%] h-[160px]   rounded-md border-black  object-contain filter grayscale hover:filter-none transition-all duration-300"
                            />
                            <div className="flex  pt-2 w-[80%] flex-row items-center justify-center">
                              <h3
                                className="font-bold"
                                style={{ color: webMenuTextColor }}
                              >
                                {mainIcon.name}
                              </h3>

                              <img
                                src={mainIcon.nameLogo}
                                alt={mainIcon.name}
                                className="w-5 h-5"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </li>
            </Link>
          );
        })}
        {/* lastBars */}
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="transition"
            style={{
              color: webMenuTextColor,
              ":hover": { color: webMenuHoverColor },
            }}
          >
            <li
              className={`flex font-semibold items-center p-2 gap-1 ${
                location.pathname === item.path
                  ? "border-b-2 border-r-[rgba(255,255,255,0.2)]"
                  : "border-r border-[rgba(255,255,255,0.2)]"
              }`}
              style={{
                borderBottomColor:
                  location.pathname === item.path
                    ? webMenuActiveColor
                    : "transparent",
              }}
            >
              {language === "en" ? item.labelEn : item.labelBn}
            </li>
          </Link>
        ))}
        {/* lastBar */}
        <Link
          to="/jayarank"
          className="transition"
          style={{
            color: webMenuTextColor,
            ":hover": { color: webMenuHoverColor },
          }}
        >
          <li
            className={`flex font-semibold items-center p-2 gap-1 ${
              location.pathname === "/jayarank"
                ? "border-b-2 border-r-[rgba(255,255,255,0.2)]"
                : "border-r-[rgba(255,255,255,0.2)]"
            }`}
            style={{
              borderBottomColor:
                location.pathname === "/jayarank"
                  ? webMenuActiveColor
                  : "transparent",
            }}
          >
            K88 Pass
            <span
              className="px-1 py-1 rounded-lg font-bold text-xs"
              style={{
                backgroundColor: "#16a34a",
                color: "#ffffff",
              }}
            >
              New
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default LargeNavbar;
