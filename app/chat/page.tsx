"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, ArrowLeft, Phone, Video, Paperclip, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [message, setMessage] = useState("")
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

  const chats = [
    {
      id: "1",
      name: "Dr. García",
      specialty: "Medicina General",
      lastMessage: "Los resultados del análisis están listos",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Dra. Martínez",
      specialty: "Cirugía",
      lastMessage: "La cirugía fue exitosa",
      time: "Ayer",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Dr. López",
      specialty: "Dermatología",
      lastMessage: "Aplica la crema dos veces al día",
      time: "2 días",
      unread: 0,
      online: true,
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "vet",
      content: "Hola! He revisado las fotos que me enviaste de Max. ¿Cómo se encuentra hoy?",
      time: "10:15 AM",
      type: "text",
    },
    {
      id: "2",
      sender: "user",
      content: "Hola Doctor! Está mucho mejor, ya no se rasca tanto.",
      time: "10:18 AM",
      type: "text",
    },
    {
      id: "3",
      sender: "vet",
      content: "Excelente noticia. Los resultados del análisis de sangre están listos. Todo salió normal.",
      time: "10:30 AM",
      type: "text",
    },
    {
      id: "4",
      sender: "vet",
      content: "Te envío el reporte completo",
      time: "10:30 AM",
      type: "file",
      fileName: "Análisis_Max_Feb2024.pdf",
    },
    {
      id: "5",
      sender: "user",
      content: "¡Qué alivio! Muchas gracias Doctor. ¿Debo continuar con el tratamiento?",
      time: "10:35 AM",
      type: "text",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí se enviaría el mensaje
      setMessage("")
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-800">Chat Veterinario</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversaciones</CardTitle>
              <CardDescription>Tus chats con veterinarios</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                      selectedChat === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {chat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm truncate">{chat.name}</p>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <p className="text-xs text-gray-600">{chat.specialty}</p>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>DG</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Dr. García</h3>
                        <p className="text-sm text-gray-600">Medicina General</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600">En línea</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.type === "file" ? (
                          <div className="flex items-center space-x-2">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm underline cursor-pointer">{msg.fileName}</span>
                          </div>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                        <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Escribe tu mensaje..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Selecciona una conversación para comenzar</p>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Quick Consultation */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Consulta Rápida</CardTitle>
            <CardDescription>Inicia una nueva conversación con un veterinario disponible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Button className="h-20 w-full flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
                  <span className="font-semibold">Asistente IA</span>
                  <span className="text-sm opacity-80">Gratis</span>
                </Button>
                <Badge className="absolute -top-2 -right-2 bg-yellow-500">+30 pts</Badge>
              </div>
              <div className="relative">
                <Button className="h-20 w-full flex flex-col space-y-2">
                  <span className="font-semibold">Consulta General</span>
                  <span className="text-sm opacity-80">$25 USD</span>
                </Button>
                <Badge className="absolute -top-2 -right-2 bg-yellow-500">+50 pts</Badge>
              </div>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <span className="font-semibold">Consulta Especializada</span>
                <span className="text-sm opacity-80">$45 USD</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <span className="font-semibold">Emergencia</span>
                <span className="text-sm opacity-80">$60 USD</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
