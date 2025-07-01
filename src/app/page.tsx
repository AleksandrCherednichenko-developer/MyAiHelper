'use client'

import { useState, useEffect, useRef } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import ChatHeader from './components/ChatHeader'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import TypingIndicator from './components/TypingIndicator'
import WelcomeMessage from './components/WelcomeMessage'
import { Message } from './types/chat'

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isAppReady, setIsAppReady] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	useEffect(() => {
		// Simulate app initialization
		const timer = setTimeout(() => {
			setIsAppReady(true)
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	const handleQuickSuggestion = (suggestion: string) => {
		setInput(suggestion)
	}

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (input.trim() === '' || isLoading) return

		const userMessage: Message = {
			id: Date.now(),
			text: input,
			sender: 'user',
			timestamp: new Date(),
		}

		setMessages(prevMessages => [...prevMessages, userMessage])
		const currentInput = input
		setInput('')
		setIsLoading(true)

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: currentInput }),
			})

			if (!response.ok) {
				throw new Error('Failed to get AI response')
			}

			const data = await response.json()
			const aiMessage: Message = {
				id: Date.now() + 1,
				text: data.response,
				sender: 'ai',
				timestamp: new Date(),
			}
			setMessages(prevMessages => [...prevMessages, aiMessage])
		} catch (error) {
			console.error('Error sending message:', error)
			const errorMessage: Message = {
				id: Date.now() + 1,
				text: '🔄 Sorry, there was an error processing your message. Please try again.',
				sender: 'ai',
				timestamp: new Date(),
			}
			setMessages(prevMessages => [...prevMessages, errorMessage])
		} finally {
			setIsLoading(false)
		}
	}

	if (!isAppReady) {
		return <LoadingSpinner />
	}

	return (
		<div className='flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
			<ChatHeader />

			{/* Messages */}
			<div className='flex-1 p-4 overflow-y-auto messages-container'>
				<div className='flex flex-col gap-4'>
					{messages.length === 0 && (
						<WelcomeMessage onQuickSuggestion={handleQuickSuggestion} />
					)}
					{messages.map(message => (
						<ChatMessage key={message.id} message={message} />
					))}
					{isLoading && <TypingIndicator />}
					<div ref={messagesEndRef} />
				</div>
			</div>

			<ChatInput
				input={input}
				setInput={setInput}
				onSendMessage={handleSendMessage}
				isLoading={isLoading}
			/>
		</div>
	)
}
