// src/App.tsx
import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Shield,
  Zap,
  Crown,
  ShoppingCart,
  Settings,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageSquare,
  X,
  ChevronDown,
} from "lucide-react";
import { Mission, Reward } from "./types/types";
import { missions, streamers, freePassRewards, premiumPassRewards } from "./data/data";
import {
  getRarityColor,
  getRarityGlow,
  getRarityBorder,
  getRarityTextColor,
} from "./utils/utils";
import BuyItems from "./components/BuyItems";
import SellItems from "./components/SellItems";

function App() {
  const [currentLevel] = useState(5);
  const [goldAmount] = useState(3580);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [shopBundleTime, setShopBundleTime] = useState("1h 50m 54s");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeReward, setActiveReward] = useState<Reward | null>(null);
  const streamingBoxPosition = {
    top: 50,
    left: 20,
  };
  const missionsBoxPosition = {
    top: 225,
    left: 295,
  };
  const xpBoostBoxPosition = {
    top: 465,
    left: 295,
  };
  const playerInfoPosition = {
    top: 225,
    left: 1042,
  };
  const battlePosition = {
    top: 330,
    left: 1042,
  };
  const unlockAllPosition = {
    top: 450,
    left: 644,
  };
  const seasonEndsPosition = {
    top: 510,
    left: 673,
  };

  const socialLinksPosition = {
    top: 50,
    left: 1385,
  };
  const battlePassRewardsPosition = {
    top: 225,
    left: 512,
  };
  const googlePlayPosition = {
    top: 350,
    left: 20,
  };
  const appStorePosition = {
    top: 410,
    left: 20,
  };
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isSoloDropdownOpen, setIsSoloDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Solo");
  const rewardWidth = 96;
  const containerWidth = 5 * rewardWidth;
  const [isPremium] = useState(false);
  const [levelInfo] = useState({ level: 10 });
  const [isClassicDropdownOpen, setIsClassicDropdownOpen] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState("Classic");
  const [seasonEnds, setSeasonEnds] = useState("82d 22h 35m 0s");
  const [exclusiveOffersTime, setExclusiveOffersTime] = useState("04h 1m 50s");
  const battlePassTitlePosition = {
    top: 430,
    left: 487,
  };
  const [activeShopMode, setActiveShopMode] = useState<"buy" | "sell" | null>(null);


  const toggleClassicDropdown = () => {
    setIsClassicDropdownOpen(!isClassicDropdownOpen);
  };

  const selectGameType = (gameType: string) => {
    setSelectedGameType(gameType);
    setIsClassicDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += event.deltaY;
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    const handleScrollPosition = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("wheel", handleScroll);
    container?.addEventListener("scroll", handleScrollPosition);

    return () => {
      container?.removeEventListener("wheel", handleScroll);
      container?.removeEventListener("scroll", handleScrollPosition);
    };
  }, []);


  const handleBabyXenoClick = () => {
    window.open("https://www.youtube.com/@Baby_Xeno", "_blank");
  };

  const toggleSoloDropdown = () => {
    setIsSoloDropdownOpen(!isSoloDropdownOpen);
  };

  const selectMode = (mode: string) => {
    setSelectedMode(mode);
    setIsSoloDropdownOpen(false);
  };

  useEffect(() => {
    let shopBundleInterval: any;
    let seasonEndsInterval: any;
    let exclusiveOffersInterval: any;

    const calculateTimeLeft = (timeString: string) => {
      const [hours, minutes, seconds] = timeString
        .split(/[hms ]/)
        .filter((item) => item !== "");

      let totalSeconds =
        parseInt(hours || "0") * 3600 +
        parseInt(minutes || "0") * 60 +
        parseInt(seconds || "0");

      return totalSeconds;
    };

    const updateShopBundleTime = () => {
      setShopBundleTime((prevTime) => {
        let totalSeconds = calculateTimeLeft(prevTime);

        totalSeconds--;

        if (totalSeconds < 0) {
          totalSeconds = 24 * 3600;
        }

        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;

        const formatTime = (value: number) => String(value).padStart(2, "0");

        return `${formatTime(newHours)}h ${formatTime(newMinutes)}m ${formatTime(
          newSeconds
        )}s`;
      });
    };

    const updateSeasonEnds = () => {
      setSeasonEnds((prevTime) => {
        const [days, hours, minutes, seconds] = prevTime
          .split(/[d hms ]/)
          .filter((item) => item !== "");

        let totalSeconds =
          parseInt(days || "0") * 24 * 3600 +
          parseInt(hours || "0") * 3600 +
          parseInt(minutes || "0") * 60 +
          parseInt(seconds || "0");

        totalSeconds--;

        if (totalSeconds < 0) {
          return "Season Ended!";
        }

        const newDays = Math.floor(totalSeconds / (24 * 3600));
        const newHours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;

        const formatTime = (value: number) => String(value).padStart(2, "0");

        return `${formatTime(newDays)}d ${formatTime(newHours)}h ${formatTime(
          newMinutes
        )}m ${formatTime(newSeconds)}s`;
      });
    };

    const updateExclusiveOffersTime = () => {
      setExclusiveOffersTime((prevTime) => {
        let totalSeconds = calculateTimeLeft(prevTime);

        totalSeconds--;

        if (totalSeconds < 0) {
          totalSeconds = 24 * 3600;
        }

        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;

        const formatTime = (value: number) => String(value).padStart(2, "0");

        return `${formatTime(newHours)}h ${formatTime(newMinutes)}m ${formatTime(
          newSeconds
        )}s`;
      });
    };

    shopBundleInterval = setInterval(updateShopBundleTime, 1000);
    seasonEndsInterval = setInterval(updateSeasonEnds, 1000);
    exclusiveOffersInterval = setInterval(updateExclusiveOffersTime, 1000);

    return () => {
      clearInterval(shopBundleInterval);
      clearInterval(seasonEndsInterval);
      clearInterval(exclusiveOffersInterval);
    };
  }, []);

  const handleBuyItemClick = () => {
    setActiveShopMode("buy");
  };

  const handleSellItemClick = () => {
    setActiveShopMode("sell");
  };

  const closeShopMode = () => {
    setActiveShopMode(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                         url(/Better_Pass/images/background.png)`,
      }}
    >
      {/* Top Navigation */}
      <div className="bg-transparent p-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-[#333300] px-3 py-1 rounded-md flex items-center border border-yellow-500">
            <img
              src="/Better_Pass/images/imagegp.png"
              alt="GP"
              className="w-4 h-4 mr-2"
            />
            <span className="text-yellow-400 font-bold">{goldAmount}</span>
          </div>
          <button
            className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-md flex items-center"
            onClick={() => setShowBundleModal(true)}
          >
            <ShoppingCart size={16} className="mr-2" />
            SHOP
            <span className="text-xs ml-2 text-gray-300">
              New Bundles: {shopBundleTime}
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md">
            <Settings size={16} />
          </button>
          <button className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-md">
            LOGIN
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 p-4">
        {/* Left Column - Streaming & Missions */}
        <div className="col-span-3">
          {/* Streaming Section */}
          <div
            className="rounded-lg p-4 mb-4"
            style={{
              position: "absolute",
              top: streamingBoxPosition.top,
              left: streamingBoxPosition.left,
              backgroundColor: "transparent",
              color: "white",
              borderColor: "transparent",
              borderWidth: "0px",
            }}
          >
            <h2 className="text-lg font-bold mb-4 flex items-center text-white">
              Streaming Live!
            </h2>
            <div className="space-y-3">
              {streamers.map((streamer) => (
                <div key={streamer.id} className="flex items-center space-x-2">
                  <img
                    src={streamer.avatar}
                    alt={streamer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-yellow-400">
                      {streamer.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {streamer.viewers} viewers
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Featured YouTuber */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="text-sm font-bold mb-2">Featured YouTuber</h3>
              <div className="flex items-center space-x-2">
                <div className="text-red-500">
                  <Youtube size={20} />
                </div>
                <div
                  className="text-sm cursor-pointer hover:text-red-500"
                  onClick={handleBabyXenoClick}
                >
                  Baby_Xeno
                </div>
              </div>
            </div>
          </div>

          {/* Missions Section */}
          <div
            className="bg-black rounded-lg p-4 mb-4 border border-gray-800"
            style={{
              position: "absolute",
              top: missionsBoxPosition.top,
              left: missionsBoxPosition.left,
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-center text-yellow-400">
              MISSIONS
            </h2>
            <div className="space-y-4">
              {missions.map((mission) => (
                <div key={mission.id} className="space-y-2">
                  <div className="flex justify-between text-sm text-yellow-400">
                    <span>{mission.title}</span>
                    <span className="flex items-center">
                      {mission.xp} XP <Zap size={14} className="ml-1" />
                    </span>
                  </div>
                  <div className="h-2 bg-[#3a3a3a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${(mission.progress / mission.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-right text-sm text-yellow-400">
                    {mission.progress} / {mission.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Updated Google Play Button */}
          <div
            style={{
              position: "absolute",
              top: googlePlayPosition.top,
              left: googlePlayPosition.left,
            }}
          >
            <a
              href="#"
              className="block bg-black hover:bg-gray-900 p-2 rounded-lg mb-3 border border-gray-800"
              style={{ width: "170px" }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <img
                    src="/Better_Pass/images/imagegoogle.png"
                    alt="Google Play"
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">GET IT ON</div>
                  <div className="text-white font-medium text-sm">
                    Google Play
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Updated App Store Button */}
          <div
            style={{
              position: "absolute",
              top: appStorePosition.top,
              left: appStorePosition.left,
            }}
          >
            <a
              href="#"
              className="block bg-black hover:bg-gray-900 p-2 rounded-lg border border-gray-800"
              style={{ width: "170px" }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <img
                    src="/Better_Pass/images/imageapple.png"
                    alt="App Store"
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">
                    Download on the
                  </div>
                  <div className="text-white font-medium text-sm">
                    App Store
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Mobile App Section */}
          <div
            className="bg-black rounded-lg p-4 border border-gray-800 text-yellow-400"
            style={{
              position: "absolute",
              top: xpBoostBoxPosition.top,
              left: xpBoostBoxPosition.left,
            }}
          >
            <div className="text-center mb-4">
              <p className="text-sm">
                Get <span className="font-bold">XP Boost</span> on Mobile App
              </p>
            </div>

            {/*  Removed the grid here */}
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-lg flex items-center justify-center">
              Get Free GP
              <img
                src="/Better_Pass/images/imagegp.png"
                alt="GP"
                className="w-4 h-4 ml-2"
              />
            </button>
          </div>
        </div>

        {/* Center Column - Battle Pass */}
        <div className="col-span-6">
          {/* Game Banner */}
          <div
            className="relative mx-auto mb-4"
            style={{ width: "400px", height: "144px" }}
          >
            <img
              src="/Better_Pass/images/banner.png"
              alt="Game Banner"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Battle Pass Header */}
          <div
            style={{
              position: "absolute",
              top: battlePassTitlePosition.top,
              left: battlePassTitlePosition.left,
            }}
          >
            <div
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "top left",
                whiteSpace: "nowrap",
              }}
              className="text-xl font-bold flex items-center justify-center"
            >
              <Shield size={20} className="mr-2 text-green-400" />
              <span className="text-yellow-500">SurvivX.io Pass 1</span>
            </div>
          </div>
        </div>
        {/* Battle Pass Progress */}
        <div
          className="bg-black p-4 rounded-lg border border-gray-800 mb-4"
          style={{
            position: "absolute",
            top: battlePassRewardsPosition.top,
            left: battlePassRewardsPosition.left,
          }}
        >
          {/* Combined Battle Pass with Level Numbers */}
          <div
            className="relative"
            style={{ width: `${containerWidth}px` }}
          >
            {/* Scrollable Rewards Container */}
            <div
              className="flex overflow-x-auto scrollbar-hide"
              ref={scrollContainerRef}
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                setScrollPosition(target.scrollLeft);
              }}
            >
              <div className="flex flex-col">
                {/* Free Pass Rewards */}
                <div className="flex">
                  {freePassRewards.map((reward, index) => (
                    <div
                      key={reward.id}
                      className="relative flex-shrink-0 w-24 cursor-pointer"
                      onClick={() => setActiveReward(reward)}
                    >
                      <div
                        className={`bg-gray-800 p-1 rounded border ${getRarityBorder(
                          reward.rarity
                        )}`}
                      >
                        <div className="flex items-center justify-center h-12">
                          <img
                            src={reward.image}
                            alt={`Reward ${reward.id}`}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Level Numbers Track - Fixed between rewards */}
                <div className="flex py-2 relative">
                  {/* Progression Line */}
                  <div
                    className="absolute top-1/2 left-0 h-[3px] bg-yellow-500"
                    style={{
                      width: `${(currentLevel / 25) * (25 * rewardWidth)}px`,
                      transform: "translateY(-50%)",
                    }}
                  />

                  {[...Array(25)].map((_, index) => {
                    const level = index + 1;
                    return (
                      <div
                        key={`level-${level}`}
                        className="flex-shrink-0 w-24"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                            level <= currentLevel
                              ? "bg-yellow-500 text-black"
                              : "bg-gray-700 text-white"
                          } font-bold text-sm relative`}
                          style={{ zIndex: 1 }}
                        >
                          {level}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Premium Pass Rewards */}
                <div className="flex">
                  {premiumPassRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="relative flex-shrink-0 w-24 cursor-pointer"
                      onClick={() => setActiveReward(reward)}
                    >
                      <div
                        className={`bg-gray-800 p-1 rounded border ${getRarityBorder(
                          reward.rarity
                        )}`}
                      >
                        <div className="flex items-center justify-center h-12">
                          <img
                            src={reward.image}
                            alt={`Reward ${reward.id}`}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlock Premium Button */}
        <div
          style={{
            position: "absolute",
            top: unlockAllPosition.top,
            left: unlockAllPosition.left,
          }}
        >
          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg mb-4 relative overflow-hidden"
            onClick={() => setShowPremiumModal(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <span className="relative z-10 flex items-center justify-center">
              <Crown size={20} className="mr-2" />
              UNLOCK ALL GOLD ITEMS
              <Crown size={20} className="ml-2" />
            </span>
          </button>
        </div>

        {/* Season Timer */}
        <div
          style={{
            position: "absolute",
            top: seasonEndsPosition.top,
            left: seasonEndsPosition.left,
          }}
        >
          <div className="text-center text-yellow-400 text-sm bg-black py-2 rounded-lg border border-yellow-600">
            Season Ends: {seasonEnds}
          </div>
        </div>
      </div>

      {/* Right Column - Player Info & Battle */}
      <div className="col-span-3">
        {/* Player Info */}
        <div
          className="bg-black rounded-lg p-4 mb-4 border border-gray-700"
          style={{
            position: "absolute",
            top: playerInfoPosition.top,
            left: playerInfoPosition.left,
          }}
        >
          <div className="flex items-center">
            <div className="relative">
              <img
                src="/Better_Pass/images/imageprofile.png"
                alt="Player Avatar"
                className="w-16 h-16 rounded-full bg-orange-500"
              />
            </div>
            <div className="ml-4 flex-grow">
              <div className="bg-black text-yellow-300 text-center py-1 px-2 rounded mb-2 font-bold">
                Prestige 0
              </div>
              <button className="w-full bg-green-500 hover:// src/App.tsx (Continued)
bg-green-600 text-white font-bold py-2 rounded">
                Loadout
              </button>
            </div>
          </div>
        </div>

        {/* Battle Button */}
        <div
          style={{
            position: "absolute",
            top: battlePosition.top,
            left: battlePosition.left,
          }}
        >
          <div className="space-y-2">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-3 rounded">
              Battle
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded flex items-center justify-center w-full"
                  onClick={toggleClassicDropdown}
                >
                  <span className="mr-1">⚛️</span> {selectedGameType}{" "}
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {isClassicDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-full bg-green-700 border border-green-800 rounded shadow-md z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-white hover:bg-green-800"
                      onClick={() => selectGameType("Classic")}
                    >
                      Classic
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-white hover:bg-green-800"
                      onClick={() => selectGameType("Ranked")}
                    >
                      Ranked
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded flex items-center justify-center w-full"
                  onClick={toggleSoloDropdown}
                >
                  <span className="mr-1">🔮</span> {selectedMode}{" "}
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isSoloDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-full bg-blue-700 border border-blue-800 rounded shadow-md z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-white hover:bg-blue-800"
                      onClick={() => selectMode("Solo")}
                    >
                      Solo
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-white hover:bg-blue-800"
                      onClick={() => selectMode("Duo")}
                    >
                      Duo
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-white hover:bg-blue-800"
                      onClick={() => selectMode("Squads")}
                    >
                      Squads
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
              Make Team
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div
          style={{
            position: "absolute",
            top: socialLinksPosition.top,
            left: socialLinksPosition.left,
          }}
        >
          <div className="flex justify-center space-x-2 mt-4">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a
              href="#"
              className="text-purple-500 hover:text-purple-400 transition-colors"
            >
              <MessageSquare size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg w-full max-w-2xl border border-gray-700 shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-800 to-yellow-600 p-3 rounded-t-lg">
              <h2 className="text-xl font-bold text-center text-white">
                EXCLUSIVE OFFERS
              </h2>
              <p className="text-sm text-center text-yellow-200">
                New Bundles: {exclusiveOffersTime}
              </p>
            </div>

            <div className="p-4 flex flex-col md:flex-row gap-4">
              {/* Coin Purchase Section */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-800 bg-opacity-60 p-3 rounded-lg mb-3">
                  <h3 className="text-center text-white font-bold mb-2">
                    Get PARMA Crates
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-blue-900 border-2 border-blue-700 rounded p-2 text-center cursor-pointer hover:brightness-110">
                      <div className="flex justify-center items-center mb-1">
                        <img
                          src="/Better_Pass/images/imagegp.png"
                          alt="GP"
                          className="w-5 h-5 mr-1"
                        />
                        <span className="text-yellow-400 font-bold">3000</span>
                      </div>
                      <div className="bg-blue-600 rounded py-1 text-white font-bold">
                        $9.99
                      </div>
                    </div>

                    <div className="bg-blue-900 border-2 border-blue-700 rounded p-2 text-center cursor-pointer hover:brightness-110">
                      <div className="flex justify-center items-center mb-1">
                        <img
                          src="/Better_Pass/images/imagegp.png"
                          alt="GP"
                          className="w-5 h-5 mr-1"
                        />
                        <span className="text-yellow-400 font-bold">8300</span>
                      </div>
                      <div className="bg-blue-600 rounded py-1 text-white font-bold">
                        $24.99
                      </div>
                    </div>

                    <div className="bg-blue-900 border-2 border-blue-700 rounded p-2 text-center cursor-pointer hover:brightness-110">
                      <div className="flex justify-center items-center mb-1">
                        <img
                          src="/Better_Pass/images/imagegp.png"
                          alt="GP"
                          className="w-5 h-5 mr-1"
                        />
                        <span className="text-yellow-400 font-bold">
                          16000
                        </span>
                      </div>
                      <div className="bg-blue-600 rounded py-1 text-white font-bold">
                        $39.99
                      </div>
                    </div>

                    <div className="bg-blue-900 border-2 border-blue-700 rounded p-2 text-center cursor-pointer hover:brightness-110">
                      <div className="flex justify-center items-center mb-1">
                        <img
                          src="/Better_Pass/images/imagegp.png"
                          alt="GP"
                          className="w-5 h-5 mr-1"
                        />
                        <span className="text-yellow-400 font-bold">
                          53000
                        </span>
                      </div>
                      <div className="bg-blue-600 rounded py-1 text-white font-bold">
                        $99.99
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Battle Pass Section */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-800 bg-opacity-60 p-3 rounded-lg mb-3">
                  <h3 className="text-center text-white font-bold mb-2">
                    Unlock ALL Items
                  </h3>
                  <div className="text-center text-yellow-300 text-sm">
                    Get instant access to all premium rewards!
                  </div>

                  <div className="mt-3 flex justify-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg">
                      UNLOCK ALL FOR $49.99
                    </button>
                  </div>
                </div>
              </div>
              {/* Featured Item Section */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-800 bg-opacity-60 p-3 rounded-lg mb-3">
                  <h3 className="text-center text-white font-bold mb-2">
                    Featured Item
                  </h3>{" "}
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src="/Better_Pass/images/image51.png"
                      alt="Featured Item"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-2 text-white">
                      <div className="font-bold">Legendary Skin</div>
                      <div className="text-sm">Limited Time Offer</div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg">
                      GET IT NOW!
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="p-3 rounded-b-lg text-center">
              <p className="text-gray-400 text-xs">
                &copy; 2025 SurvivX.io. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Premium Bundles Modal */}
      {showBundleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-[800px] max-w-[90%] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => {
                setShowBundleModal(false);
                closeShopMode();
              }}
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl text-center mb-4 text-white">
              EXCLUSIVE OFFERS
            </h2>
            <p className="text-center text-yellow-400 mb-6">
              New Bundles: {shopBundleTime}
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-md flex items-center"
                onClick={handleBuyItemClick}
              >
                BUY ITEM
              </button>
              <button
                className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-md flex items-center"
                onClick={handleSellItemClick}
              >
                SELL ITEM
              </button>
            </div>

            {activeShopMode === "buy" && <BuyItems />}
            {activeShopMode === "sell" && <SellItems />}

            {activeShopMode === null && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bundle 1 */}
                <div className="border-2 border-purple-500 rounded-lg p-4 relative">
                  <div className="absolute -top-2 -left-2 bg-yellow-500 transform rotate-[-45deg] px-2 py-1 text-black font-bold">
                    5% OFF
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Use actual premium rewards here */}
                    <div className="border-2 border-green-500 p-2 flex justify-center items-center h-16">
                      <img
                        src={premiumPassRewards[0].image} // Premium Reward 1
                        alt="Premium Reward 1"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="border-2border-teal-400 p-2 flex justify-center items-center h-16">
                      <img
                        src={premiumPassRewards[1].image} // Premium Reward 2
                        alt="Premium Reward 2"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="border-2 border-purple-500 p-2 flex justify-center items-center h-16">
                      <img
                        src={premiumPassRewards[2].image} // Premium Reward 3
                        alt="Premium Reward 3"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md py-2 px-4">
                      <img
                        src="/Better_Pass/images/imagegp.png"
                        alt="GP"
                        className="w-5 h-5 mr-2"
                      />
                      <span className="text-yellow-400 font-bold">1111</span>
                    </button>
                  </div>
                </div>

                {/* Bundle 2 */}
                <div className="border-2 border-purple-500 rounded-lg p-4 relative">
                  <div className="absolute -top-2 -left-2 bg-yellow-500 transform rotate-[-45deg] px-2 py-1 text-black font-bold">
                    10% OFF
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Use actual premium rewards here */}
                    <div className="border-2 border-green-500 p-2 flex justify-center items-center h-16">
                      <img
                        src={premiumPassRewards[3].image} // Premium Reward 4
                        alt="Premium Reward 4"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="border-2 border-teal-400 p-2 flex justify-center items-center h-16">
                      <img
                        src={premiumPassRewards[4].image} // Premium Reward 5
                        alt="Premium Reward 5"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="border-2 border-teal-400 p-2 flex justify-center items-center h-16">
                      <img
                        src={premiumPassRewards[5].image} // Premium Reward 6
                        alt="Premium Reward 6"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="col-start-2 border-2 border-purple-500 p-2 flex justify-center items-center h-16">
                      <img
                        src={premiumPassRewards[6].image} // Premium Reward 7
                        alt="Premium Reward 7"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md py-2 px-4">
                      <img
                        src="/Better_Pass/images/imagegp.png"
                        alt="GP"
                        className="w-5 h-5 mr-2"
                      />
                      <span className="text-yellow-400 font-bold">1323</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reward Details Modal */}
      {activeReward && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 backdrop-blur-sm">
          <div
            className={`bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 max-w-md w-full border-2 ${getRarityBorder(
              activeReward.rarity
            )} shadow-2xl relative`}
          >
            <button
              onClick={() => setActiveReward(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <img
              src={activeReward.image}
              alt="Reward Preview"
              className="w-full h-48 object-contain rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-white mb-2">
              Reward {activeReward.position}
            </h3>
            <p className="text-gray-300">
              Rarity:{" "}
              <span className={getRarityTextColor(activeReward.rarity)}>
                {activeReward.rarity}
              </span>
            </p>
            <p className="text-gray-300">
              Type: <span>{activeReward.type}</span>
            </p>
            <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded">
              Claim Reward
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
