import { NextRequest, NextResponse } from 'next/server'

// Lazy load Groq SDK to improve cold start performance
let groq: any = null

const getGroqClient = async () => {
	if (!groq) {
		const Groq = (await import('groq-sdk')).default
		groq = new Groq({
			apiKey: process.env.GROQ_API_KEY || process.env['groq-api-key'],
		})
	}
	return groq
}

export async function POST(request: NextRequest) {
	try {
		const { message } = await request.json()

		if (!message || message.trim() === '') {
			return NextResponse.json(
				{ error: 'Message is required' },
				{ status: 400 }
			)
		}

		// Check if Groq API key is configured
		const apiKey = process.env.GROQ_API_KEY || process.env['groq-api-key']
		console.log(
			'API Key check:',
			apiKey ? 'API key is set' : 'API key is missing'
		)

		if (!apiKey || apiKey === 'your_groq_api_key_here') {
			// Fallback to mock responses if API key is not configured
			const mockResponses = [
				'Это интересный вопрос! Расскажите больше. (Моковый ответ - настройте GROQ_API_KEY)',
				'Я понимаю вашу точку зрения. Что вы думаете об этом? (Моковый ответ)',
				'Хороший вопрос! Давайте разберем это подробнее. (Моковый ответ)',
				'Интересно! А как вы к этому пришли? (Моковый ответ)',
				'Спасибо за вопрос. Настройте GROQ_API_KEY для реальных ответов AI.',
			]

			const randomResponse =
				mockResponses[Math.floor(Math.random() * mockResponses.length)]

			await new Promise(resolve => setTimeout(resolve, 1000))

			return NextResponse.json({
				response: randomResponse,
				timestamp: new Date().toISOString(),
			})
		}

		// Use Groq AI for real responses
		console.log('Attempting to call Groq API with message:', message)

		const groqClient = await getGroqClient()
		const chatCompletion = await groqClient.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						'Ты полезный AI-ассистент. Отвечай на русском языке, будь дружелюбным и полезным.',
				},
				{
					role: 'user',
					content: message,
				},
			],
			model: 'llama-3.1-8b-instant', // Fast and capable model
			temperature: 0.7,
			max_tokens: 1024,
		})

		console.log('Groq API response received successfully')

		const aiResponse =
			chatCompletion.choices[0]?.message?.content ||
			'Извините, не смог сгенерировать ответ.'

		return NextResponse.json({
			response: aiResponse,
			timestamp: new Date().toISOString(),
		})
	} catch (error) {
		console.error('Error in chat API:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
