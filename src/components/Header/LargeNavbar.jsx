import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../Context/LanguageContext";

const LargeNavbar = ({
  location,
  dynamicMenuItems,
  staticMenuItems,
  siteSettings,
}) => {
  const { language } = useContext(LanguageContext);

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
        className="lg:flex hidden justify-between items-center whitespace-nowrap"
        style={{
          color: webMenuTextColor,
          fontSize: webMenuFontSize,
        }}
      >
        {/* Left side - Download and Dynamic Categories */}
        <div className="flex items-center">
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

          {/* Dynamic Game Categories */}
          {dynamicMenuItems.map((item, index) => {
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
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
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
                    </div>

                    <div className="absolute left-0 right-0 mt-2 bg-black w-full bg-opacity-70 text-black rounded-md shadow-xl opacity-0 invisible transform scale-y-0 origin-top transition-all duration-700 ease-out group-hover:opacity-100 group-hover:visible group-hover:scale-y-100">
                      <div
                        className="w-full overflow-hidden"
                        style={{ backgroundColor: `${webMenuHoverColor}30` }}
                      >
                        <ul className="flex flex-wrap gap-4 mx-auto max-w-6xl">
                          {item.mainIcons?.map((mainIcon, subIndex) => (
                            <Link
                              key={subIndex}
                              to={`/games?provider=${mainIcon.providerId}&category=${mainIcon.categoryId}&providerName=${encodeURIComponent(mainIcon.name)}`}
                              className="w-[15%]"
                            >
                              <li className="cursor-pointer">
                                {/* Provider Logo */}
                                <img
                                  src={mainIcon.mIcon}
                                  alt={mainIcon.name}
                                  className="w-[80%] h-[160px] rounded-md border-black object-contain filter grayscale hover:filter-none transition-all duration-300"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/160?text=No+Logo";
                                  }}
                                />
                                <div className="flex pt-2 w-[80%] flex-row items-center justify-center">
                                  <h3
                                    className="font-bold text-xs text-center"
                                    style={{ color: webMenuTextColor }}
                                  >
                                    {mainIcon.name}
                                  </h3>
                                </div>
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </div>

        {/* Right side - Static Menu Items */}
        <div className="flex items-center">
          {staticMenuItems.map((item, index) => (
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
                className={`flex font-semibold items-center p-2 gap-2 border-r border-[rgba(255,255,255,0.2)] ${
                  location.pathname === item.path ? "border-b-2" : ""
                }`}
                style={{
                  borderBottomColor:
                    location.pathname === item.path
                      ? webMenuActiveColor
                      : "transparent",
                }}
              >
                {item.icon && (
                  <img src={item.icon} alt={item.name} className="w-5 h-5" />
                )}
                {item.name}
                {item.extra}
              </li>
            </Link>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default LargeNavbar;
