"use client"

import { useState } from "react"
import Image from "next/image"
import { useGamification } from "@/contexts/gamification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Gift, Package, Sparkles } from "lucide-react"

type PackType = {
  id: string
  name: string
  description: string
  image: string
  price: number
  isPremium: boolean
}

const packTypes: PackType[] = [
  {
    id: "standard",
    name: "Standard Pack",
    description: "A standard booster pack with 10 cards",
    image: "/vibrant-pokemon-pack.png",
    price: 0,
    isPremium: false,
  },
  {
    id: "premium",
    name: "Premium Pack",
    description: "A premium pack with better odds for rare cards",
    image: "/shimmering-destiny-pack.png",
    price: 100,
    isPremium: true,
  },
  {
    id: "ultra",
    name: "Ultra Pack",
    description: "An ultra premium pack with guaranteed rare cards",
    image: "/obsidian-flames-pack.png",
    price: 250,
    isPremium: true,
  },
]

export default function PackSimulator() {
  const { openPack, state, redeemFreePack } = useGamification()
  const [selectedPack, setSelectedPack] = useState<PackType>(packTypes[0])
  const [isOpening, setIsOpening] = useState(false)
  const [cards, setCards] = useState<any[]>([])
  const [showCards, setShowCards] = useState(false)
  const [rewardCode, setRewardCode] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenPack = async () => {
    if (selectedPack.price > 0 && selectedPack.price > state.loyaltyPoints) {
      toast({
        title: "Not enough points",
        description: `You need ${selectedPack.price} loyalty points to open this pack`,
        variant: "destructive",
      })
      return
    }

    setIsOpening(true)
    setShowCards(false)

    try {
      const result = await openPack(selectedPack.id)
      setCards(result)

      // Short delay before showing cards for animation effect
      setTimeout(() => {
        setShowCards(true)
        setIsOpening(false)
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open pack",
        variant: "destructive",
      })
      setIsOpening(false)
    }
  }

  const handleRedeemCode = () => {
    const result = redeemFreePack(rewardCode)

    if (result.success) {
      toast({
        title: "Success",
        description: `Redeemed a free ${result.packType} pack!`,
      })

      // Find and select the redeemed pack type
      const pack = packTypes.find((p) => p.id === result.packType) || packTypes[0]
      setSelectedPack(pack)

      // Close the dialog
      setIsDialogOpen(false)

      // Open the pack automatically
      handleOpenPack()
    } else {
      toast({
        title: "Invalid Code",
        description: "The code you entered is invalid or has expired",
        variant: "destructive",
      })
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "uncommon":
        return "bg-green-500"
      case "rare":
        return "bg-blue-500"
      case "ultra-rare":
        return "bg-purple-500"
      case "secret-rare":
        return "bg-yellow-500"
      case "alt-art":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Pack Simulator</h2>
          <p className="text-muted-foreground">Open virtual packs to practice your luck without spending real money!</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            <Gift className="h-4 w-4 mr-2" />
            Redeem Code
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            {state.loyaltyPoints} Points
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid grid-cols-3">
          {packTypes.map((pack) => (
            <TabsTrigger
              key={pack.id}
              value={pack.id}
              onClick={() => setSelectedPack(pack)}
              disabled={pack.price > state.loyaltyPoints && pack.price > 0}
            >
              {pack.name}
              {pack.price > 0 && ` (${pack.price} pts)`}
            </TabsTrigger>
          ))}
        </TabsList>

        {packTypes.map((pack) => (
          <TabsContent key={pack.id} value={pack.id} className="mt-4">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <div className="relative w-full max-w-[250px] mx-auto">
                  <Image
                    src={pack.image || "/placeholder.svg"}
                    alt={pack.name}
                    width={250}
                    height={350}
                    className="rounded-lg shadow-lg"
                  />
                  {pack.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-black">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{pack.name}</h3>
                  <p className="text-muted-foreground">{pack.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pack Contents:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {pack.id === "standard" ? (
                      <>
                        <li>5 Common cards</li>
                        <li>3 Uncommon cards</li>
                        <li>1 Rare card</li>
                        <li>1 Ultra Rare card (chance for Secret Rare)</li>
                      </>
                    ) : pack.id === "premium" ? (
                      <>
                        <li>2 Common cards</li>
                        <li>2 Uncommon cards</li>
                        <li>2 Rare cards</li>
                        <li>2 Ultra Rare cards</li>
                        <li>1 Secret Rare card</li>
                        <li>1 Alt Art card</li>
                      </>
                    ) : (
                      <>
                        <li>1 Common card</li>
                        <li>1 Uncommon card</li>
                        <li>2 Rare cards</li>
                        <li>3 Ultra Rare cards</li>
                        <li>2 Secret Rare cards</li>
                        <li>1 Alt Art card</li>
                      </>
                    )}
                  </ul>
                </div>
                <Button
                  onClick={handleOpenPack}
                  disabled={isOpening || (pack.price > 0 && pack.price > state.loyaltyPoints)}
                  className="w-full md:w-auto"
                >
                  {isOpening ? (
                    <>
                      <Package className="h-4 w-4 mr-2 animate-pulse" />
                      Opening...
                    </>
                  ) : pack.price > 0 ? (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      Open Pack ({pack.price} points)
                    </>
                  ) : (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      Open Pack (Free)
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {cards.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Your Cards</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
                animate={
                  showCards
                    ? {
                        opacity: 1,
                        rotateY: 0,
                        scale: 1,
                        transition: { delay: index * 0.2, duration: 0.5 },
                      }
                    : {}
                }
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      width={215}
                      height={300}
                      className="w-full aspect-[2.5/3.5] object-cover"
                    />
                    <Badge className={`absolute bottom-2 right-2 ${getRarityColor(card.rarity)}`}>{card.rarity}</Badge>
                  </div>
                  <CardContent className="p-2">
                    <p className="text-sm font-medium truncate">{card.name}</p>
                    <p className="text-xs text-muted-foreground">{card.set}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redeem Free Pack Code</DialogTitle>
            <DialogDescription>Enter your code to redeem a free pack</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="code" className="text-sm font-medium">
                Reward Code
              </label>
              <input
                id="code"
                value={rewardCode}
                onChange={(e) => setRewardCode(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter your code"
              />
            </div>
            <Button onClick={handleRedeemCode} className="w-full">
              Redeem
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
