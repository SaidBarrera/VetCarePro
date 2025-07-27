"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Stethoscope, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "owner" as "owner" | "vet",
  })

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    userType: "owner" as "owner" | "vet",
    // Campos específicos para veterinarios
    licenseNumber: "",
    specialty: "",
    clinic: "",
    experience: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular autenticación
    setTimeout(() => {
      localStorage.setItem("userType", loginData.userType)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem(
        "userData",
        JSON.stringify({
          email: loginData.email,
          userType: loginData.userType,
          name: loginData.userType === "vet" ? "Dr. García" : "Juan Pérez",
        }),
      )
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    // Simular registro
    setTimeout(() => {
      localStorage.setItem("userType", registerData.userType)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem(
        "userData",
        JSON.stringify({
          email: registerData.email,
          userType: registerData.userType,
          name: `${registerData.firstName} ${registerData.lastName}`,
        }),
      )
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex justify-center items-center mb-4">
            <Heart className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">VetCare Pro</h1>
          </div>
          <p className="text-gray-600">Accede a tu cuenta o regístrate</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userType">Tipo de Usuario</Label>
                    <Select
                      value={loginData.userType}
                      onValueChange={(value: "owner" | "vet") => setLoginData({ ...loginData, userType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-blue-600" />
                            Dueño de Mascota
                          </div>
                        </SelectItem>
                        <SelectItem value="vet">
                          <div className="flex items-center">
                            <Stethoscope className="h-4 w-4 mr-2 text-green-600" />
                            Veterinario
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                      Recordarme
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>

                  <div className="text-center">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear Cuenta</CardTitle>
                <CardDescription>Regístrate para comenzar a usar VetCare Pro</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userType">Tipo de Usuario</Label>
                    <Select
                      value={registerData.userType}
                      onValueChange={(value: "owner" | "vet") => setRegisterData({ ...registerData, userType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-blue-600" />
                            Dueño de Mascota
                          </div>
                        </SelectItem>
                        <SelectItem value="vet">
                          <div className="flex items-center">
                            <Stethoscope className="h-4 w-4 mr-2 text-green-600" />
                            Veterinario
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        placeholder="Juan"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input
                        id="lastName"
                        placeholder="Pérez"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                    />
                  </div>

                  {registerData.userType === "vet" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">Número de Licencia</Label>
                        <Input
                          id="licenseNumber"
                          placeholder="VET-12345"
                          value={registerData.licenseNumber}
                          onChange={(e) => setRegisterData({ ...registerData, licenseNumber: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Especialidad</Label>
                          <Select
                            value={registerData.specialty}
                            onValueChange={(value) => setRegisterData({ ...registerData, specialty: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Medicina General</SelectItem>
                              <SelectItem value="surgery">Cirugía</SelectItem>
                              <SelectItem value="dermatology">Dermatología</SelectItem>
                              <SelectItem value="cardiology">Cardiología</SelectItem>
                              <SelectItem value="neurology">Neurología</SelectItem>
                              <SelectItem value="oncology">Oncología</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Años de Experiencia</Label>
                          <Select
                            value={registerData.experience}
                            onValueChange={(value) => setRegisterData({ ...registerData, experience: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Años" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2">1-2 años</SelectItem>
                              <SelectItem value="3-5">3-5 años</SelectItem>
                              <SelectItem value="6-10">6-10 años</SelectItem>
                              <SelectItem value="10+">Más de 10 años</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clinic">Clínica/Hospital</Label>
                        <Input
                          id="clinic"
                          placeholder="Hospital Veterinario Central"
                          value={registerData.clinic}
                          onChange={(e) => setRegisterData({ ...registerData, clinic: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      Acepto los{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        términos y condiciones
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Demo Credentials */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Credenciales de Demo</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                <strong>Dueño:</strong> owner@demo.com / demo123
              </p>
              <p>
                <strong>Veterinario:</strong> vet@demo.com / demo123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
