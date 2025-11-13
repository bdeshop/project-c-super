import { useState, useEffect } from "react";
import api from "../../../config/api"; // Import the API configuration
import AutoSlider from "./AutoSlider";
import slotImage from "../../../assets/49_0.jpg";
import casinoImage from "../../../assets/thumb.jpg"
import crashImage from "../../../assets/crash.webp";
import tableImage from "../../../assets/124_0.jpg";
import sportsImage from "../../../assets/last.jpg";
import liveImage from "../../../assets/live.webp";

const tabData = {
  slots: {
    title: "Slots",
    items: [],
  },

  casino: {
    title: "Casino",
    items: [],
  },

  crash: {
    title: "Crash",
    items: [],
  },

  table: {
    title: "Table",
    items: [],
  },

  sports: {
    title: "Sports",
    items: [],
  },
};

const MainTabs = () => {
  const [activeTab, setActiveTab] = useState("slots");
  const [winnersData, setWinnersData] = useState(tabData);

  // Fetch top winners data from API
  useEffect(() => {
    const fetchTopWinners = async () => {
      try {
        const response = await api.get("/api/top-winners");
        console.log("API Response:", response.data);
        
        // Process API data and organize by category
        const processedData = { ...tabData };
        
        if (response.data && response.data.data) {
          response.data.data.forEach(item => {
            const category = item.gameCategory.toLowerCase();
            const formattedItem = {
              img: item.gameImage || getPlaceholderImage(category),
              title: item.gameName || "Win",
              user: item.username ? `${item.username}****` : "user****",
              datetime: new Date(item.winTime).toLocaleString(),
              amount: item.winAmount?.toString() || "0.00",
            };
            
            // Add to appropriate category if it exists
            if (processedData[category]) {
              processedData[category].items.push(formattedItem);
            }
          });
        }
        
        setWinnersData(processedData);
      } catch (error) {
        console.error("Error fetching top winners:", error);
      }
    };

    fetchTopWinners();
  }, []);

  // Helper function to get placeholder images based on category
  const getPlaceholderImage = (category) => {
    switch (category) {
      case "slots": return slotImage;
      case "casino": return casinoImage;
      case "crash": return crashImage;
      case "table": return tableImage;
      case "sports": return sportsImage;
      default: return slotImage;
    }
  };

  return (
    <div className="mx-auto max-w-6xl  py-6 text-white overflow-hidden lg:px-4 px-2">
      <div className="flex items-center gap-2 px-2">
        <h3>Top Winners</h3>
        <img src={liveImage} alt="" className=" md:w-[10%]  w-[20%] lg:w-[5%]" />
      </div>

      <div>
        <div className=" lg:w-[40%] py-2 md:py-0  px-2 overflow-x-auto  flex justify-between my-4 ">
          {Object.keys(winnersData).map((key) => (
            <button
              key={key}
              className={`px-4 py-1 text-xs rounded-full font-semibold ${
                activeTab === key ? "bg-common-orange" : ""
              }`}
              onClick={() => setActiveTab(key)}
            >
              {winnersData[key].title.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="">
          <AutoSlider items={winnersData[activeTab].items} />
        </div>
      </div>
    </div>
  );
};

export default MainTabs;