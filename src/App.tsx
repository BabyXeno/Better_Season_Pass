import React, { useState, useRef, useEffect } from "react";
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
  Trophy,
  Star,
  Medal,
  Check,
  Lock,
  ChevronDown,
} from "lucide-react";

interface Mission {
  id: number;
  title: string;
  progress: number;
  total: number;
  xp: number;
}

interface Streamer {
  id: number;
  name: string;
  viewers: number;
  avatar: string;
}

interface Reward {
  id: number;
  rarity: string;
  isPremium: boolean;
  position: number;
  image: string;
  icon?: any;
}

const missions: Mission[] = [
  {
    id: 1,
    title: "Use healing items",
    progress: 3,
    total: 18,
    xp: 31,
  },
  {
    id: 2,
    title: "Destroy pots",
    progress: 1,
    total: 3,
    xp: 10,
  },
];

const streamers: Streamer[] = [
  {
    id: 1,
    name: "prodigy_reeeper",
    viewers: 22,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop",
  },
  {
    id: 2,
    name: "theamfox",
    viewers: 16,
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop",
  },
  {
    id: 3,
    name: "zaro5_",
    viewers: 1,
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=50&h=50&fit=crop",
  },
];
const freePassRewards = [
  { id: 1, rarity: "common", isPremium: false, position: 1, image: "/Better_Pass/images/image1.png" },
  { id: 2, rarity: "rare", isPremium: false, position: 2, image: "/Better_Pass/images/image2.png" },
  { id: 3, rarity: "legendary", isPremium: false, position: 3, image: "/Better_Pass/images/image3.png" },
  { id: 4, rarity: "mythic", isPremium: false, position: 4, image: "/Better_Pass/images/image4.png" },
  { id: 5, rarity: "common", isPremium: false, position: 5, image: "/Better_Pass/images/image5.png" },
  { id: 6, rarity: "rare", isPremium: false, position: 6, image: "/Better_Pass/images/image6.png" },
  { id: 7, rarity: "epic", isPremium: false, position: 7, image: "/Better_Pass/images/image7.png" },
  { id: 8, rarity: "common", isPremium: false, position: 8, image: "/Better_Pass/images/image8.png" },
  { id: 9, rarity: "legendary", isPremium: false, position: 9, image: "/Better_Pass/images/image9.png" },
  { id: 10, rarity: "mythic", isPremium: false, position: 10, image: "/Better_Pass/images/image10.png" },
  { id: 11, rarity: "rare", isPremium: false, position: 11, image: "/Better_Pass/images/image11.png" },
  { id: 12, rarity: "common", isPremium: false, position: 12, image: "/Better_Pass/images/image12.png" },
  { id: 13, rarity: "legendary", isPremium: false, position: 13, image: "/Better_Pass/images/image13.png" },
  { id: 14, rarity: "epic", isPremium: false, position: 14, image: "/Better_Pass/images/image14.png" },
  { id: 15, rarity: "rare", isPremium: false, position: 15, image: "/Better_Pass/images/image15.png" },
  { id: 16, rarity: "mythic", isPremium: false, position: 16, image: "/Better_Pass/images/image16.png" },
  { id: 17, rarity: "common", isPremium: false, position: 17, image: "/Better_Pass/images/image17.png" },
  { id: 18, rarity: "legendary", isPremium: false, position: 18, image: "/Better_Pass/images/image18.png" },
  { id: 19, rarity: "epic", isPremium: false, position: 19, image: "/Better_Pass/images/image19.png" },
  { id: 20, rarity: "rare", isPremium: false, position: 20, image: "/Better_Pass/images/image20.png" },
  { id: 21, rarity: "mythic", isPremium: false, position: 21, image: "/Better_Pass/images/image21.png" },
  { id: 22, rarity: "legendary", isPremium: false, position: 22, image: "/Better_Pass/images/image22.png" },
  { id: 23, rarity: "epic", isPremium: false, position: 23, image: "/Better_Pass/images/image23.png" },
  { id: 24, rarity: "rare", isPremium: false, position: 24, image: "/Better_Pass/images/image24.png" },
  { id: 25, rarity: "mythic", isPremium: false, position: 25, image: "/Better_Pass/images/image25.png" },
];
const premiumPassRewards = [
  { id: 26, rarity: "uncommon", isPremium: true, position: 1, image: "/Better_Pass/images/image26.png" },
  { id: 27, rarity: "epic", isPremium: true, position: 2, image: "/Better_Pass/images/image27.png" },
  { id: 28, rarity: "mythic", isPremium: true, position: 3, image: "/Better_Pass/images/image28.png" },
  { id: 29, rarity: "legendary", isPremium: true, position: 4, image: "/Better_Pass/images/image29.png" },
  { id: 30, rarity: "epic", isPremium: true, position: 5, image: "/Better_Pass/images/image30.png" },
  { id: 31, rarity: "mythic", isPremium: true, position: 6, image: "/Better_Pass/images/image31.png" },
  { id: 32, rarity: "legendary", isPremium: true, position: 7, image: "/Better_Pass/images/image32.png" },
  { id: 33, rarity: "epic", isPremium: true, position: 8, image: "/Better_Pass/images/image33.png" },
  { id: 34, rarity: "mythic", isPremium: true, position: 9, image: "/Better_Pass/images/image34.png" },
  { id: 35, rarity: "legendary", isPremium: true, position: 10, image: "/Better_Pass/images/image35.png" },
  { id: 36, rarity: "epic", isPremium: true, position: 11, image: "/Better_Pass/images/image36.png" },
  { id: 37, rarity: "mythic", isPremium: true, position: 12, image: "/Better_Pass/images/image37.png" },
  { id: 38, rarity: "legendary", isPremium: true, position: 13, image: "/Better_Pass/images/image38.png" },
  { id: 39, rarity: "epic", isPremium: true, position: 14, image: "/Better_Pass/images/image39.png" },
  { id: 40, rarity: "mythic", isPremium: true, position: 15, image: "/Better_Pass/images/image40.png" },
  { id: 41, rarity: "legendary", isPremium: true, position: 16, image: "/Better_Pass/images/image41.png" },
  { id: 42, rarity: "epic", isPremium: true, position: 17, image: "/Better_Pass/images/image42.png" },
  { id: 43, rarity: "mythic", isPremium: true, position: 18, image: "/Better_Pass/images/image43.png" },
  { id: 44, rarity: "legendary", isPremium: true, position: 19, image: "/Better_Pass/images/image44.png" },
  { id: 45, rarity: "epic", isPremium: true, position: 20, image: "/Better_Pass/images/image45.png" },
  { id: 46, rarity: "mythic", isPremium: true, position: 21, image: "/Better_Pass/images/image46.png" },
  { id: 47, rarity: "legendary", isPremium: true, position: 22, image: "/Better_Pass/images/image47.png" },
  { id: 48, rarity: "epic", isPremium: true, position: 23, image: "/Better_Pass/images/image48.png" },
  { id: 49, rarity: "mythic", isPremium: true, position: 24, image: "/Better_Pass/images/image49.png" },
  { id: 50, rarity: "legendary", isPremium: true, position: 25, image: "/Better_Pass/images/image50.png" },
];

