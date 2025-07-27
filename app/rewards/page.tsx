"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Trophy,
  Star,
  Gift,
  Crown,
  Heart,
  Calendar,
  ShoppingCart,
  Stethoscope,
  Award,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function RewardsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userPoints, setUserPoints] = useState(1250)
  const [userLevel, setUserLevel] = useState(3)
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

  const achievements = [
    {
      id: "1",
      title: "Dueño Responsable",
      description: "Completó el calendario de vacunación anual",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      points: 500,
      unlocked: true,
      date: "15 Ene 2024",
      rarity: "gold",
    },
    {
      id: "2",
      title: "Primera Cita",
      description: "Agendó su primera cita veterinaria",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      points: 100,
      unlocked: true,
      date: "10 Dic 2023",
      rarity: "bronze",
    },
    {
      id: "3",
      title: "Comprador Frecuente",
      description: "Realizó 10 compras en la tienda",
      icon: <ShoppingCart className="h-8 w-8 text-green-500" />,
      points: 300,
      unlocked: true,
      date: "20 Ene 2024",
      rarity: "silver",
    },
    {
      id: "4",
      title: "Consultor IA",
      description: "Usó el diagnóstico por IA 5 veces",
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      points: 200,
      unlocked: true,
      date: "25 Ene 2024",
      rarity: "silver",
    },
    {
      id: "5",
      title: "Veterinario de Confianza",
      description: "Mantuvo el mismo veterinario por 1 año",
      icon: <Stethoscope className="h-8 w-8 text-indigo-500" />,
      points: 750,
      unlocked: false,
      progress: 75,
      rarity: "gold",
    },
    {
      id: "6",
      title: "Comunidad Activa",
      description: "Participó en 20 discusiones del foro",
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      points: 400,
      unlocked: false,
      progress: 60,
      rarity: "silver",
    },
  ]

  const rewards = [
    {
      id: "1",
      title: "10% Descuento en Consultas",
      description: "Válido por 30 días",
      cost: 500,
      category: "consultas",
      available: true,
    },
    {
      id: "2",
      title: "Envío Gratis",
      description: "En tu próxima compra",
      cost: 200,
      category: "tienda",
      available: true,
    },
    {
      id: "3",
      title: "Consulta IA Premium",
      description: "Análisis avanzado por 1 mes",
      cost: 800,
      category: "ia",
      available: true,
    },
    {
      id: "4",
      title: "Kit de Emergencia",
      description: "Kit básico de primeros auxilios",
      cost: 1000,
      category: "productos",
      available: true,
    },
    {
      id: "5",
      title: "Consulta Veterinaria Gratis",
      description: "Una consulta completa sin costo",
      cost: 1500,
      category: "consultas",
      available: false,
    },
    {
      id: "6",
      title: "Membresía VIP",
      description: "Acceso premium por 3 meses",
      cost: 2000,
      category: "premium",
      available: false,
    },
  ]

  const recentActivities = [
    {
      action: "Cita completada",
      points: 50,
      date: "Hoy",
      icon: <Calendar className="h-4 w-4 text-blue-500" />,
    },
    {
      action: "Compra en tienda",
      points: 25,
      date: "Ayer",
      icon: <ShoppingCart className="h-4 w-4 text-green-500" />,
    },
    {
      action: "Uso de IA diagnóstico",
      points: 30,
      date: "2 días",
      icon: <Zap className="h-4 w-4 text-purple-500" />,
    },
    {
      action: "Participación en foro",
      points: 15,
      date: "3 días",
      icon: <Trophy className="h-4 w-4 text-yellow-500" />,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "bronze":
        return "border-amber-600 bg-amber-50"
      case "silver":
        return "border-gray-400 bg-gray-50"
      case "gold":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "consultas":
        return <Stethoscope className="h-4 w-4" />
      case "tienda":
        return <ShoppingCart className="h-4 w-4" />
      case "ia":
        return <Zap className="h-4 w-4" />
      case "productos":
        return <Gift className="h-4 w-4" />
      case "premium":
        return <Crown className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-800">Centro de Recompensas</h1>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Puntos Totales</p>
                  <p className="text-3xl font-bold">{userPoints.toLocaleString()}</p>
                </div>
                <Star className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Nivel</p>
                  <p className="text-3xl font-bold">{userLevel}</p>
                </div>
                <Crown className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Logros</p>
                  <p className="text-3xl font-bold">{achievements.filter((a) => a.unlocked).length}</p>
                </div>
                <Award className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Siguiente Nivel</p>
                  <p className="text-lg font-bold">350 puntos</p>
                </div>
                <Target className="h-12 w-12 text-orange-200" />
              </div>
              <Progress value={78} className="mt-2 bg-orange-200" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Logros</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${achievement.unlocked ? getRarityColor(achievement.rarity) : "opacity-60"} border-2`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      {achievement.icon}
                      <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                        {achievement.unlocked ? "Desbloqueado" : "Bloqueado"}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                    {achievement.unlocked ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-600">+{achievement.points} puntos</span>
                        <span className="text-xs text-gray-500">{achievement.date}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className={`${!reward.available ? "opacity-60" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      {getCategoryIcon(reward.category)}
                      <Badge variant={reward.available ? "default" : "secondary"}>{reward.cost} puntos</Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>

                    <Button className="w-full" disabled={!reward.available || userPoints < reward.cost}>
                      {userPoints >= reward.cost ? "Canjear" : "Puntos Insuficientes"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Tus últimas acciones que generaron puntos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {activity.icon}
                        <div>
                          <p className="font-semibold">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        +{activity.points} puntos
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Points Earning Guide */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>¿Cómo Ganar Puntos?</CardTitle>
                <CardDescription>Actividades que te otorgan puntos de recompensa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Asistir a cita</span>
                      </div>
                      <Badge variant="outline">50 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Compra en tienda</span>
                      </div>
                      <Badge variant="outline">25 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Usar diagnóstico IA</span>
                      </div>
                      <Badge variant="outline">30 pts</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Participar en foro</span>
                      </div>
                      <Badge variant="outline">15 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-600" />
                        <span className="text-sm">Completar vacunación</span>
                      </div>
                      <Badge variant="outline">100 pts</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm">Reseña de veterinario</span>
                      </div>
                      <Badge variant="outline">40 pts</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
