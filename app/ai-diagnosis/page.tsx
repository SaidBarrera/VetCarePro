"use client"

import { Calendar } from "@/components/ui/calendar"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Brain, Camera, Mic, Upload, AlertTriangle, CheckCircle, Clock, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export default function AIDiagnosisPage() {
  const [symptoms, setSymptoms] = useState("")
  const [selectedPet, setSelectedPet] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const pets = [
    { id: "1", name: "Max", type: "Perro", breed: "Golden Retriever", age: 3, weight: 28 },
    { id: "2", name: "Luna", type: "Gato", breed: "Siamés", age: 2, weight: 4.2 },
  ]

  const handleSymptomAnalysis = async () => {
    if (!symptoms.trim() || !selectedPet) return

    setIsAnalyzing(true)

    // Simular análisis de IA
    setTimeout(() => {
      const mockResult = {
        urgencyLevel: "medium",
        possibleConditions: [
          {
            condition: "Gastroenteritis",
            probability: 75,
            description: "Inflamación del estómago e intestinos",
            symptoms: ["vómito", "diarrea", "pérdida de apetito"],
            treatment: "Dieta blanda, hidratación, medicación antiemética",
          },
          {
            condition: "Intoxicación alimentaria",
            probability: 60,
            description: "Reacción a alimento en mal estado o tóxico",
            symptoms: ["vómito", "letargo", "deshidratación"],
            treatment: "Atención veterinaria inmediata, fluidos IV",
          },
          {
            condition: "Estrés o ansiedad",
            probability: 40,
            description: "Respuesta emocional a cambios ambientales",
            symptoms: ["vómito ocasional", "comportamiento alterado"],
            treatment: "Ambiente tranquilo, posible medicación ansiolítica",
          },
        ],
        recommendations: [
          "Suspender alimentación por 12-24 horas",
          "Ofrecer agua en pequeñas cantidades frecuentes",
          "Monitorear signos de deshidratación",
          "Consultar veterinario si los síntomas persisten",
        ],
        vetVisitRecommended: true,
        timeframe: "24-48 horas",
      }

      setAnalysisResult(mockResult)
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!uploadedImage) return

    setIsAnalyzing(true)

    // Simular análisis de imagen por IA
    setTimeout(() => {
      const mockImageResult = {
        findings: [
          {
            type: "Irritación cutánea",
            confidence: 85,
            location: "Área detectada en la imagen",
            severity: "Leve a moderada",
            description: "Posible dermatitis o reacción alérgica",
          },
        ],
        recommendations: [
          "Limpiar el área con solución salina",
          "Evitar que la mascota se rasque",
          "Aplicar compresas frías",
          "Consultar veterinario para tratamiento específico",
        ],
        urgency: "low",
      }

      setAnalysisResult(mockImageResult)
      setIsAnalyzing(false)
    }, 2500)
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Diagnóstico Asistido por IA</h1>
          </div>
        </div>

        <Tabs defaultValue="symptoms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="symptoms" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Análisis de Síntomas</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Análisis de Imagen</span>
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Predicciones</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>Describe los Síntomas</span>
                  </CardTitle>
                  <CardDescription>
                    Nuestra IA analizará los síntomas y proporcionará posibles diagnósticos
                  </CardDescription>
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
                    <Label htmlFor="symptoms">Síntomas Observados</Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Describe detalladamente los síntomas que has observado en tu mascota. Por ejemplo: 'Mi gato ha vomitado tres veces hoy, no quiere comer y está muy decaído...'"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSymptomAnalysis} disabled={!symptoms.trim() || !selectedPet || isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-pulse" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Analizar Síntomas
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mic className="h-4 w-4 mr-2" />
                      Grabar Audio
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-purple-600 animate-pulse" />
                        <span className="text-sm text-gray-600">Procesando con IA...</span>
                      </div>
                      <Progress value={66} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Resultados del Análisis</CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult ? (
                    <div className="space-y-6">
                      {/* Urgency Level */}
                      <div className={`p-4 rounded-lg border ${getUrgencyColor(analysisResult.urgencyLevel)}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-semibold">
                            Nivel de Urgencia:{" "}
                            {analysisResult.urgencyLevel === "high"
                              ? "Alto"
                              : analysisResult.urgencyLevel === "medium"
                                ? "Medio"
                                : "Bajo"}
                          </span>
                        </div>
                        {analysisResult.vetVisitRecommended && (
                          <p className="text-sm">Se recomienda consulta veterinaria en {analysisResult.timeframe}</p>
                        )}
                      </div>

                      {/* Possible Conditions */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Posibles Condiciones</h3>
                        {analysisResult.possibleConditions?.map((condition: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{condition.condition}</h4>
                              <Badge variant="outline">{condition.probability}% probabilidad</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{condition.description}</p>
                            <div className="text-sm">
                              <p className="font-medium">Síntomas relacionados:</p>
                              <p className="text-gray-600">{condition.symptoms.join(", ")}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Recommendations */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Recomendaciones</h3>
                        <div className="space-y-2">
                          {analysisResult.recommendations?.map((rec: string, index: number) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Cita Veterinaria
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Describe los síntomas para obtener un análisis detallado</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="image">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-blue-600" />
                    <span>Análisis de Imagen</span>
                  </CardTitle>
                  <CardDescription>Sube una foto para que nuestra IA identifique posibles anomalías</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded"
                          className="max-w-full h-48 object-contain mx-auto"
                        />
                        <Button onClick={analyzeImage} disabled={isAnalyzing}>
                          {isAnalyzing ? (
                            <>
                              <Zap className="h-4 w-4 mr-2 animate-pulse" />
                              Analizando Imagen...
                            </>
                          ) : (
                            <>
                              <Brain className="h-4 w-4 mr-2" />
                              Analizar Imagen
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium">Sube una imagen</p>
                          <p className="text-sm text-gray-600">
                            Fotos de heridas, piel, ojos, o cualquier área de preocupación
                          </p>
                        </div>
                        <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs mx-auto" />
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Consejos para mejores resultados:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Usa buena iluminación natural</li>
                      <li>• Mantén la imagen enfocada</li>
                      <li>• Incluye el área afectada claramente</li>
                      <li>• Evita sombras o reflejos</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Image Analysis Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Resultados del Análisis de Imagen</CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult?.findings ? (
                    <div className="space-y-6">
                      {analysisResult.findings.map((finding: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{finding.type}</h4>
                            <Badge variant="outline">{finding.confidence}% confianza</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Ubicación:</strong> {finding.location}
                            </p>
                            <p>
                              <strong>Severidad:</strong> {finding.severity}
                            </p>
                            <p>
                              <strong>Descripción:</strong> {finding.description}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Recomendaciones</h3>
                        <div className="space-y-2">
                          {analysisResult.recommendations?.map((rec: string, index: number) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Sube una imagen para obtener análisis detallado</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Health Predictions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Predicciones de Salud</span>
                  </CardTitle>
                  <CardDescription>Basado en el historial y datos de tu mascota</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Riesgo de Obesidad - Max</h4>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                          Riesgo Medio
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Basado en la raza, edad y tendencia de peso, Max tiene un 65% de probabilidad de desarrollar
                        obesidad en los próximos 2 años.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Probabilidad</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="w-full" />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Problemas Dentales - Luna</h4>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">
                          Riesgo Alto
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Los gatos siameses tienen predisposición a problemas dentales. Se recomienda limpieza dental
                        preventiva.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Probabilidad</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="w-full" />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Artritis - Max</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Riesgo Bajo
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Aunque es una raza grande, Max mantiene un peso saludable y actividad regular, reduciendo el
                        riesgo.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Probabilidad</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} className="w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Prevention Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recomendaciones Preventivas</CardTitle>
                  <CardDescription>Acciones para mantener la salud óptima</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Para Max (Golden Retriever)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Control de peso mensual</li>
                        <li>• Ejercicio diario: 60-90 minutos</li>
                        <li>• Dieta balanceada baja en grasas</li>
                        <li>• Revisión articular cada 6 meses</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Para Luna (Siamés)</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Limpieza dental semanal</li>
                        <li>• Revisión dental cada 4 meses</li>
                        <li>• Juguetes dentales especializados</li>
                        <li>• Dieta que promueva salud dental</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Recordatorios Inteligentes</h4>
                      <div className="space-y-2 text-sm text-green-700">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Próxima vacuna Max: 15 Feb 2024</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Limpieza dental Luna: 20 Feb 2024</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Control peso Max: 25 Feb 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Configurar Plan Preventivo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Disclaimer */}
        <Card className="mt-8 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Importante: Limitaciones de la IA</h3>
                <p className="text-amber-700 text-sm">
                  Este análisis es una herramienta de apoyo y no reemplaza el diagnóstico profesional de un veterinario.
                  Siempre consulta con un profesional para obtener un diagnóstico definitivo y tratamiento adecuado. En
                  caso de emergencia, busca atención veterinaria inmediata.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
