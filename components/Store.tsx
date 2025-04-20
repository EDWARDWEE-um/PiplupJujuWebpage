"use client"

import { useEffect, useState } from "react"
import { getWixEcommerceService, type ProductItem, type Cart } from "@/lib/wix-ecommerce"

export default function Store() {
  const [productList, setProductList] = useState<ProductItem[]>([])
  const [cart, setCart] = useState<Cart | null>(null)
  const wixService = getWixEcommerceService

  async function fetchProducts() {
    try {
      const products = await wixService.getProducts()
      setProductList(products)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  async function fetchCart() {
    try {
      const cart = await wixService.getCart()
      setCart(cart)
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  async function addToCart(product: ProductItem) {
    try {
      const options = product.options?.reduce(
        (selected, option) => ({
          ...selected,
          [option.name]: option.choices[0].value,
        }),
        {},
      )
      await wixService.addToCart(product.id, 1, options)
      await fetchCart()
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  async function clearCart() {
    try {
      await wixService.clearCart()
      setCart(null)
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  async function createRedirect() {
    try {
      const redirectUrl = await wixService.createCheckout()
      window.location.href = redirectUrl
    } catch (error) {
      console.error("Error creating checkout:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Choose Products:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productList.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold">{product.formattedPrice}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Cart:</h2>
        {cart && cart.items.length > 0 ? (
          <div className="space-y-4">
            <div
              className="bg-blue-500 text-white p-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              onClick={createRedirect}
            >
              <h3 className="text-xl font-semibold">
                {cart.itemCount} items ({cart.formattedTotal})
              </h3>
              <span>Proceed to Checkout</span>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Your cart is empty</p>
        )}
      </div>
    </div>
  )
} 