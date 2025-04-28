"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Award, Bell, LogIn, LogOut, Menu, Package, Search, ShoppingCart, User, X, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useGamification } from "@/contexts/gamification-context"

export default function SiteHeader() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { state } = useGamification()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center overflow-x-hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              <span className="font-bold">PokéCollect</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-4">
                {/* Increased spacing between links for better touch targets */}
                <Link
                  href="/"
                  className={`text-base py-2 hover:text-foreground ${pathname === "/" ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Home
                </Link>
                <Link
                  href="/products/sealed"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/products/sealed") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Sealed Products
                </Link>
                <Link
                  href="/products/singles"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/products/singles") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Single Cards
                </Link>
                <Link
                  href="/products/slabs"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/products/slabs") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Slabs
                </Link>
                <Link
                  href="/auctions"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/auctions") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Auctions
                </Link>
                <Link
                  href="/livestreams"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/livestreams") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Livestreams
                </Link>
                <Link
                  href="/rip-or-ship"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/rip-or-ship") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Rip or Ship
                </Link>
                <Link
                  href="/pre-orders"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/pre-orders") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Pre-Orders
                </Link>
                <Link
                  href="/newsletter"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/newsletter") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Newsletter
                </Link>
                <Link
                  href="/gamification"
                  className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/gamification") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Trainer Dashboard
                </Link>
                {isAuthenticated && (
                  <>
                    <div className="h-px bg-border my-2"></div>
                    <Link
                      href="/account"
                      className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/account") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/account/orders") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/loyalty"
                      className={`text-base py-2 hover:text-foreground ${pathname?.startsWith("/loyalty") ? "text-foreground font-medium" : "text-muted-foreground"}`}
                    >
                      Loyalty Points
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Package className="h-6 w-6" />
          <span className="font-bold hidden md:inline-block">PokéCollect</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/products/sealed"
            className={`hover:text-foreground ${pathname?.startsWith("/products/sealed") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Sealed Products
          </Link>
          <Link
            href="/products/singles"
            className={`hover:text-foreground ${pathname?.startsWith("/products/singles") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Single Cards
          </Link>
          <Link
            href="/products/slabs"
            className={`hover:text-foreground ${pathname?.startsWith("/products/slabs") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Slabs
          </Link>
          <Link
            href="/auctions"
            className={`hover:text-foreground ${pathname?.startsWith("/auctions") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Auctions
          </Link>
          <Link
            href="/livestreams"
            className={`hover:text-foreground ${pathname?.startsWith("/livestreams") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Livestreams
          </Link>
          <Link
            href="/rip-or-ship"
            className={`hover:text-foreground ${pathname?.startsWith("/rip-or-ship") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Rip or Ship
          </Link>
          <Link
            href="/pre-orders"
            className={`hover:text-foreground ${pathname?.startsWith("/pre-orders") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Pre-Orders
          </Link>
          <Link
            href="/newsletter"
            className={`hover:text-foreground ${pathname?.startsWith("/newsletter") ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Newsletter
          </Link>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="relative flex items-center w-full max-w-[150px] sm:max-w-[300px]">
              <Input type="search" placeholder="Search..." className="h-10 pr-8" autoFocus />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 h-10 w-10"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Link href="/gamification">
                <Button variant="ghost" size="icon" className="relative">
                  <Trophy className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {state.level}
                  </Badge>
                  <span className="sr-only">Trainer Dashboard</span>
                </Button>
              </Link>
              <Link href="/loyalty">
                <Button variant="ghost" size="icon" className="relative">
                  <Award className="h-5 w-5" />
                  <span className="sr-only">Loyalty Points</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      2
                    </Badge>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Upcoming Livestream</span>
                      <span className="text-xs text-muted-foreground">Scarlet & Violet Box Opening - Today at 7PM</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Achievement Unlocked!</span>
                      <span className="text-xs text-muted-foreground">First Purchase - 50 XP earned</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center">
                    <Link href="/notifications">View all notifications</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/account" className="flex w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account/orders" className="flex w-full">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/gamification" className="flex w-full">
                    <Trophy className="mr-2 h-4 w-4" />
                    Trainer Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/loyalty" className="flex w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Loyalty Points ({user?.points || 0})
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
