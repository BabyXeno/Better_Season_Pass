import React, { useState, useEffect } from "react";
import {Shield,Eye,Zap,Trophy,Sword,Crown,Heart,Diamond,Flame,Smile,Shirt,Lock,Check,Star,Gift,Sparkles,Clock,Medal,ChevronRight,X,} from "lucide-react";

interface RadioactiveIconProps {
  size: number;
}

const RadioactiveIcon = ({ size }: RadioactiveIconProps) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-pulse" />
    <div className="absolute inset-2 bg-yellow-400 rounded-full animate-ping opacity-50" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1/2 h-1/2 bg-yellow-400 rounded-full" />
    </div>
    <div className="absolute inset-0 rounded-full border border-yellow-200 animate-spin opacity-70" />
  </div>
);

interface Reward {
  id: number;
  icon: React.ReactNode;
  rarity:
    | "common"
    | "uncommon"
    | "rare"
    | "epic"
    | "legendary"
    | "mythic";
  isPremium: boolean;
  position: number;
  image?: string;
}

interface Quest {
  id: number;
  title: string;
  gp: number;
  completed: boolean;
  removing?: boolean;
}

const questPool = [
  "Win a match with 10+ kills",
  "Survive in the red zone for 2 minutes",
  "Find 3 golden potatoes",
  "Deal 1000 damage in a single match",
  "Use 5 different weapons in one match",
  "Heal teammates 5 times",
  "Get 3 kills with grenades",
  "Travel 5000 meters in vehicles",
  "Break 50 obstacles",
  "Reach top 5 in solo mode",
  "Win a match without healing items",
  "Get 5 kills with pistols only",
  "Survive 3 matches for 10+ minutes",
  "Find 3 airdrops",
  "Win a match in squad mode",
  "Get 3 melee kills",
  "Use 10 bandages in one match",
  "Deal damage with 5 different weapons",
  "Break 20 trees",
  "Find rare loot in 3 different locations",
  "Win a match with full health",
  "Get 3 kills within 1 minute",
  "Survive in the final circle for 2 minutes",
  "Find 5 scopes in one match",
  "Win without using any scopes",
  "Get 5 kills from behind cover",
  "Travel the entire map border",
  "Find 3 mythic weapons",
];

