"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, MessageCircle, ShoppingCart, MapPin, Users, TrendingUp, Trophy } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [userType, setUserType] = useState<"owner" | "vet" | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as "owner" | "vet"
    const storedUserData = localStorage.getItem("userData")

    if (authStatus === "true" && storedUserType) {
      setIsAuthenticated(true)
      setUserType(storedUserType)
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userType")
    localStorage.removeItem("userData")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">VetCare Pro</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{userData?.name}</p>
              <p className="text-sm text-gray-600">{userType === "vet" ? "Veterinario" : "Dueño de Mascota"}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {userType === "owner" ? <OwnerDashboard /> : <VetDashboard />}
      </div>
    </div>
  )
}

function OwnerDashboard() {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/appointments">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Agendar Cita</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/chat">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Chat Veterinario</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/emergency">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold">Emergencias</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/store">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Tienda</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/rewards">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold">Recompensas</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/community">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="font-semibold">Comunidad</h3>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* My Pets */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Mascotas</CardTitle>
          <CardDescription>Gestiona la información de tus compañeros peludos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Max</h3>
                <Badge variant="secondary">Perro</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">Golden Retriever • 3 años</p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Próxima vacuna:</strong> 15 Feb 2024
                </p>
                <p>
                  <strong>Última visita:</strong> 10 Ene 2024
                </p>
                <p>
                  <strong>Peso:</strong> 28 kg
                </p>
              </div>
              <Button size="sm" className="mt-3 w-full">
                Ver Historial
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Luna</h3>
                <Badge variant="secondary">Gato</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">Siamés • 2 años</p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Próxima vacuna:</strong> 20 Mar 2024
                </p>
                <p>
                  <strong>Última visita:</strong> 05 Ene 2024
                </p>
                <p>
                  <strong>Peso:</strong> 4.2 kg
                </p>
              </div>
              <Button size="sm" className="mt-3 w-full">
                Ver Historial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Citas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Control rutinario - Max</p>
                <p className="text-sm text-gray-600">Dr. García • Clínica VetSalud</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">15 Feb</p>
                <p className="text-sm text-gray-600">10:30 AM</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Vacunación - Luna</p>
                <p className="text-sm text-gray-600">Dra. Martínez • Clínica PetCare</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">20 Mar</p>
                <p className="text-sm text-gray-600">2:00 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function VetDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Citas Hoy</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pacientes Activos</p>
                <p className="text-2xl font-bold">248</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Consultas Online</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos Mes</p>
                <p className="text-2xl font-bold">$15,420</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Agenda de Hoy</CardTitle>
          <CardDescription>Martes, 13 de Febrero 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="font-semibold">Max (Golden Retriever)</p>
                  <p className="text-sm text-gray-600">Control rutinario • Juan Pérez</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">10:30 AM</p>
                <Badge variant="outline">Confirmada</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div>
                  <p className="font-semibold">Bella (Labrador)</p>
                  <p className="text-sm text-gray-600">Vacunación • María González</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">11:15 AM</p>
                <Badge variant="outline">Confirmada</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <div>
                  <p className="font-semibold">Consulta Online</p>
                  <p className="text-sm text-gray-600">Michi (Gato Persa) • Ana López</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">2:00 PM</p>
                <Badge variant="secondary">Virtual</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Rocky</p>
                  <p className="text-sm text-gray-600">Bulldog • 5 años • Carlos Ruiz</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Última visita</p>
                <p className="font-semibold">10 Feb 2024</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Whiskers</p>
                  <p className="text-sm text-gray-600">Gato Común • 3 años • Laura Díaz</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Última visita</p>
                <p className="font-semibold">08 Feb 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
