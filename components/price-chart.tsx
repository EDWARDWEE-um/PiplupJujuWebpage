"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMobile } from "@/hooks/use-mobile"

interface PriceChartProps {
  productType: "sealed" | "singles" | "slabs" | "blaziken-vmax-alt"
}

export default function PriceChart({ productType }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<"1m" | "3m" | "6m" | "1y" | "all">("3m")
  const isMobile = useMobile()

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
        { date: "Apr '23", price: 27.99 },
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
        { date: "Apr '23", price: 199.99 },
      ],
      all: [
        { date: "2021", price: 89.99 },
        { date: "2022", price: 149.99 },
        { date: "2023", price: 199.99 },
      ],
    },
  }

  const data = chartData[productType][timeRange]

  // Get product title based on type
  const getProductTitle = () => {
    switch (productType) {
      case "sealed":
        return "Scarlet & Violet Booster Box"
      case "singles":
        return "Pikachu V Full Art"
      case "slabs":
        return "Charizard VMAX (PSA 10)"
      case "blaziken-vmax-alt":
        return "Blaziken VMAX (Alternate Art Secret)"
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
      <div className="w-full">
        <ChartContainer
          config={{
            price: {
              label: "Price ($)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[250px] sm:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: isMobile ? 10 : 12 }} tickMargin={5} />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickFormatter={(value) => `$${value}`}
                width={isMobile ? 40 : 50}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                activeDot={{ r: isMobile ? 6 : 8 }}
                strokeWidth={isMobile ? 1.5 : 2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      {productType === "blaziken-vmax-alt" && (
        <div className="mt-2 text-xs sm:text-sm text-gray-500">
          <p>Data sourced from TCGPlayer. Watch our TikTok streams for live pack openings and card pulls!</p>
        </div>
      )}
    </div>
  )
}
