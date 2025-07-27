"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ArrowLeft, Brain, Trophy } from "lucide-react"
import Link from "next/link"

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedVet, setSelectedVet] = useState("")
  const [selectedPet, setSelectedPet] = useState("")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]

  const veterinarians = [
    { id: "1", name: "Dr. García", specialty: "Medicina General", clinic: "Clínica VetSalud" },
    { id: "2", name: "Dra. Martínez", specialty: "Cirugía", clinic: "Hospital Veterinario Central" },
    { id: "3", name: "Dr. López", specialty: "Dermatología", clinic: "Clínica PetCare" },
  ]

  const pets = [
    { id: "1", name: "Max", type: "Perro", breed: "Golden Retriever" },
    { id: "2", name: "Luna", type: "Gato", breed: "Siamés" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Agendar Cita</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Appointment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Nueva Cita</CardTitle>
              <CardDescription>Completa los datos para agendar tu cita veterinaria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pet">Seleccionar Mascota</Label>
                <Select value={selectedPet} onValueChange={setSelectedPet}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige tu mascota" />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} - {pet.type} ({pet.breed})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vet">Veterinario</Label>
                <Select value={selectedVet} onValueChange={setSelectedVet}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un veterinario" />
                  </SelectTrigger>
                  <SelectContent>
                    {veterinarians.map((vet) => (
                      <SelectItem key={vet.id} value={vet.id}>
                        {vet.name} - {vet.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo de la consulta</Label>
                <Textarea
                  id="reason"
                  placeholder="Describe brevemente el motivo de la visita..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Información adicional que consideres importante..."
                  className="min-h-[80px]"
                />
              </div>

              <Button className="w-full" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Confirmar Cita
              </Button>
            </CardContent>
          </Card>

          {/* Appointment Summary & Available Slots */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de la Cita</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPet && selectedVet && selectedDate && selectedTime ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">Fecha:</span>
                      <span>
                        {new Date(selectedDate).toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">Hora:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Mascota:</span>
                      <span>{pets.find((p) => p.id === selectedPet)?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Veterinario:</span>
                      <span>{veterinarians.find((v) => v.id === selectedVet)?.name}</span>
                    </div>
                    {selectedVet && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-gray-600">
                          {veterinarians.find((v) => v.id === selectedVet)?.clinic}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Completa los campos para ver el resumen de tu cita</p>
                )}
              </CardContent>
            </Card>

            {/* My Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Mis Próximas Citas</CardTitle>
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
                      <Badge variant="outline" className="mt-1">
                        Confirmada
                      </Badge>
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
                      <Badge variant="outline" className="mt-1">
                        Pendiente
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700">¿Emergencia?</CardTitle>
                <CardDescription className="text-red-600">Si tu mascota necesita atención inmediata</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Encontrar Clínica de Emergencia
                </Button>
              </CardContent>
            </Card>

            {/* AI Appointment Suggestions */}
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-700 flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Sugerencias de IA</span>
                </CardTitle>
                <CardDescription className="text-purple-600">Basado en el historial de tu mascota</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                      <span>¡Gana 50 puntos por asistir a tu cita!</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Max necesita control de peso (recomendado cada 3 meses)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Luna: revisión dental preventiva sugerida</span>
                  </div>
                </div>
                <Link href="/ai-diagnosis">
                  <Button variant="outline" className="w-full mt-4 border-purple-600 text-purple-700">
                    <Brain className="h-4 w-4 mr-2" />
                    Ver Análisis Completo de IA
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
