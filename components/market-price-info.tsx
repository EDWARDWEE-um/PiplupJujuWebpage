import { InfoIcon, TrendingDown, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MarketPriceInfoProps {
  tcgplayerPrice: number
  lowestPrice: number
  highestPrice: number
}

export default function MarketPriceInfo({ tcgplayerPrice, lowestPrice, highestPrice }: MarketPriceInfoProps) {
  const ourPrice = 149.99
  const priceDifference = ourPrice - tcgplayerPrice
  const percentageDifference = (priceDifference / tcgplayerPrice) * 100

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 text-sm cursor-help">
            <div className={`flex items-center ${priceDifference < 0 ? "text-green-500" : "text-red-500"}`}>
              {priceDifference < 0 ? (
                <TrendingDown className="h-4 w-4 mr-1" />
              ) : (
                <TrendingUp className="h-4 w-4 mr-1" />
              )}
              {Math.abs(percentageDifference).toFixed(1)}% {priceDifference < 0 ? "below" : "above"} market
            </div>
            <InfoIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium">Market Price Information</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">TCGPlayer Market Price:</span>
                <span className="font-medium">${tcgplayerPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lowest Market Price:</span>
                <span className="font-medium">${lowestPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Highest Market Price:</span>
                <span className="font-medium">${highestPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Our Price:</span>
                <span className="font-medium">${ourPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Difference:</span>
                <span className={`font-medium ${priceDifference < 0 ? "text-green-500" : "text-red-500"}`}>
                  ${Math.abs(priceDifference).toFixed(2)} {priceDifference < 0 ? "lower" : "higher"}
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground pt-1">Market prices updated hourly via TCGPlayer API</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
