import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { LanguageContext } from "../Context/LanguageContext";
import { useGamesByProvider, useGameCategories } from "../hooks/useGameCategories";
import { useOutletContext } from "react-router-dom";
import { isAuthenticated, getUsername, getUserBalance, logout } from "../utils/auth";
import api, { BASE_URL } from "../config/api";

const Games = () => {
  const { language } = useContext(LanguageContext);
  const { setIsOpenModal } = useOutletContext();
  const [searchParams] = useSearchParams();
  const [launching, setLaunching] = useState(null);

  const providerId = searchParams.get("provider");
  const categoryId = searchParams.get("category");
  const providerName = searchParams.get("providerName");

  const { categories } = useGameCategories();
  const { games, loading, error } = useGamesByProvider(providerId, categoryId);

  const category = categories.find((c) => c._id === categoryId);
  const displayTitle =
    providerName ||
    (category
      ? language === "en"
        ? category.nameEnglish
        : category.nameBangla
      : "Games");

  const handlePlay = async (game) => {
    if (!isAuthenticated()) {
      setIsOpenModal(true);
      return;
    }

    try {
      console.log("🚀 [DEBUG] handlePlay triggered for game:", game);
      setLaunching(game._id);
      console.log("=== PLAY GAME START ===");
      
      const gameIdentifier = game.gameId || game.gameUuid || game.game_id || game._id;
      console.log("Step 1: Game Identifier to use:", gameIdentifier);

      // Step 1: Fetch latest user data to get updated balance
      const token = localStorage.getItem("authToken");
      let currentBalance = getUserBalance();
      try {
        const authResponse = await fetch(`${BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (authResponse.status === 401) {
          logout();
          setIsOpenModal(true);
          return;
        }
        const authData = await authResponse.json();
        if (authData.success && authData.user) {
          currentBalance = authData.user.balance || 0;
          console.log("Updated balance:", currentBalance);
        }
      } catch (e) {
        console.warn("Failed to fetch fresh balance, using local:", currentBalance);
      }

      // Step 2: Try to Fetch game details from Oracle API (non-fatal)
      let oracleDetails = null;
      console.log("Step 2: Attempting Oracle sync for ID:", gameIdentifier);
      try {
        const gameDetailsResponse = await fetch(
          `https://api.oraclegames.live/api/games/${gameIdentifier}`,
          {
            headers: {
              "x-dstgame-key": "b4fb7adb955b1078d8d38b54f5ad7be8ded17cfba85c37e4faa729ddd679d379",
              "x-api-key": "a8b5ca55-56a5-418d-829d-6d00afd5945f",
            },
          }
        );
        if (gameDetailsResponse.ok) {
          const gameDetailsData = await gameDetailsResponse.json();
          if (gameDetailsData.success) {
            oracleDetails = gameDetailsData.data;
            console.log("✅ Oracle sync successful:", oracleDetails);
          }
        } else {
          console.warn("⚠️ Oracle API returned 400/500, falling back to local DB data.");
        }
      } catch (err) {
        console.warn("⚠️ Oracle fetch failed, using local DB data.", err);
      }

      // Step 3: Call our backend to get launch URL
      // We use Oracle details if available, otherwise fallback to game object properties
      const playGamePayload = {
        username: getUsername(),
        money: parseInt(currentBalance, 10) || 50,
        provider_code: oracleDetails?.provider?.provider_code || game.providerCode || game.provider?.providerCode || "",
        game_code: oracleDetails?.game_code || game.gameCode || game.gameId || game.gameUuid || 0,
        game_type: oracleDetails?.game_type || game.gameType || 0,
      };

      console.log("Step 3: Sending payload to backend:", playGamePayload);

      const response = await api.post("/api/playgame", playGamePayload);

      if (response.data.success && response.data.gameUrl) {
        console.log("Opening game URL:", response.data.gameUrl);
        window.open(response.data.gameUrl, "_blank");
      } else {
        console.error("Backend returned error:", response.data);
        alert(response.data.message || "Failed to get game URL");
      }
    } catch (err) {
      console.error("Critical Launch Error:", err);
      alert(err.response?.data?.message || err.message || "Error launching game. Please try again.");
    } finally {
      setLaunching(null);
      console.log("=== PLAY GAME END ===");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error loading games</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {displayTitle}
          </h1>
          <p className="text-gray-400">
            {games.length}{" "}
            {language === "en" ? "games available" : "গেম উপলব্ধ"}
          </p>
        </div>

        {/* Games Grid */}
        {games.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {language === "en" ? "No games found" : "কোন গেম পাওয়া যায়নি"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {games.map((game) => (
              <div
                key={game._id}
                className="group relative overflow-hidden rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                {/* Game Image */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.nameEnglish}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handlePlay(game)}
                      disabled={launching === game._id}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:bg-gray-500"
                    >
                      {launching === game._id
                        ? language === "en"
                          ? "Launching..."
                          : "চালু হচ্ছে..."
                        : language === "en"
                          ? "Play"
                          : "খেলুন"}
                    </button>
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {language === "en" ? game.nameEnglish : game.nameBangla}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 truncate">
                    {game.gameUuid}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {game.isHot && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                        🔥 Hot
                      </span>
                    )}
                    {game.isNewGame && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                        ✨ New
                      </span>
                    )}
                    {game.isLobby && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                        ⭐ Lobby
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
