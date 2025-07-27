"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Phone, Navigation, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const [userLocation, setUserLocation] = useState<string>("")
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  const emergencyClinics = [
    {
      id: "1",
      name: "Hospital Veterinario 24h Central",
      address: "Av. Principal 123, Centro",
      phone: "+1 234-567-8901",
      distance: "1.2 km",
      isOpen: true,
      rating: 4.8,
      services: ["Emergencias", "Cirugía", "Rayos X", "Laboratorio"],
    },
    {
      id: "2",
      name: "Clínica VetEmergencia",
      address: "Calle Secundaria 456, Norte",
      phone: "+1 234-567-8902",
      distance: "2.1 km",
      isOpen: true,
      rating: 4.6,
      services: ["Emergencias", "Cuidados Intensivos", "Cardiología"],
    },
    {
      id: "3",
      name: "Centro Veterinario Urgencias",
      address: "Blvd. Sur 789, Sur",
      phone: "+1 234-567-8903",
      distance: "3.5 km",
      isOpen: false,
      rating: 4.4,
      services: ["Emergencias", "Traumatología", "Neurología"],
    },
  ]

  const emergencyTips = [
    {
      title: "Envenenamiento",
      description: "NO induzcas el vómito. Contacta inmediatamente al veterinario.",
      severity: "high",
    },
    {
      title: "Heridas sangrantes",
      description: "Aplica presión directa con una toalla limpia.",
      severity: "high",
    },
    {
      title: "Dificultad respiratoria",
      description: "Mantén a tu mascota calmada y busca atención inmediata.",
      severity: "high",
    },
    {
      title: "Convulsiones",
      description: "No toques a tu mascota durante la convulsión. Mantén el área segura.",
      severity: "medium",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-800">Emergencias Veterinarias</h1>
          </div>
        </div>

        {/* Emergency Alert */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="h-12 w-12 text-red-600" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-800 mb-2">¿Es una emergencia real?</h2>
                <p className="text-red-700 mb-4">
                  Si tu mascota está inconsciente, sangrando profusamente, tiene dificultad para respirar o ha ingerido
                  algo tóxico, busca atención veterinaria inmediata.
                </p>
                <Button variant="destructive" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar Línea de Emergencia: 911-VET
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Nearby Emergency Clinics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>Clínicas de Emergencia Cercanas</span>
                </CardTitle>
                <CardDescription>Encuentra atención veterinaria de emergencia 24/7</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Ingresa tu ubicación para mejores resultados..."
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  {emergencyClinics.map((clinic) => (
                    <div key={clinic.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{clinic.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {clinic.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={clinic.isOpen ? "default" : "secondary"}>
                            {clinic.isOpen ? "Abierto 24h" : "Cerrado"}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{clinic.distance}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {clinic.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Llamar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Navigation className="h-4 w-4 mr-2" />
                          Direcciones
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Tips & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="destructive" className="w-full h-12">
                  <Phone className="h-5 w-5 mr-2" />
                  Llamar Veterinario de Emergencia
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Chat de Emergencia (24/7)
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <MapPin className="h-5 w-5 mr-2" />
                  Encontrar Hospital más Cercano
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Primeros Auxilios</CardTitle>
                <CardDescription>Consejos importantes mientras llegas al veterinario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyTips.map((tip, index) => (
                    <div key={index} className="border-l-4 border-l-red-500 pl-4 py-2">
                      <h4 className="font-semibold text-red-800">{tip.title}</h4>
                      <p className="text-sm text-gray-700">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Verificación</CardTitle>
                <CardDescription>Información importante para el veterinario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Peso aproximado de la mascota</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Síntomas observados y cuándo comenzaron</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Medicamentos que está tomando</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Historial de alergias</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Última comida y cuándo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Documentos de identificación</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Poison Control */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Centro de Control de Envenenamiento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 mb-4">
                  Si sospechas que tu mascota ha ingerido algo tóxico, contacta inmediatamente:
                </p>
                <Button variant="outline" className="w-full border-yellow-600 text-yellow-800">
                  <Phone className="h-4 w-4 mr-2" />
                  Línea de Envenenamiento: 1-800-POISON
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
