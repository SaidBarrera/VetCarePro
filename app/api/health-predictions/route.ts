import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { petData, healthHistory } = await request.json()

    const prompt = `
    Eres un veterinario especialista en medicina preventiva. Analiza los datos de esta mascota y predice posibles riesgos de salud futuros.

    Datos de la mascota:
    - Tipo: ${petData.type}
    - Raza: ${petData.breed}
    - Edad: ${petData.age} años
    - Peso: ${petData.weight} kg
    - Historial: ${JSON.stringify(healthHistory)}

    Proporciona predicciones basadas en:
    1. Predisposiciones genéticas de la raza
    2. Edad y peso actual
    3. Historial médico
    4. Factores de riesgo conocidos

    Responde en formato JSON:
    {
      "predictions": [
        {
          "condition": "Nombre de la condición",
          "probability": 65,
          "timeframe": "2-3 años",
          "riskLevel": "bajo/medio/alto",
          "description": "Explicación del riesgo",
          "preventionMeasures": ["medida1", "medida2"]
        }
      ],
      "generalRecommendations": ["recomendación1", "recomendación2"],
      "nextCheckups": [
        {
          "type": "Tipo de revisión",
          "frequency": "Cada 6 meses",
          "importance": "Alta"
        }
      ]
    }
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
    })

    const predictions = JSON.parse(text)

    return Response.json(predictions)
  } catch (error) {
    console.error("Error in health predictions:", error)
    return Response.json({ error: "Error generating health predictions" }, { status: 500 })
  }
}
