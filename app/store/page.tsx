"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ShoppingCart, Star, Filter, Search, Heart } from "lucide-react"
import Link from "next/link"

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  const categories = [
    { id: "all", name: "Todos los productos" },
    { id: "food", name: "Alimentos" },
    { id: "toys", name: "Juguetes" },
    { id: "medicine", name: "Medicamentos" },
    { id: "accessories", name: "Accesorios" },
    { id: "hygiene", name: "Higiene" },
  ]

  const products = [
    {
      id: "1",
      name: "Royal Canin Adult Dog Food",
      category: "food",
      price: 45.99,
      originalPrice: 52.99,
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=200",
      description: "Alimento premium para perros adultos",
      inStock: true,
      prescription: false,
    },
    {
      id: "2",
      name: "Pelota Interactiva Kong",
      category: "toys",
      price: 12.99,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200",
      description: "Juguete resistente para perros activos",
      inStock: true,
      prescription: false,
    },
    {
      id: "3",
      name: "Antibiótico Amoxicilina",
      category: "medicine",
      price: 28.5,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=200",
      description: "Tratamiento antibiótico veterinario",
      inStock: true,
      prescription: true,
    },
    {
      id: "4",
      name: "Collar Antipulgas Seresto",
      category: "accessories",
      price: 35.99,
      originalPrice: 42.99,
      rating: 4.7,
      reviews: 312,
      image: "/placeholder.svg?height=200&width=200",
      description: "Protección contra pulgas y garrapatas",
      inStock: true,
      prescription: false,
    },
    {
      id: "5",
      name: "Shampoo Medicado",
      category: "hygiene",
      price: 18.99,
      rating: 4.5,
      reviews: 78,
      image: "/placeholder.svg?height=200&width=200",
      description: "Shampoo especial para piel sensible",
      inStock: false,
      prescription: false,
    },
    {
      id: "6",
      name: "Whiskas Cat Food Premium",
      category: "food",
      price: 22.99,
      rating: 4.4,
      reviews: 198,
      image: "/placeholder.svg?height=200&width=200",
      description: "Alimento premium para gatos adultos",
      inStock: true,
      prescription: false,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (productId: string) => {
    setCartItems((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Tienda VetCare</h1>
          </div>
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Carrito
            {cartItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {cartItems}
              </Badge>
            )}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Más Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Banner */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">¡Envío Gratis!</h2>
                <p className="text-blue-100">En compras mayores a $50. Entrega en 24-48 horas.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">20% OFF</p>
                <p className="text-blue-100">En medicamentos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.originalPrice && <Badge className="absolute top-2 left-2 bg-red-500">Oferta</Badge>}
                {product.prescription && <Badge className="absolute top-2 right-2 bg-orange-500">Receta</Badge>}
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "En Stock" : "Agotado"}
                  </Badge>
                </div>

                <Button className="w-full" disabled={!product.inStock} onClick={() => addToCart(product.id)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Agregar al Carrito" : "No Disponible"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Limpiar Filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Categories Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Categorías Populares</CardTitle>
            <CardDescription>Encuentra lo que necesitas para tu mascota</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(1).map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-20 flex flex-col space-y-2"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="font-semibold">{category.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prescription Notice */}
        <Card className="mt-6 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 mb-1">Medicamentos con Receta</h3>
                <p className="text-orange-700 text-sm">
                  Los productos marcados con "Receta" requieren prescripción veterinaria. Puedes subir tu receta durante
                  el proceso de compra o contactar a tu veterinario.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
