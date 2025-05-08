"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { toast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

interface PriceChartProps {
  productType: string
  productId?: string
}

export default function PriceChart({ productType, productId }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<"1m" | "3m" | "6m" | "1y" | "all">("3m")
  const isMobile = useMobile()
  const [selectedPoint, setSelectedPoint] = useState<{ date: string; price: number } | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Normalize product type to match our data keys
  const normalizedType = (() => {
    // Convert to lowercase for case-insensitive matching
    const type = productType.toLowerCase()

    if (type === "sealed" || type.includes("sealed")) return "sealed"
    if (type === "singles" || type === "single" || type.includes("card")) return "singles"
    if (type === "slabs" || type === "slab" || type.includes("graded")) return "slabs"
    if (type === "blaziken-vmax-alt" || type.includes("blaziken")) return "blaziken-vmax-alt"

    // Default to singles if no match
    console.log(`PriceChart: Unknown product type "${productType}", defaulting to singles`)
    return "singles"
  })()

  // Sample data for different product types
  const chartData = {
    sealed: {
      "1m": [
        { date: "Week 1", price: 149.99 },
        { date: "Week 2", price: 154.99 },
        { date: "Week 3", price: 152.99 },
        { date: "Week 4", price: 159.99 },
      ],
      "3m": [
        { date: "Jan", price: 139.99 },
        { date: "Feb", price: 144.99 },
        { date: "Mar", price: 149.99 },
        { date: "Apr", price: 159.99 },
      ],
      "6m": [
        { date: "Nov", price: 129.99 },
        { date: "Dec", price: 139.99 },
        { date: "Jan", price: 139.99 },
        { date: "Feb", price: 144.99 },
        { date: "Mar", price: 149.99 },
        { date: "Apr", price: 159.99 },
      ],
      "1y": [
        { date: "May '22", price: 119.99 },
        { date: "Jul '22", price: 124.99 },
        { date: "Sep '22", price: 129.99 },
        { date: "Nov '22", price: 129.99 },
        { date: "Jan '23", price: 139.99 },
        { date: "Mar '23", price: 149.99 },
        { date: "Apr '23", price: 159.99 },
      ],
      all: [
        { date: "2020", price: 99.99 },
        { date: "2021", price: 109.99 },
        { date: "2022", price: 129.99 },
        { date: "2023", price: 159.99 },
      ],
    },
    singles: {
      "1m": [
        { date: "Week 1", price: 24.99 },
        { date: "Week 2", price: 26.99 },
        { date: "Week 3", price: 25.99 },
        { date: "Week 4", price: 27.99 },
      ],
      "3m": [
        { date: "Jan", price: 22.99 },
        { date: "Feb", price: 23.99 },
        { date: "Mar", price: 24.99 },
        { date: "Apr", price: 27.99 },
      ],
      "6m": [
        { date: "Nov", price: 19.99 },
        { date: "Dec", price: 21.99 },
        { date: "Jan", price: 22.99 },
        { date: "Feb", price: 23.99 },
        { date: "Mar", price: 24.99 },
        { date: "Apr", price: 27.99 },
      ],
      "1y": [
        { date: "May '22", price: 17.99 },
        { date: "Jul '22", price: 18.99 },
        { date: "Sep '22", price: 19.99 },
        { date: "Nov '22", price: 19.99 },
        { date: "Jan '23", price: 22.99 },
        { date: "Mar '23", price: 24.99 },
        { date: "Apr", price: 27.99 },
      ],
      all: [
        { date: "2020", price: 14.99 },
        { date: "2021", price: 16.99 },
        { date: "2022", price: 19.99 },
        { date: "2023", price: 27.99 },
      ],
    },
    slabs: {
      "1m": [
        { date: "Week 1", price: 299.99 },
        { date: "Week 2", price: 309.99 },
        { date: "Week 3", price: 304.99 },
        { date: "Week 4", price: 319.99 },
      ],
      "3m": [
        { date: "Jan", price: 279.99 },
        { date: "Feb", price: 289.99 },
        { date: "Mar", price: 299.99 },
        { date: "Apr", price: 319.99 },
      ],
      "6m": [
        { date: "Nov", price: 259.99 },
        { date: "Dec", price: 269.99 },
        { date: "Jan", price: 279.99 },
        { date: "Feb", price: 289.99 },
        { date: "Mar", price: 299.99 },
        { date: "Apr", price: 319.99 },
      ],
      "1y": [
        { date: "May '22", price: 239.99 },
        { date: "Jul '22", price: 249.99 },
        { date: "Sep '22", price: 259.99 },
        { date: "Nov '22", price: 259.99 },
        { date: "Jan '23", price: 279.99 },
        { date: "Mar '23", price: 299.99 },
        { date: "Apr '23", price: 319.99 },
      ],
      all: [
        { date: "2020", price: 199.99 },
        { date: "2021", price: 219.99 },
        { date: "2022", price: 259.99 },
        { date: "2023", price: 319.99 },
      ],
    },
    "blaziken-vmax-alt": {
      "1m": [
        { date: "Week 1", price: 189.99 },
        { date: "Week 2", price: 192.5 },
        { date: "Week 3", price: 195.75 },
        { date: "Week 4", price: 199.99 },
      ],
      "3m": [
        { date: "Jan", price: 175.99 },
        { date: "Feb", price: 182.5 },
        { date: "Mar", price: 189.99 },
        { date: "Apr", price: 199.99 },
      ],
      "6m": [
        { date: "Nov", price: 159.99 },
        { date: "Dec", price: 165.5 },
        { date: "Jan", price: 175.99 },
        { date: "Feb", price: 182.5 },
        { date: "Mar", price: 189.99 },
        { date: "Apr", price: 199.99 },
      ],
      "1y": [
        { date: "May '22", price: 129.99 },
        { date: "Jul '22", price: 139.99 },
        { date: "Sep '22", price: 149.99 },
        { date: "Nov '22", price: 159.99 },
        { date: "Jan '23", price: 175.99 },
        { date: "Mar '23", price: 189.99 },
        { date: "Apr", price: 199.99 },
      ],
      all: [
        { date: "2021", price: 89.99 },
        { date: "2022", price: 149.99 },
        { date: "2023", price: 199.99 },
      ],
    },
  }

  // Safely get data for the current product type and time range
  const data = chartData[normalizedType]?.[timeRange] || chartData.singles[timeRange]

  // Get product title based on type
  const getProductTitle = () => {
    switch (normalizedType) {
      case "sealed":
        return "Scarlet & Violet Booster Box"
      case "singles":
        return "Pikachu V Full Art"
      case "slabs":
        return "Charizard VMAX (PSA 10)"
      case "blaziken-vmax-alt":
        return "Blaziken VMAX (Alternate Art Secret)"
      default:
        return "Product"
    }
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-gray-700">${payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  // Handle click on chart
  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload
      if (clickedData && clickedData.date) {
        setSelectedPoint(clickedData)
        toast({
          title: "Price Information",
          description: `${clickedData.date}: $${clickedData.price.toFixed(2)}`,
        })
      }
    }
  }

  return (
    <div className="space-y-4 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="font-medium text-sm sm:text-base">{getProductTitle()} Price Trend</h3>
        <div className="flex flex-wrap gap-1">
          <Button
            variant={timeRange === "1m" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setTimeRange("1m")}
          >
            1M
          </Button>
          <Button
            variant={timeRange === "3m" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setTimeRange("3m")}
          >
            3M
          </Button>
          <Button
            variant={timeRange === "6m" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setTimeRange("6m")}
          >
            6M
          </Button>
          <Button
            variant={timeRange === "1y" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setTimeRange("1y")}
          >
            1Y
          </Button>
          <Button
            variant={timeRange === "all" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => setTimeRange("all")}
          >
            All
          </Button>
        </div>
      </div>
      <div className="w-full" style={{ minHeight: "250px" }}>
        {!isClient ? (
          <div className="h-[250px] sm:h-[300px] w-full flex flex-col gap-2">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <div className="h-[250px] sm:h-[300px] w-full" style={{ minHeight: "250px" }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <LineChart data={data} margin={{ top: 5, right: 10, left: 5, bottom: 5 }} onClick={handleClick}>
                <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                <XAxis dataKey="date" tick={{ fontSize: isMobile ? 10 : 12 }} tickMargin={5} stroke="#9ca3af" />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  tickFormatter={(value) => `$${value}`}
                  width={isMobile ? 40 : 50}
                  stroke="#9ca3af"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  activeDot={{
                    r: isMobile ? 6 : 8,
                    onClick: (data) => {
                      if (data && data.payload) {
                        const point = data.payload
                        if (point && point.date) {
                          setSelectedPoint(point)
                          toast({
                            title: "Price Information",
                            description: `${point.date}: $${point.price.toFixed(2)}`,
                          })
                        }
                      }
                    },
                  }}
                  strokeWidth={isMobile ? 1.5 : 2}
                  dot={{
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    r: 4,
                    onClick: (data) => {
                      if (data && data.payload) {
                        const point = data.payload
                        if (point && point.date) {
                          setSelectedPoint(point)
                          toast({
                            title: "Price Information",
                            description: `${point.date}: $${point.price.toFixed(2)}`,
                          })
                        }
                      }
                    },
                  }}
                  cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {selectedPoint && selectedPoint.date && (
        <div className="text-sm text-center font-medium">
          Selected: {selectedPoint.date} - ${selectedPoint.price.toFixed(2)}
        </div>
      )}
      <div className="mt-2 text-xs sm:text-sm text-gray-500">
        <p>Data sourced from TCGPlayer. Watch our TikTok streams for live pack openings and card pulls!</p>
      </div>
    </div>
  )
}
