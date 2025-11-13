import { useEffect, useState } from "react";
import api from "../../config/api";
import vsImage from "../../assets/versus.png";
import { useOutletContext } from "react-router-dom";

const UpcomingMatch = ({ language }) => {
  const [matches, setMatches] = useState([]);
  const { siteSettings } = useOutletContext() || {};

  // Fetch upcoming matches data from API
  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      try {
        const response = await api.get("/api/upcoming-matches");
        console.log("Upcoming Matches API Response:", response.data);

        // Process API data
        if (response.data && response.data.data) {
          setMatches(response.data.data);
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
            className="min-w-[300px] sm:min-w-[350px] md:min-w-[380px] lg:min-w-[400px] font-semibold flex-shrink-0"
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
              className="flex justify-between text-white py-2 px-4 text-xs lg:text-base"
              style={{
                backgroundColor: siteSettings?.webMenu?.hoverColor || "#09bda2",
              }}
            >
              <h3 className="">
                {match.category} - {match.matchType}
              </h3>
              <p className="">{new Date(match.matchDate).toLocaleString()}</p>
            </div>

            {/* Team Row */}
            <div className="flex justify-between px-8 py-4 relative w-full items-center">
              {/* Team 1 */}
              <div className="flex flex-col items-center w-[30%]">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
                  <img
                    src={match.teamA.flagImage}
                    alt={match.teamA.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <p className="text-center whitespace-nowrap text-xs lg:text-sm mt-2">
                  {match.teamA.name}
                </p>
                <p
                  className="font-bold"
                  style={{
                    color: siteSettings?.webMenu?.hoverColor || "#09bda2",
                  }}
                >
                  {match.teamA.odds}
                </p>
              </div>

              {/* VS */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src={vsImage}
                  alt="vs"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center w-[30%]">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
                  <img
                    src={match.teamB.flagImage}
                    alt={match.teamB.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <p className="text-center whitespace-nowrap text-xs lg:text-sm mt-2">
                  {match.teamB.name}
                </p>
                <p
                  className="font-bold"
                  style={{
                    color: siteSettings?.webMenu?.hoverColor || "#09bda2",
                  }}
                >
                  {match.teamB.odds}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatch;
