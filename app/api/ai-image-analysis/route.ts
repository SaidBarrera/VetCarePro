import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { imageData, petInfo } = await request.json()

    const prompt = `
    Eres un veterinario especialista en diagnóstico por imágenes. Analiza esta imagen de una mascota y proporciona un análisis detallado.

    Información de la mascota:
    - Tipo: ${petInfo.type}
    - Raza: ${petInfo.breed}
    - Edad: ${petInfo.age} años

    Instrucciones:
    1. Identifica cualquier anomalía visible
    2. Evalúa la severidad
    3. Proporciona recomendaciones
    4. Indica nivel de urgencia

    Responde en formato JSON:
    {
      "findings": [
        {
          "type": "Tipo de hallazgo",
          "confidence": 85,
          "location": "Ubicación en la imagen",
          "severity": "Leve/Moderada/Severa",
          "description": "Descripción detallada"
        }
      ],
      "recommendations": ["recomendación1", "recomendación2"],
      "urgency": "low/medium/high"
    }
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.2,
    })

    const analysis = JSON.parse(text)

    return Response.json(analysis)
  } catch (error) {
    console.error("Error in image analysis:", error)
    return Response.json({ error: "Error processing image analysis" }, { status: 500 })
  }
}
