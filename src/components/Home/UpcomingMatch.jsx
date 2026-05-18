import { useEffect, useState } from "react";
import api from "../../config/api";
import vsImage from "../../assets/versus.png";
import { useOutletContext } from "react-router-dom";

const UpcomingMatch = ({ language }) => {
  const [matches, setMatches] = useState([]);
  const { siteSettings } = useOutletContext() || {};

  // Fetch upcoming matches data from Oracle Games API
  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      try {
        const response = await fetch("https://api.oraclegames.live/api/cricket/matches", {
          headers: {
            "Accept": "application/json",
          },
        });
        const result = await response.json();
        console.log("Upcoming Matches Oracle API Response:", result);

        if (result.success && result.data) {
          setMatches(result.data);
        }
      } catch (error) {
        console.error("Error fetching upcoming matches:", error);
      }
    };

    fetchUpcomingMatches();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h3 className="text-white">
        {language === "en" ? "Upcoming Match" : "Upcoming Match"}
      </h3>
      <div className="flex gap-4 overflow-x-auto py-4">
        {matches.map((match, idx) => (
          <div
            key={idx}
            className="w-[280px] sm:w-[300px] font-semibold flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundColor:
                siteSettings?.customSections?.upcomingMatches?.cardBgColor ||
                "#012b2b",
              border: `1px solid ${
                siteSettings?.customSections?.upcomingMatches?.borderColor ||
                "#09bda2"
              }`,
              color: siteSettings?.fontSettings?.globalTextColor || "#ffffff",
            }}
          >
            {/* Header */}
            <div
              className="flex justify-between items-center text-white py-1.5 px-3 text-[10px] sm:text-xs"
              style={{
                backgroundColor: siteSettings?.webMenu?.hoverColor || "#09bda2",
              }}
            >
              <h3 className="font-bold truncate max-w-[160px] sm:max-w-[180px]" title={match.title}>
                {match.title || "Match"}
              </h3>
              <p className="uppercase text-[9px] sm:text-[10px] tracking-wider bg-black bg-opacity-35 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                {match.matchType} - {match.state}
              </p>
            </div>

            {/* Team Row */}
            <div className="flex justify-between px-4 py-3 relative w-full items-center">
              {/* Team 1 */}
              <div className="flex flex-col items-center w-[35%]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden bg-black bg-opacity-20 rounded-full p-2">
                  <img
                    src={match.team1?.flag}
                    alt={match.team1?.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <p className="text-center text-[10px] sm:text-xs mt-1.5 font-bold truncate w-full" title={match.team1?.name}>
                  {match.team1?.name}
                </p>
                <p
                  className="font-bold text-xs mt-0.5"
                  style={{
                    color: siteSettings?.webMenu?.hoverColor || "#09bda2",
                  }}
                >
                  {match.team1?.score || "-"}
                </p>
              </div>

              {/* VS */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src={vsImage}
                  alt="vs"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center w-[35%]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden bg-black bg-opacity-20 rounded-full p-2">
                  <img
                    src={match.team2?.flag}
                    alt={match.team2?.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <p className="text-center text-[10px] sm:text-xs mt-1.5 font-bold truncate w-full" title={match.team2?.name}>
                  {match.team2?.name}
                </p>
                <p
                  className="font-bold text-xs mt-0.5"
                  style={{
                    color: siteSettings?.webMenu?.hoverColor || "#09bda2",
                  }}
                >
                  {match.team2?.score || "-"}
                </p>
              </div>
            </div>

            {/* Match Status & Subtitle Footers */}
            <div className="px-3 pb-3 flex flex-col gap-0.5 items-center border-t border-white border-opacity-10 pt-2 bg-black bg-opacity-10">
              {match.status && (
                <p className="text-center text-[10px] sm:text-xs text-yellow-400 font-semibold truncate w-full" title={match.status}>
                  {match.status}
                </p>
              )}
              {match.subtitle && (
                <p className="text-center text-[9px] sm:text-[10px] text-gray-400 truncate w-full" title={match.subtitle}>
                  {match.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatch;