function App() {
  const [currentLevel] = useState(5);
  const [goldAmount] = useState(3580);
  const [shopBundleTime] = useState("1h 50m 54s");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeReward, setActiveReward] = useState<Reward | null>(null);
  const [streamingBoxPosition, setStreamingBoxPosition] = useState({
    top: 50,
    left: 20,
  });
  const [missionsBoxPosition, setMissionsBoxPosition] = useState({
    top: 200,
    left: 300,
  });
  const [xpBoostBoxPosition, setXpBoostBoxPosition] = useState({
    top: 440,
    left: 300,
  });
  const [playerInfoPosition, setPlayerInfoPosition] = useState({
    top: 200,
    left: 1042,
  });
  const [battlePosition, setBattlePosition] = useState({
    top: 330,
    left: 1042,
  });
  const [unlockAllPosition, setUnlockAllPosition] = useState({
    top: 420,
    left: 640,
  });
  const [seasonEndsPosition, setSeasonEndsPosition] = useState({
    top: 480,
    left: 673,
  });
  const [battlePassPosition, setBattlePassPosition] = useState({
    top: 170,
    left: 663,
  });
  const [socialLinksPosition, setSocialLinksPosition] = useState({
    top: 50,
    left: 1385,
  });
  const [battlePassRewardsPosition, setBattlePassRewardsPosition] =
    useState({
      top: 200,
      left: 512,
    });
  const [googlePlayPosition, setGooglePlayPosition] = useState({
    top: 350,
    left: 20,
  });
  const [appStorePosition, setAppStorePosition] = useState({
    top: 410,
    left: 20,
  });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isSoloDropdownOpen, setIsSoloDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Solo");
  const rewardWidth = 96;
  const containerWidth = 5 * rewardWidth;
  const [isPremium] = useState(false);
  const [levelInfo] = useState({ level: 10 });
  const [isClassicDropdownOpen, setIsClassicDropdownOpen] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState("Classic");

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
  const isLevelVisible = (level: number) => {
    const levelPosition = (level - 1) * rewardWidth;
    return (
      levelPosition >= scrollPosition &&
      levelPosition <= scrollPosition + containerWidth
    );
  };
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500";
      case "uncommon":
        return "bg-green-500";
      case "rare":
        return "bg-blue-500";
      case "epic":
        return "bg-purple-500";
      case "legendary":
        return "bg-yellow-500";
      case "mythic":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "shadow-gray-500/30";
      case "uncommon":
        return "shadow-green-500/30";
      case "rare":
        return "shadow-blue-500/30";
      case "epic":
        return "shadow-purple-500/30";
      case "legendary":
        return "shadow-yellow-500/30";
      case "mythic":
        return "shadow-orange-500/30";
      default:
        return "shadow-gray-500/30";
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-600";
      case "uncommon":
        return "border-green-600";
      case "rare":
        return "border-blue-600";
      case "epic":
        return "border-purple-600";
      case "legendary":
        return "border-yellow-600";
      case "mythic":
        return "border-orange-600";
      default:
        return "border-gray-600";
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-300";
      case "uncommon":
        return "text-green-300";
      case "rare":
        return "text-blue-300";
      case "epic":
        return "text-purple-300";
      case "legendary":
        return "text-yellow-300";
      case "mythic":
        return "text-orange-300";
      default:
        return "text-gray-300";
    }
  };

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

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                         url(/Better_Pass/images/imagebackground.png)`,
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
          <button className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-md flex items-center">
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
            Support
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
            className="bg-black rounded-lg p-4 border border-gray-800"
            style={{
              position: "absolute",
              top: xpBoostBoxPosition.top,
              left: xpBoostBoxPosition.left,
            }}
          >
            <div className="text-center mb-4">
              <p className="text-sm">
                Get{" "}
                <span className="font-bold text-yellow-400">XP Boost</span> on
                Mobile App
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
          {/* Battle Pass Header */}
          <div
            style={{
              position: "absolute",
              top: battlePassPosition.top,
              left: battlePassPosition.left,
            }}
          >
            <h2 className="text-xl font-bold flex items-center justify-center">
              <Shield size={20} className="mr-2 text-green-400" />
              <span className="text-yellow-500">SurvivX.io Pass 1</span>
            </h2>
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
          {/* Level Numbers */}
          <div className="flex relative justify-start">
            {[...Array(25)].map((_, index) => {
              const level = index + 1;
              const freeReward = freePassRewards[index];
              const premiumReward = premiumPassRewards[index];

              const isVisible =
                (freeReward && isLevelVisible(freeReward.position)) ||
                (premiumReward && isLevelVisible(premiumReward.position));
              let leftPosition = `${
                (rewardWidth * index) / (rewardWidth * 24)
              * 100}%`;

              return isVisible ? (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: leftPosition,
                    width: `${100 / 25}%`,
                    textAlign: "center",
                    top: "-30px",
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                      level <= currentLevel
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-white"
                    } font-bold text-sm`}
                  >
                    {level}
                  </div>
                </div>
              ) : null;
            })}
          </div>

          {/* Combined Rewards */}
          <div
            className="flex overflow-x-auto scrollbar-hide relative mt-10"
            ref={scrollContainerRef}
            style={{ width: `${containerWidth}px` }}
          >
            <div className="flex flex-col">
              {/* Free Pass Rewards */}
              <div className="flex">
                {freePassRewards.map((reward) => (
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
            Season Ends: 82d 22h 35m 0s
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
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded">
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
                New Bundles: 04h 1m 50s
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
                  </h3>

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
                &copy; 2024 SurvivX.io. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reward Details Modal */}
      {activeReward && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 max-w-md w-full border-2 border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center text-yellow-400">
                <Trophy size={20} className="mr-2" />
                Reward Details
              </h3>
              <button
                onClick={() => setActiveReward(null)}
                className="text-gray-400 hover:text-white bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-all hover:bg-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div
                className={`${getRarityColor(activeReward.rarity)} ${getRarityGlow(activeReward.rarity)} w-32 h-32 rounded-lg flex items-center justify-center border-4 ${getRarityBorder(activeReward.rarity)} transform transition-all hover:scale-105`}
              >
                {activeReward.image ? (
                  <img
                    src={activeReward.image}
                    alt={`Reward ${activeReward.id}`}
                    className="w-24 h-24 object-contain"
                  />
                ) : (
                  React.cloneElement(activeReward.icon as React.ReactElement, {
                    size: 64,
                  })
                )}
              </div>
            </div>

            <div className="space-y-2 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-400 flex items-center">
                  <Star size={16} className="mr-1 text-yellow-400" />
                  Rarity:
                </span>
                <span
                  className={`font-bold ${getRarityTextColor(
                    activeReward.rarity
                  )}`}
                >
                  {activeReward.rarity.charAt(0).toUpperCase() +
                    activeReward.rarity.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 flex items-center">
                  <Medal size={16} className="mr-1 text-yellow-400" />
                  Level:
                </span>
                <span className="font-bold">{activeReward.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 flex items-center">
                  <Crown size={16} className="mr-1 text-yellow-400" />
                  Pass:
                </span>
                <span
                  className={`font-bold ${
                    activeReward.isPremium ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {activeReward.isPremium ? "Premium" : "Free"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center ${
                  levelInfo.level >= activeReward.position &&
                  (!activeReward.isPremium || isPremium)
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 text-white"
                    : "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed text-gray-300"
                }`}
                disabled={
                  levelInfo.level < activeReward.position ||
                  (activeReward.isPremium && !isPremium)
                }
              >
                {levelInfo.level >= activeReward.position &&
                (!activeReward.isPremium || isPremium) ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Claim Reward
                  </>
                ) : levelInfo.level < activeReward.position ? (
                  <>
                    <Lock size={20} className="mr-2" />
                    {`Unlock at Level ${activeReward.position}`}
                  </>
                ) : activeReward.isPremium && !isPremium ? (
                  <>
                    <Lock size={20} className="mr-2" />
                    Premium Only
                  </>
                ) : (
                  <>
                    <Lock size={20} className="mr-2" />
                    Locked
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

