import { useState, useCallback } from 'react'
import { Message } from '@/types/chat'
import { apiClient } from '@/lib/api'

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const sendMessage = useCallback(
		async (text: string) => {
			if (text.trim() === '' || isLoading) return

			// Добавляем сообщение пользователя
			const userMessage: Message = {
				id: Date.now(),
				text,
				sender: 'user',
				timestamp: new Date(),
			}

			setMessages(prev => [...prev, userMessage])
			setIsLoading(true)

			try {
				const response = await apiClient.chat.sendMessage(text)

				const aiMessage: Message = {
					id: Date.now() + 1,
					text: response.response,
					sender: 'ai',
					timestamp: new Date(),
				}
				setMessages(prev => [...prev, aiMessage])
			} catch (error) {
				console.error('Error sending message:', error)
				const errorMessage: Message = {
					id: Date.now() + 1,
					text: '🔄 Sorry, there was an error processing your message. Please try again.',
					sender: 'ai',
					timestamp: new Date(),
				}
				setMessages(prev => [...prev, errorMessage])
			} finally {
				setIsLoading(false)
			}
		},
		[isLoading]
	)

	const clearMessages = useCallback(() => {
		setMessages([])
	}, [])

	return {
		messages,
		isLoading,
		sendMessage,
		clearMessages,
	}
}
