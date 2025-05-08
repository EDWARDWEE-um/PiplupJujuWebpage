"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

// Types for our gamification system
export type RewardType = "discount" | "free_pack" | "loyalty_points" | "badge" | "xp"

export type Reward = {
  type: RewardType
  value: number | string
  description: string
  code?: string
  expiresAt?: Date
}

export type Achievement = {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
  category: "collection" | "purchase" | "engagement" | "special"
  reward?: Reward | Reward[]
}

export type DailyChallenge = {
  id: string
  name: string
  description: string
  progress: number
  target: number
  reward: Reward
  completed: boolean
  expires: Date
}

export type CollectionStats = {
  totalCards: number
  uniqueSets: number
  rarities: Record<string, number>
  completion: number
}

export type GamificationState = {
  level: number
  experience: number
  experienceToNextLevel: number
  achievements: Achievement[]
  dailyChallenges: DailyChallenge[]
  streakDays: number
  lastCheckIn: Date | null
  collectionStats: CollectionStats
  badges: string[]
  rewards: Reward[]
  loyaltyPoints: number
}

type GamificationContextType = {
  state: GamificationState
  addExperience: (amount: number) => void
  addLoyaltyPoints: (amount: number) => void
  completeAchievement: (id: string) => void
  updateAchievementProgress: (id: string, progress: number) => void
  completeDailyChallenge: (id: string) => void
  checkIn: () => boolean
  claimReward: (rewardId: string) => boolean
  redeemDiscount: (code: string) => { success: boolean; discount?: number }
  redeemFreePack: (code: string) => { success: boolean; packType?: string }
  openPack: (packType?: string) => Promise<any[]>
}

const defaultState: GamificationState = {
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  achievements: [],
  dailyChallenges: [],
  streakDays: 0,
  lastCheckIn: null,
  collectionStats: {
    totalCards: 0,
    uniqueSets: 0,
    rarities: {},
    completion: 0,
  },
  badges: [],
  rewards: [],
  loyaltyPoints: 0,
}

const GamificationContext = createContext<GamificationContextType>({
  state: defaultState,
  addExperience: () => {},
  addLoyaltyPoints: () => {},
  completeAchievement: () => {},
  updateAchievementProgress: () => {},
  completeDailyChallenge: () => {},
  checkIn: () => false,
  claimReward: () => false,
  redeemDiscount: () => ({ success: false }),
  redeemFreePack: () => ({ success: false }),
  openPack: async () => [],
})

