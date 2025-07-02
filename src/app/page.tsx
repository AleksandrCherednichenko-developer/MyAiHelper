'use client'

import { useState, useEffect, useRef } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import ChatHeader from '@/components/ChatHeader'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import TypingIndicator from '@/components/TypingIndicator'
import WelcomeMessage from '@/components/WelcomeMessage'
import { useChat } from '@/hooks/use-chat'

export default function ChatPage() {
	const [input, setInput] = useState('')
	const [isAppReady, setIsAppReady] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const { messages, isLoading, sendMessage } = useChat()

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

		const currentInput = input
		setInput('')
		await sendMessage(currentInput)
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