const EnhancedBattlePass = () => {
  const [currentGP, setCurrentGP] = useState(0);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [displayedQuests, setDisplayedQuests] = useState<Quest[]>([]);
  const [activeReward, setActiveReward] = useState<Reward | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [hoveredReward, setHoveredReward] = useState<number | null>(null);
  const [levelProgress, setLevelProgress] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const getRandomQuest = (): Quest => {
    const randomTitle =
      questPool[Math.floor(Math.random() * questPool.length)];
    const randomGP = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    return {
      id: Math.random(),
      title: randomTitle,
      gp: randomGP,
      completed: false,
    };
  };

  const refreshQuests = () => {
    const newQuests = Array.from({ length: 3 }, () => getRandomQuest());
    setDisplayedQuests(newQuests);
  };

  useEffect(() => {
    refreshQuests();
  }, []);

  const rewards: Reward[] = [
      // Free Pass Rewards (Top Row)
      { id: 1, icon: <Shield size={24} />, rarity: "common", isPremium: false, position: 1, image: "/Better_Pass/images/image1.png" },
      { id: 2, icon: <Eye size={24} />, rarity: "rare", isPremium: false, position: 2, image: "/Better_Pass/images/image2.png" },
      { id: 3, icon: <RadioactiveIcon size={24} />, rarity: "legendary", isPremium: false, position: 3, image: "/Better_Pass/images/image3.png" },
      { id: 4, icon: <Trophy size={24} />, rarity: "mythic", isPremium: false, position: 4, image: "/Better_Pass/images/image4.png" },
      { id: 5, icon: <Shield size={24} />, rarity: "common", isPremium: false, position: 5, image: "/Better_Pass/images/image5.png" },
      { id: 6, icon: <Sword size={24} />, rarity: "rare", isPremium: false, position: 6, image: "/Better_Pass/images/image6.png" },
      { id: 7, icon: <Crown size={24} />, rarity: "epic", isPremium: false, position: 7, image: "/Better_Pass/images/image7.png" },
      { id: 8, icon: <Heart size={24} />, rarity: "common", isPremium: false, position: 8, image: "/Better_Pass/images/image8.png" },
      { id: 9, icon: <Zap size={24} />, rarity: "legendary", isPremium: false, position: 9, image: "/Better_Pass/images/image9.png" },
      { id: 10, icon: <Diamond size={24} />, rarity: "mythic", isPremium: false, position: 10, image: "/Better_Pass/images/image10.png" },
      { id: 11, icon: <Flame size={24} />, rarity: "rare", isPremium: false, position: 11, image: "/Better_Pass/images/image11.png" },
      { id: 12, icon: <Shield size={24} />, rarity: "common", isPremium: false, position: 12, image: "/Better_Pass/images/image12.png" },
      { id: 13, icon: <Trophy size={24} />, rarity: "legendary", isPremium: false, position: 13, image: "/Better_Pass/images/image13.png" },
      { id: 14, icon: <Eye size={24} />, rarity: "epic", isPremium: false, position: 14, image: "/Better_Pass/images/image14.png" },
      { id: 15, icon: <Sword size={24} />, rarity: "rare", isPremium: false, position: 15, image: "/Better_Pass/images/image15.png" },
      { id: 16, icon: <Crown size={24} />, rarity: "mythic", isPremium: false, position: 16, image: "/Better_Pass/images/image16.png" },
      { id: 17, icon: <Heart size={24} />, rarity: "common", isPremium: false, position: 17, image: "/Better_Pass/images/image17.png" },
      { id: 18, icon: <Zap size={24} />, rarity: "legendary", isPremium: false, position: 18, image: "/Better_Pass/images/image18.png" },
      { id: 19, icon: <Diamond size={24} />, rarity: "epic", isPremium: false, position: 19, image: "/Better_Pass/images/image19.png" },
      { id: 20, icon: <Flame size={24} />, rarity: "rare", isPremium: false, position: 20, image: "/Better_Pass/images/image20.png" },
      { id: 21, icon: <Shield size={24} />, rarity: "mythic", isPremium: false, position: 21, image: "/Better_Pass/images/image21.png" },
      { id: 22, icon: <Trophy size={24} />, rarity: "legendary", isPremium: false, position: 22, image: "/Better_Pass/images/image22.png" },
      { id: 23, icon: <Eye size={24} />, rarity: "epic", isPremium: false, position: 23, image: "/Better_Pass/images/image23.png" },
      { id: 24, icon: <Sword size={24} />, rarity: "rare", isPremium: false, position: 24, image: "/Better_Pass/images/image24.png" },
      { id: 25, icon: <Crown size={24} />, rarity: "mythic", isPremium: false, position: 25, image: "/Better_Pass/images/image25.png" },
      // Premium Pass Rewards (Bottom Row)
      { id: 26, icon: <Smile size={24} />, rarity: "uncommon", isPremium: true, position: 1, image: "/Better_Pass/images/image26.png" },
      { id: 27, icon: <Shirt size={24} />, rarity: "epic", isPremium: true, position: 2, image: "/Better_Pass/images/image27.png" },
      { id: 28, icon: <Trophy size={24} />, rarity: "mythic", isPremium: true, position: 3, image: "/Better_Pass/images/image28.png" },
      { id: 29, icon: <RadioactiveIcon size={24} />, rarity: "legendary", isPremium: true, position: 4, image: "/Better_Pass/images/image29.png" },
      { id: 30, icon: <Crown size={24} />, rarity: "epic", isPremium: true, position: 5, image: "/Better_Pass/images/image30.png" },
      { id: 31, icon: <Diamond size={24} />, rarity: "mythic", isPremium: true, position: 6, image: "/Better_Pass/images/image31.png" },
      { id: 32, icon: <Flame size={24} />, rarity: "legendary", isPremium: true, position: 7, image: "/Better_Pass/images/image32.png" },
      { id: 33, icon: <Sword size={24} />, rarity: "epic", isPremium: true, position: 8, image: "/Better_Pass/images/image33.png" },
      { id: 34, icon: <Heart size={24} />, rarity: "mythic", isPremium: true, position: 9, image: "/Better_Pass/images/image34.png" },
      { id: 35, icon: <Zap size={24} />, rarity: "legendary", isPremium: true, position: 10, image: "/Better_Pass/images/image35.png" },
      { id: 36, icon: <Shield size={24} />, rarity: "epic", isPremium: true, position: 11, image: "/Better_Pass/images/image36.png" },
      { id: 37, icon: <Trophy size={24} />, rarity: "mythic", isPremium: true, position: 12, image: "/Better_Pass/images/image37.png" },
      { id: 38, icon: <Eye size={24} />, rarity: "legendary", isPremium: true, position: 13, image: "/Better_Pass/images/image38.png" },
      { id: 39, icon: <Crown size={24} />, rarity: "epic", isPremium: true, position: 14, image: "/Better_Pass/images/image39.png" },
      { id: 40, icon: <Diamond size={24} />, rarity: "mythic", isPremium: true, position: 15, image: "/Better_Pass/images/image40.png" },
      { id: 41, icon: <Flame size={24} />, rarity: "legendary", isPremium: true, position: 16, image: "/Better_Pass/images/image41.png" },
      { id: 42, icon: <Sword size={24} />, rarity: "epic", isPremium: true, position: 17, image: "/Better_Pass/images/image42.png" },
      { id: 43, icon: <Heart size={24} />, rarity: "mythic", isPremium: true, position: 18, image: "/Better_Pass/images/image43.png" },
      { id: 44, icon: <Zap size={24} />, rarity: "legendary", isPremium: true, position: 19, image: "/Better_Pass/images/image44.png" },
      { id: 45, icon: <Shield size={24} />, rarity: "epic", isPremium: true, position: 20, image: "/Better_Pass/images/image45.png" },
      { id: 46, icon: <Trophy size={24} />, rarity: "mythic", isPremium: true, position: 21, image: "/Better_Pass/images/image46.png" },
      { id: 47, icon: <Eye size={24} />, rarity: "legendary", isPremium: true, position: 22, image: "/Better_Pass/images/image47.png" },
      { id: 48, icon: <Crown size={24} />, rarity: "epic", isPremium: true, position: 23, image: "/Better_Pass/images/image48.png" },
      { id: 49, icon: <Diamond size={24} />, rarity: "mythic", isPremium: true, position: 24, image: "/Better_Pass/images/image49.png" },
      { id: 50, icon: <Flame size={24} />, rarity: "legendary", isPremium: true, position: 25, image: "/Better_Pass/images/image50.png" },
    ];
    
    const getRarityColor = (rarity: string) => {
      const colors = {
          common: "bg-gradient-to-br from-gray-300 to-gray-500",
          uncommon: "bg-gradient-to-br from-green-400 to-green-600",
          rare: "bg-gradient-to-br from-blue-400 to-blue-600",
          epic: "bg-gradient-to-br from-purple-400 to-purple-600",
          legendary: "bg-gradient-to-br from-orange-300 to-orange-600",
          mythic: "bg-gradient-to-br from-red-400 to-red-600",
      };
      return colors[rarity as keyof typeof colors];
  };
  const getRarityBorder = (rarity: string) => {
      const borders = {
          common: "border-gray-400",
          uncommon: "border-green-500",
          rare: "border-blue-500",
          epic: "border-purple-500",
          legendary: "border-orange-500",
          mythic: "border-red-500",
      };
      return borders[rarity as keyof typeof borders];
  };
  const getRarityGlow = (rarity: string) => {
      const glows = {
          common: "",
          uncommon: "",
          rare: "shadow-md shadow-blue-500/50",
          epic: "shadow-md shadow-purple-500/50",
          legendary: "shadow-lg shadow-orange-500/60",
          mythic: "shadow-xl shadow-red-500/70",
      };
      return glows[rarity as keyof typeof glows];
  };
  const getRarityTextColor = (rarity: string) => {
      const colors = {
          common: "text-gray-300",
          uncommon: "text-green-400",
          rare: "text-blue-400",
          epic: "text-purple-400",
          legendary: "text-orange-400",
          mythic: "text-red-400",
      };
      return colors[rarity as keyof typeof colors];
  };
  const handleQuestComplete = (questId: number) => {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1500);
      setDisplayedQuests((prevDisplayedQuests) => {
          const updatedQuests = prevDisplayedQuests.map((quest) => {
              if (quest.id === questId && !quest.completed) {
                  setCurrentGP((prev) => prev + quest.gp);
                  return {
                      ...quest,
                      completed: true,
                      removing: true
                  };
              }
              return quest;
          });
          return updatedQuests;
      });
      setTimeout(() => {
          setDisplayedQuests((prevDisplayedQuests) => {
              const newQuests = prevDisplayedQuests.filter(
                  (q) => q.id !== questId, );
              let newQuest: Quest;
              do {
                  newQuest = getRandomQuest();
              } while (newQuests.some((q) => q.title === newQuest.title));
              const finalQuests = [...newQuests, newQuest].slice(0, 3);
              return finalQuests;
          });
      }, 500);
  };
  const calculateLevel = (gp: number) => {
      let level = 1;
      let remainingGP = gp;
      while (remainingGP >= 0) {
          const requiredGP = level === 1 ? 100 : 100 + (level - 1) * 10;
          if (remainingGP < requiredGP) break;
          remainingGP -= requiredGP;
          level++;
      }
      const currentLevelGP = level === 1 ? 100 : 100 + (level - 1) * 10;
      return {
          level: level - 1,
          progress: remainingGP,
          required: currentLevelGP,
      };
  };
  useEffect(() => {
      setLevelProgress(levelInfo.level);
  }, [currentGP]);
  const levelInfo = calculateLevel(currentGP);
  const progressPercent = (levelInfo.progress / levelInfo.required) * 100;
  const fullProgressPercent = (currentGP / (25 * 100 + 24 * 10)) * 100;
  return (<div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white p-4 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center bg-blend-overlay bg-opacity-80">
        {/* Particle effect background */}
        <div className="fixed inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <div
            className="absolute top-3/4 left-1/2 w-2 h-2 bg-purple-500 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/4 left-3/4 w-2 h-2 bg-yellow-500 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-2/3 left-1/3 w-2 h-2 bg-pink-500 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
  
        {showAnimation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-6xl font-bold text-yellow-400 animate-bounce flex items-center">
              <Sparkles size={48} className="mr-2 animate-spin" />
              <span className="animate-pulse">+{levelInfo.progress} GP</span>
              <Sparkles size={48} className="ml-2 animate-spin" />
            </div>
          </div>
        )}
  
        {/* Premium Shop Modal */}
  {
    showPremiumModal && (
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
                      <span className="text-yellow-400 font-bold">16000</span>
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
                      <span className="text-yellow-400 font-bold">53000</span>
                    </div>
                    <div className="bg-blue-600 rounded py-1 text-white font-bold">
                      $99.99
                    </div>
                  </div>
                </div>
  
                <button
                  onClick={() => {
                    /* Free GP logic */
                  }}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 border-2 border-yellow-700 text-black font-bold py-2 rounded hover:brightness-110 flex items-center justify-center"
                >
                  Get Free GP
                  <img
                    src="/Better_Pass/images/imagegp.png"
                    alt="GP"
                    className="w-4 h-4 ml-1"
                  />
                </button>
              </div>
            </div>
  
            {/* Exclusive Offers */}
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-2 gap-4">
                {/* First Bundle */}
                <div className="bg-purple-900 bg-opacity-60 rounded-lg border border-purple-700 p-3 relative">
                  {/* Discount Tag */}
                  <div className="absolute -top-2 -left-2 bg-yellow-500 text-black font-bold text-xs py-1 px-2 rounded transform rotate-315 z-10">
                    20% OFF
                  </div>
  
                  <div className="flex gap-2">
                    <div className="bg-teal-800 border-2 border-teal-600 rounded p-2 w-1/2 flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src="/Better_Pass/images/image1.png"
                          alt="Item 1"
                          className="w-10 h-10 mx-auto"
                        />
                      </div>
                    </div>
  
                    <div className="bg-purple-800 border-2 border-purple-600 rounded p-2 w-1/2 flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src="/Better_Pass/images/image2.png"
                          alt="Item 2"
                          className="w-10 h-10 mx-auto"
                        />
                      </div>
                    </div>
                  </div>
  
                  <div className="flex items-center justify-center mt-3">
                    <img
                      src="/Better_Pass/images/imagegp.png"
                      alt="GP"
                      className="w-4 h-4 mr-1"
                    />
                    <span className="text-yellow-400 font-bold">997</span>
                  </div>
                </div>
  
                {/* Second Bundle */}
                <div className="bg-purple-900 bg-opacity-60 rounded-lg border border-purple-700 p-3 relative">
                  {/* Discount Tag */}
                  <div className="absolute -top-2 -left-2 bg-yellow-500 text-black font-bold text-xs py-1 px-2 rounded transform rotate-315 z-10">
                    40% OFF
                  </div>
  
                  <div className="grid grid-cols-3 gap-1 mb-2">
                    <div className="bg-teal-800 border-2 border-teal-600 rounded p-1 flex items-center justify-center">
                      <img
                        src="/Better_Pass/images/image3.png"
                        alt="Item 1"
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="bg-teal-800 border-2 border-teal-600 rounded p-1 flex items-center justify-center">
                      <img
                        src="/Better_Pass/images/image4.png"
                        alt="Item 2"
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="bg-teal-800 border-2 border-teal-600 rounded p-1 flex items-center justify-center">
                      <img
                        src="/Better_Pass/images/image26.png"
                        alt="Item 3"
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
  
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-purple-800 border-2 border-purple-600 rounded p-1 flex items-center justify-center">
                      <img
                        src="/Better_Pass/images/image27.png"
                        alt="Item 4"
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="bg-purple-800 border-2 border-purple-600 rounded p-1 flex items-center justify-center">
                      <img
                        src="/Better_Pass/images/image28.png"
                        alt="Item 5"
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
  
                  <div className="flex items-center justify-center mt-3">
                    <img
                      src="/Better_Pass/images/imagegp.png"
                      alt="GP"
                      className="w-4 h-4 mr-1"
                    />
                    <span className="text-yellow-400 font-bold">1320</span>
                  </div>
                </div>
              </div>
  
              {/* Premium Pass Button */}
              <button
                onClick={() => {
                  setIsPremium(true);
                  setShowPremiumModal(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold py-3 px-6 rounded-lg mt-4 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Crown className="mr-2" />
                Upgrade to Premium Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  
        {activeReward && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 backdrop-blur-sm">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 max-w-md w-full border-2 border-gray-700 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Trophy size={20} className="mr-2 text-yellow-400" />
                  Reward Details
                </h3>
                <button
                  onClick={() => setActiveReward(null)}
                  className="text-gray-400 hover:text-white bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-all hover:bg-gray-600"
                >
                  ✕
                </button>
              </div>
  
              <div className="flex items-center justify-center mb-6">
                <div
                  className={`${getRarityColor(
                    activeReward.rarity,
                  )} ${getRarityGlow(
                    activeReward.rarity,
                  )} w-32 h-32 rounded-lg flex items-center justify-center border-4 ${getRarityBorder(
                    activeReward.rarity,
                  )} transform transition-all hover:scale-105`}
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
                      activeReward.rarity,
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
        levelInfo.level >= activeReward.position && (!activeReward.isPremium || isPremium)
          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30"
          : "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed"
      }`}
      disabled={levelInfo.level < activeReward.position || (activeReward.isPremium && !isPremium)}
    >
      {levelInfo.level >= activeReward.position && (!activeReward.isPremium || isPremium) ? (
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
  
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 bg-gray-800 bg-opacity-60 p-4 rounded-lg backdrop-blur-md border border-gray-700 shadow-lg">
            <div>
              <h1 className="text-3xl font-bold mb-1 flex items-center">
                <Crown size={28} className="mr-2 text-yellow-400" />
                SurvivX.io Pass
                {isPremium && (
                  <span className="ml-2 text-sm bg-yellow-500 text-black px-2 py-1 rounded-full font-bold">
                    PREMIUM
                  </span>
                )}
              </h1>
              <div className="flex items-center text-gray-300">
                <Clock size={16} className="mr-1" />
                <span>Season ends in 14d 6h 32m</span>
              </div>
            </div>
  
            <div className="flex items-center space-x-4">
              {!isPremium && (
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center"
                >
                  <Gift size={20} className="mr-2" />
                  Upgrade to Premium
                </button>
              )}
  
              <div className="bg-gray-900 bg-opacity-70 rounded-lg p-2 flex items-center space-x-2 border border-gray-700">
                <div className="bg-yellow-500 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold">
                  GP
                </div>
                <span className="font-bold text-lg">{currentGP}</span>
              </div>
            </div>
          </div>
  
          {/* Main progress bar */}
          <div className="mb-8 bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 mr-3">
                  {levelInfo.level}
                </div>
                <div>
                  <h2 className="font-bold text-xl">Current Level</h2>
                  <p className="text-gray-300 text-sm">
                    {levelInfo.progress} / {levelInfo.required} GP to next level
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {Math.min(Math.round(fullProgressPercent), 100)}% Complete
                </p>
                <p className="text-gray-300 text-sm">SurvivX.io Pass Progress</p>
              </div>
            </div>
  
            {/* Level progress bar with glow effect */}
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
  
          {/* Battle Pass Rewards Track */}
          <div className="mb-8 bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-2xl flex items-center">
                <Gift size={24} className="mr-2 text-purple-400" />
                Rewards Track
              </h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-white mr-1"></div>
                  <span className="text-sm text-gray-300">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                  <span className="text-sm text-gray-300">Locked</span>
                </div>
              </div>
            </div>
  
            {/* Rewards track with glass effect */}
            <div className="relative">
              {/* Free pass track background */}
              <div className="h-16 bg-gray-700 bg-opacity-50 rounded-lg mb-4 backdrop-blur-md border border-gray-600"></div>
  
              {/* Premium pass track background */}
              <div className="h-16 bg-yellow-900 bg-opacity-20 rounded-lg backdrop-blur-md border border-yellow-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-10"></div>
                {!isPremium && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <button
                      onClick={() => setShowPremiumModal(true)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center"
                    >
                      <Lock size={16} className="mr-1" />
                      Unlock Premium
                    </button>
                  </div>
                )}
              </div>
  
              {/* Level markers */}
              <div className="absolute top-0 left-0 w-full flex justify-between px-4 -mt-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-xs font-bold mb-1">
                      Level {i * 5 + (i === 0 ? 1 : 0)}
                    </div>
                    <div className="h-4 w-px bg-gray-600"></div>
                  </div>
                ))}
              </div>
  
              {/* White line progress bar */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white bg-opacity-20 transform -translate-y-1/2 z-10">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{
                    width: `${(levelProgress / 25) * 100}%`,
                  }}
                ></div>
              </div>
  
              {/* Free rewards */}
              <div className="absolute top-0 left-0 right-0">
                <div className="flex justify-between items-center h-16 px-4">
                  {rewards
                    .filter((reward) => !reward.isPremium)
                    .map((reward) => (
                      <div
                        key={reward.id}
                        className={`w-12 h-12 flex items-center justify-center rounded-lg transform transition-all hover:scale-110 cursor-pointer ${
                          levelInfo.level >= reward.position
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                        onMouseEnter={() => setHoveredReward(reward.id)}
                        onMouseLeave={() => setHoveredReward(null)}
                        onClick={() => setActiveReward(reward)}
                      >
                        {hoveredReward === reward.id && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm z-10"></div>
                        )}
                        <div className="relative z-20">
                          {reward.image ? (
                            <img
                              src={reward.image}
                              alt={`Reward ${reward.id}`}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            React.cloneElement(
                              reward.icon as React.ReactElement,
                              { size: 32 },
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
  
              {/* Premium rewards */}
              <div className="absolute top-16 left-0 right-0">
                <div className="flex justify-between items-center h-16 px-4">
                  {rewards
                    .filter((reward) => reward.isPremium)
                    .map((reward) => (
                      <div
                        key={reward.id}
                        className={`w-12 h-12 flex items-center justify-center rounded-lg transform transition-all hover:scale-110 cursor-pointer ${
                          levelInfo.level >= reward.position
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                        onMouseEnter={() => setHoveredReward(reward.id)}
                        onMouseLeave={() => setHoveredReward(null)}
                        onClick={() => setActiveReward(reward)}
                      >
                        {hoveredReward === reward.id && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm z-10"></div>
                        )}
                        <div className="relative z-20">
                          {reward.image ? (
                            <img
                              src={reward.image}
                              alt={`Reward ${reward.id}`}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            React.cloneElement(
                              reward.icon as React.ReactElement,
                              { size: 32 },
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Daily Quests */}
          <div className="mb-8 bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-2xl flex items-center">
                <Star size={24} className="mr-2 text-yellow-400" />
                Daily Missions
              </h2>
              <button 
                onClick={refreshQuests}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center"
              >
                Refresh Missions <ChevronRight size={20} className="ml-2" />
              </button>
            </div>
  
            <div className="space-y-4">
              {displayedQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between bg-gray-700 bg-opacity-70 p-4 rounded-lg transition-all duration-300 border border-gray-600 backdrop-blur-sm ${
                    quest.removing
                      ? "opacity-0 transform translate-x-full"
                      : "opacity-100 transform translate-x-0"
                  }`}
                >
                  <div>
                    <h3 className="font-medium">{quest.title}</h3>
                    <p className="text-sm text-gray-400">{quest.gp} GP</p>
                  </div>
                  <button
                    onClick={() => handleQuestComplete(quest.id)}
                    disabled={quest.completed}
                    className={`p-2 rounded-full ${
                      quest.completed
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    <Check size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>);
  };
  export default EnhancedBattlePass;