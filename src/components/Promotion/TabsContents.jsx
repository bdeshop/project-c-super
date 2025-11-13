import { useNavigate } from "react-router-dom";

const TabsContents = ({ promotions, language, onDetailsClick }) => {
  const navigate = useNavigate();
  return (
    <div>
      {promotions.length > 0 ? (
        <div className="grid bg-black py-2 grid-cols-1 lg:grid-cols-2 gap-2  px-4 lg:px-16">
          {promotions.map((item, index) => (
            <div key={index} className="relative  shadow-lg rounded-xl">
              <img
                src={item.image}
                alt="promotion"
                className="w-full h-38 lg:h-60"
              />
              <div className="pl-2 space-y-2">
                <h2 className="mt-2 text-lg text-textPrimary font-bold">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-400">{item.description}</p>
                <div className="hidden lg:flex flex-row gap-2 items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="#ffffff"
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <line
                      x1="32"
                      y1="32"
                      x2="32"
                      y2="16"
                      stroke="#333"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="32"
                      y1="32"
                      x2="44"
                      y2="32"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="32" cy="32" r="3" fill="#333" />
                  </svg>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>

                <div className="lg:absolute lg:bottom-20 right-2 lg:bg-common-blue text-white px-2 py-1 text-xs rounded">
                  {item.countdown}
                </div>

                <div className="mt-4 flex gap-2 pb-2">
                  {item.details && (
                    <button
                      onClick={() => {
                        console.log("🖱️ Details button clicked", item);
                        console.log(
                          "📞 onDetailsClick function:",
                          onDetailsClick
                        );
                        if (onDetailsClick) {
                          onDetailsClick(item);
                        } else {
                          console.error("❌ onDetailsClick is not defined!");
                        }
                      }}
                      className="text-white border-textPrimary border px-4 lg:px-12 py-1 rounded hover:bg-gray-800 transition-colors"
                    >
                      {language === "bn" ? "বিস্তারিত" : "Details"}
                    </button>
                  )}
                  {item.apply && (
                    <button
                      onClick={() => {
                        console.log(
                          "🎯 Apply button clicked for promotion:",
                          item
                        );
                        navigate("/amanot", { state: { promotion: item } });
                      }}
                      className="text-white bg-common-orange  px-4 lg:px-12 py-1 rounded hover:bg-orange-600 transition-colors"
                    >
                      {language === "bn" ? "আবেদন" : "Apply"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-4 px-4 lg:px-16">
          <p className="text-gray-600">
            {language === "bn"
              ? "অনুগ্রহ করে সাথেই থাকুন। নতুন প্রচার আপনার পথে আসছে।"
              : "No Selected Promotion"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TabsContents;
