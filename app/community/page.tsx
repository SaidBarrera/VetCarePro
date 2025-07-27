"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Search,
  TrendingUp,
  Award,
  Camera,
  ThumbsUp,
  Eye,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [newPost, setNewPost] = useState("")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const groups = [
    {
      id: "1",
      name: "Dueños de Gatos Siameses",
      members: 1247,
      posts: 89,
      description: "Comunidad dedicada a los hermosos gatos siameses",
      image: "/placeholder.svg?height=60&width=60",
      joined: true,
    },
    {
      id: "2",
      name: "Golden Retrievers",
      members: 2156,
      posts: 156,
      description: "Todo sobre la raza más amigable",
      image: "/placeholder.svg?height=60&width=60",
      joined: true,
    },
    {
      id: "3",
      name: "Primeros Auxilios Veterinarios",
      members: 3421,
      posts: 234,
      description: "Consejos de emergencia para mascotas",
      image: "/placeholder.svg?height=60&width=60",
      joined: false,
    },
    {
      id: "4",
      name: "Nutrición Animal",
      members: 1876,
      posts: 198,
      description: "Alimentación saludable para mascotas",
      image: "/placeholder.svg?height=60&width=60",
      joined: false,
    },
  ]

  const forumPosts = [
    {
      id: "1",
      title: "¿Cómo enseñar a mi gato a usar el arenero?",
      author: "María González",
      avatar: "/placeholder.svg?height=40&width=40",
      group: "Dueños de Gatos Siameses",
      content:
        "Mi gatito de 3 meses no quiere usar el arenero. He probado diferentes tipos de arena pero nada funciona. ¿Algún consejo?",
      likes: 23,
      replies: 15,
      views: 156,
      time: "2 horas",
      tags: ["entrenamiento", "gatitos", "comportamiento"],
    },
    {
      id: "2",
      title: "Mi Golden Retriever perdió peso después de la cirugía",
      author: "Carlos Ruiz",
      avatar: "/placeholder.svg?height=40&width=40",
      group: "Golden Retrievers",
      content:
        "Hace una semana operaron a Max de una hernia. Desde entonces ha perdido 2 kg. ¿Es normal? El veterinario dice que sí, pero me preocupa.",
      likes: 18,
      replies: 12,
      views: 89,
      time: "4 horas",
      tags: ["cirugía", "recuperación", "peso"],
    },
    {
      id: "3",
      title: "Receta casera de galletas saludables para perros",
      author: "Ana López",
      avatar: "/placeholder.svg?height=40&width=40",
      group: "Nutrición Animal",
      content:
        "Comparto mi receta favorita de galletas sin azúcar para perros. Mis perritos las aman y son súper nutritivas.",
      likes: 45,
      replies: 28,
      views: 234,
      time: "1 día",
      tags: ["recetas", "nutrición", "casero"],
      hasImage: true,
    },
  ]

  const successStories = [
    {
      id: "1",
      title: "Max se recuperó completamente de su cirugía",
      author: "Dr. García",
      authorType: "veterinario",
      pet: "Max - Golden Retriever",
      story:
        "Max llegó con una hernia complicada. Después de una cirugía exitosa y 3 semanas de recuperación, está corriendo feliz en el parque otra vez.",
      image: "/placeholder.svg?height=200&width=300",
      likes: 156,
      shares: 23,
      time: "3 días",
    },
    {
      id: "2",
      title: "Luna superó su miedo al veterinario",
      author: "Dra. Martínez",
      authorType: "veterinario",
      pet: "Luna - Gato Siamés",
      story:
        "Con paciencia y técnicas de desensibilización, Luna pasó de esconderse bajo la mesa a ronronear durante las consultas.",
      image: "/placeholder.svg?height=200&width=300",
      likes: 89,
      shares: 12,
      time: "1 semana",
    },
    {
      id: "3",
      title: "Rescate exitoso de cachorro abandonado",
      author: "Refugio Esperanza",
      authorType: "refugio",
      pet: "Rocky - Mestizo",
      story:
        "Rocky fue encontrado desnutrido y enfermo. Hoy, después de 2 meses de cuidados, encontró una familia amorosa.",
      image: "/placeholder.svg?height=200&width=300",
      likes: 234,
      shares: 45,
      time: "2 semanas",
    },
  ]

  const trendingTopics = [
    { topic: "Vacunación COVID-19 mascotas", posts: 45 },
    { topic: "Alimentación sin granos", posts: 32 },
    { topic: "Ansiedad por separación", posts: 28 },
    { topic: "Cuidados de invierno", posts: 24 },
    { topic: "Juguetes interactivos", posts: 19 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Comunidad VetCare</h1>
          </div>
        </div>

        <Tabs defaultValue="forum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forum">Foro</TabsTrigger>
            <TabsTrigger value="groups">Grupos</TabsTrigger>
            <TabsTrigger value="stories">Historias de Éxito</TabsTrigger>
            <TabsTrigger value="trending">Tendencias</TabsTrigger>
          </TabsList>

          <TabsContent value="forum">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Forum */}
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="h-5 w-5" />
                      <span>Crear Nueva Publicación</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Título de tu publicación..." />
                    <Textarea
                      placeholder="Comparte tu experiencia, pregunta o consejo..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Foto
                        </Button>
                        <Button variant="outline" size="sm">
                          <Award className="h-4 w-4 mr-2" />
                          Etiquetas
                        </Button>
                      </div>
                      <Button>Publicar</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Forum Posts */}
                <div className="space-y-4">
                  {forumPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={post.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{post.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {post.group}
                              </Badge>
                            </div>

                            <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{post.time}</span>
                            </div>

                            <p className="text-gray-700 mb-4">{post.content}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{post.replies}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{post.views}</span>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="h-4 w-4 mr-1" />
                                  Me gusta
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Responder
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Compartir
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Search */}
                <Card>
                  <CardContent className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Buscar en el foro..." className="pl-10" />
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Groups */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Grupos Populares</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {groups.slice(0, 3).map((group) => (
                      <div key={group.id} className="flex items-center space-x-3">
                        <img
                          src={group.image || "/placeholder.svg"}
                          alt={group.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{group.name}</p>
                          <p className="text-xs text-gray-600">{group.members} miembros</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Miembros activos</span>
                      <span className="font-semibold">8,432</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Publicaciones hoy</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Respuestas hoy</span>
                      <span className="font-semibold">423</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{group.name}</h3>
                        <p className="text-sm text-gray-600">{group.members} miembros</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{group.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{group.posts} publicaciones</span>
                        <span>•</span>
                        <span>Activo hoy</span>
                      </div>
                    </div>

                    <Button className="w-full" variant={group.joined ? "outline" : "default"}>
                      {group.joined ? "Unirse" : "Unirse al Grupo"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={story.authorType === "veterinario" ? "default" : "secondary"}
                    >
                      {story.authorType}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{story.pet}</p>
                    <p className="text-gray-700 mb-4">{story.story}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{story.author}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{story.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="h-4 w-4" />
                          <span>{story.shares}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm">
                        Leer más
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <span>Temas Trending</span>
                  </CardTitle>
                  <CardDescription>Los temas más discutidos esta semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-orange-500">#{index + 1}</span>
                          <span className="font-semibold">{topic.topic}</span>
                        </div>
                        <Badge variant="outline">{topic.posts} posts</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span>Actividad Reciente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border-l-4 border-l-blue-500 bg-blue-50">
                      <Users className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold">15 nuevos miembros se unieron hoy</p>
                        <p className="text-xs text-gray-600">Hace 2 horas</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border-l-4 border-l-green-500 bg-green-50">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold">Nueva discusión sobre nutrición felina</p>
                        <p className="text-xs text-gray-600">Hace 4 horas</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border-l-4 border-l-purple-500 bg-purple-50">
                      <Award className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-semibold">Dr. García compartió una historia de éxito</p>
                        <p className="text-xs text-gray-600">Hace 6 horas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
