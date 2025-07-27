import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { symptoms, petInfo } = await request.json()

    const prompt = `
    Eres un veterinario experto con IA. Analiza los siguientes síntomas de una mascota y proporciona un diagnóstico preliminar.

    Información de la mascota:
    - Nombre: ${petInfo.name}
    - Tipo: ${petInfo.type}
    - Raza: ${petInfo.breed}
    - Edad: ${petInfo.age} años
    - Peso: ${petInfo.weight} kg

    Síntomas reportados: ${symptoms}

    Por favor proporciona:
    1. Nivel de urgencia (bajo, medio, alto)
    2. 3 posibles condiciones con probabilidades
    3. Recomendaciones inmediatas
    4. Si se necesita visita veterinaria y en qué tiempo

    Responde en formato JSON con esta estructura:
    {
      "urgencyLevel": "medio",
      "possibleConditions": [
        {
          "condition": "Nombre de la condición",
          "probability": 75,
          "description": "Descripción breve",
          "symptoms": ["síntoma1", "síntoma2"],
          "treatment": "Tratamiento sugerido"
        }
      ],
      "recommendations": ["recomendación1", "recomendación2"],
      "vetVisitRecommended": true,
      "timeframe": "24-48 horas"
    }
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
    })

    // Parse the JSON response
    const diagnosis = JSON.parse(text)

    return Response.json(diagnosis)
  } catch (error) {
    console.error("Error in AI diagnosis:", error)
    return Response.json({ error: "Error processing diagnosis" }, { status: 500 })
  }
}