// Sample achievements data with rewards
const sampleAchievements: Achievement[] = [
  {
    id: "first_purchase",
    name: "First Purchase",
    description: "Make your first purchase on PokéCollect",
    icon: "shopping-cart",
    unlocked: false,
    category: "purchase",
    reward: {
      type: "loyalty_points",
      value: 50,
      description: "50 Loyalty Points",
    },
  },
  {
    id: "collector_beginner",
    name: "Beginner Collector",
    description: "Add 10 cards to your collection",
    icon: "database",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: "collection",
    reward: [
      {
        type: "loyalty_points",
        value: 100,
        description: "100 Loyalty Points",
      },
      {
        type: "badge",
        value: "beginner_collector",
        description: "Beginner Collector Badge",
      },
    ],
  },
  {
    id: "set_completion",
    name: "Set Completer",
    description: "Complete your first full set",
    icon: "check-circle",
    unlocked: false,
    category: "collection",
    reward: [
      {
        type: "loyalty_points",
        value: 500,
        description: "500 Loyalty Points",
      },
      {
        type: "badge",
        value: "set_master",
        description: "Set Master Badge",
      },
      {
        type: "discount",
        value: 15,
        description: "15% off your next purchase",
        code: "SETMASTER15",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    ],
  },
  {
    id: "streak_week",
    name: "Weekly Visitor",
    description: "Check in for 7 days in a row",
    icon: "calendar",
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: "engagement",
    reward: [
      {
        type: "loyalty_points",
        value: 200,
        description: "200 Loyalty Points",
      },
      {
        type: "badge",
        value: "loyal_visitor",
        description: "Loyal Visitor Badge",
      },
      {
        type: "free_pack",
        value: "standard",
        description: "Free Standard Pack",
        code: "WEEKLYPACK",
      },
    ],
  },
  {
    id: "rip_or_ship",
    name: "Rip or Ship Enthusiast",
    description: "Participate in 5 Rip or Ship events",
    icon: "package-open",
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "engagement",
    reward: [
      {
        type: "loyalty_points",
        value: 300,
        description: "300 Loyalty Points",
      },
      {
        type: "discount",
        value: 10,
        description: "10% off your next Rip or Ship purchase",
        code: "RIPORSHIPFAN",
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      },
    ],
  },
  {
    id: "big_spender",
    name: "Big Spender",
    description: "Make a purchase of $200 or more",
    icon: "credit-card",
    unlocked: false,
    category: "purchase",
    reward: [
      {
        type: "loyalty_points",
        value: 400,
        description: "400 Loyalty Points",
      },
      {
        type: "free_pack",
        value: "premium",
        description: "Free Premium Pack",
        code: "BIGSPENDER",
      },
    ],
  },
  {
    id: "social_butterfly",
    name: "Social Butterfly",
    description: "Share 5 products on social media",
    icon: "share",
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "engagement",
    reward: {
      type: "discount",
      value: 5,
      description: "5% off your next purchase",
      code: "SOCIAL5",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  },
]

// Sample daily challenges with rewards
const generateDailyChallenges = (): DailyChallenge[] => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  return [
    {
      id: "daily_browse",
      name: "Window Shopping",
      description: "Browse 5 different product pages",
      progress: 0,
      target: 5,
      reward: {
        type: "loyalty_points",
        value: 20,
        description: "20 Loyalty Points",
      },
      completed: false,
      expires: tomorrow,
    },
    {
      id: "daily_wishlist",
      name: "Wishlist Builder",
      description: "Add an item to your wishlist",
      progress: 0,
      target: 1,
      reward: {
        type: "loyalty_points",
        value: 15,
        description: "15 Loyalty Points",
      },
      completed: false,
      expires: tomorrow,
    },
    {
      id: "daily_share",
      name: "Social Collector",
      description: "Share a product on social media",
      progress: 0,
      target: 1,
      reward: {
        type: "loyalty_points",
        value: 25,
        description: "25 Loyalty Points",
      },
      completed: false,
      expires: tomorrow,
    },
  ]
}

// Sample rewards
const sampleRewards: Reward[] = [
  {
    type: "discount",
    value: 10,
    description: "10% off your next purchase",
    code: "WELCOME10",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  },
  {
    type: "free_pack",
    value: "standard",
    description: "Free Standard Pack",
    code: "FREEPACK",
  },
]

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth()
  const [state, setState] = useState<GamificationState>(defaultState)

  // Initialize state when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app, you would fetch this data from your backend
      setState({
        ...defaultState,
        achievements: sampleAchievements,
        dailyChallenges: generateDailyChallenges(),
        loyaltyPoints: user.points || 100, // Default to 100 points for testing
        rewards: sampleRewards, // Add sample rewards for testing
      })
    }
  }, [isAuthenticated, user])

  // Calculate level based on experience
  useEffect(() => {
    if (state.experience > 0) {
      const newLevel = Math.floor(Math.sqrt(state.experience / 50)) + 1
      const expToNext = Math.pow(newLevel + 1, 2) * 50 - state.experience

      if (newLevel !== state.level) {
        setState((prev) => ({
          ...prev,
          level: newLevel,
          experienceToNextLevel: expToNext,
        }))
      }
    }
  }, [state.experience, state.level])

  // Add experience points
  const addExperience = (amount: number) => {
    setState((prev) => ({
      ...prev,
      experience: prev.experience + amount,
    }))
  }

  // Add loyalty points
  const addLoyaltyPoints = (amount: number) => {
    setState((prev) => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + amount,
    }))

    // In a real app, you would update the user's loyalty points in the backend
    toast({
      title: "Loyalty Points Added",
      description: `You earned ${amount} loyalty points!`,
    })
  }

  // Process rewards from an achievement or challenge
  const processRewards = (rewards: Reward | Reward[]) => {
    const rewardArray = Array.isArray(rewards) ? rewards : [rewards]

    rewardArray.forEach((reward) => {
      switch (reward.type) {
        case "xp":
          addExperience(reward.value as number)
          break
        case "loyalty_points":
          addLoyaltyPoints(reward.value as number)
          break
        case "badge":
          setState((prev) => ({
            ...prev,
            badges: [...prev.badges, reward.value as string],
          }))
          break
        case "discount":
        case "free_pack":
          setState((prev) => ({
            ...prev,
            rewards: [...prev.rewards, reward],
          }))
          toast({
            title: "New Reward Available",
            description: reward.description,
          })
          break
      }
    })
  }

  // Mark an achievement as completed
  const completeAchievement = (id: string) => {
    setState((prev) => {
      const updatedAchievements = prev.achievements.map((achievement) => {
        if (achievement.id === id && !achievement.unlocked) {
          // Process the rewards
          if (achievement.reward) {
            processRewards(achievement.reward)
          }
          return { ...achievement, unlocked: true }
        }
        return achievement
      })

      return {
        ...prev,
        achievements: updatedAchievements,
      }
    })
  }

  // Update progress on an achievement
  const updateAchievementProgress = (id: string, progress: number) => {
    setState((prev) => {
      const updatedAchievements = prev.achievements.map((achievement) => {
        if (achievement.id === id && !achievement.unlocked) {
          const newProgress = Math.min(progress, achievement.maxProgress || progress)

          // Check if achievement is now complete
          if (achievement.maxProgress && newProgress >= achievement.maxProgress) {
            completeAchievement(id)
          }

          return {
            ...achievement,
            progress: newProgress,
          }
        }
        return achievement
      })

      return {
        ...prev,
        achievements: updatedAchievements,
      }
    })
  }

  // Complete a daily challenge
  const completeDailyChallenge = (id: string) => {
    setState((prev) => {
      const updatedChallenges = prev.dailyChallenges.map((challenge) => {
        if (challenge.id === id && !challenge.completed) {
          // Process the reward
          processRewards(challenge.reward)
          return { ...challenge, completed: true, progress: challenge.target }
        }
        return challenge
      })

      return {
        ...prev,
        dailyChallenges: updatedChallenges,
      }
    })
  }

  // Daily check-in
  const checkIn = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // If user already checked in today
    if (state.lastCheckIn && state.lastCheckIn.getTime() === today.getTime()) {
      return false
    }

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Check if this continues a streak
    const isStreak = state.lastCheckIn && state.lastCheckIn.getTime() === yesterday.getTime()

    setState((prev) => ({
      ...prev,
      lastCheckIn: today,
      streakDays: isStreak ? prev.streakDays + 1 : 1,
    }))

    // Give streak rewards
    addExperience(10 + state.streakDays * 2)
    addLoyaltyPoints(5 + state.streakDays)

    // Check for streak achievements
    if (state.streakDays + 1 >= 7) {
      completeAchievement("streak_week")
    }

    return true
  }

  // Claim a reward
  const claimReward = (rewardId: string) => {
    const rewardIndex = state.rewards.findIndex((r) => r.code === rewardId)

    if (rewardIndex === -1) {
      toast({
        title: "Error",
        description: "Reward not found",
        variant: "destructive",
      })
      return false
    }

    const reward = state.rewards[rewardIndex]

    // Check if reward is expired
    if (reward.expiresAt && reward.expiresAt < new Date()) {
      toast({
        title: "Reward Expired",
        description: "This reward has expired",
        variant: "destructive",
      })

      // Remove expired reward
      setState((prev) => ({
        ...prev,
        rewards: prev.rewards.filter((_, i) => i !== rewardIndex),
      }))

      return false
    }

    // In a real app, you would apply the reward here
    toast({
      title: "Reward Claimed",
      description: `You've claimed: ${reward.description}`,
    })

    // Remove the claimed reward
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== rewardIndex),
    }))

    return true
  }

  // Redeem a discount code
  const redeemDiscount = (code: string) => {
    const reward = state.rewards.find((r) => r.code === code && r.type === "discount")

    if (!reward) {
      return { success: false }
    }

    if (claimReward(code)) {
      return { success: true, discount: reward.value as number }
    }

    return { success: false }
  }

  // Redeem a free pack
  const redeemFreePack = (code: string) => {
    const reward = state.rewards.find((r) => r.code === code && r.type === "free_pack")

    if (!reward) {
      return { success: false }
    }

    if (claimReward(code)) {
      return { success: true, packType: reward.value as string }
    }

    return { success: false }
  }

  // Simulate opening a pack
  const openPack = async (packType = "standard"): Promise<any[]> => {
    // In a real implementation, this would call your backend
    // to determine the cards in the pack based on probabilities

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Different rarities based on pack type
    let rarities: string[]

    if (packType === "premium") {
      rarities = [
        "common",
        "common",
        "uncommon",
        "uncommon",
        "rare",
        "rare",
        "ultra-rare",
        "ultra-rare",
        "secret-rare",
        "alt-art",
      ]
    } else {
      rarities = [
        "common",
        "common",
        "common",
        "common",
        "common",
        "uncommon",
        "uncommon",
        "uncommon",
        "rare",
        "ultra-rare",
      ]
    }

    const sets = ["Scarlet & Violet", "Paldean Fates", "Obsidian Flames", "Paradox Rift"]

    return Array.from({ length: 10 }, (_, i) => ({
      id: `card-${Math.random().toString(36).substring(2, 9)}`,
      name: `Pokémon Card ${i + 1}`,
      rarity: rarities[i],
      set: sets[Math.floor(Math.random() * sets.length)],
      image: `/placeholder.svg?height=300&width=215&query=pokemon card ${rarities[i]}`,
    }))
  }

  const contextValue: GamificationContextType = {
    state,
    addExperience,
    addLoyaltyPoints,
    completeAchievement,
    updateAchievementProgress,
    completeDailyChallenge,
    checkIn,
    claimReward,
    redeemDiscount,
    redeemFreePack,
    openPack,
  }

  return <GamificationContext.Provider value={contextValue}>{children}</GamificationContext.Provider>
}

export const useGamification = () => {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
