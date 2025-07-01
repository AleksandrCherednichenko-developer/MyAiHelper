'use client'

import { useState, useEffect, useRef } from 'react'

type Message = {
	id: number
	text: string
	sender: 'user' | 'ai'
}

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (input.trim() === '') return

		const userMessage: Message = {
			id: Date.now(),
			text: input,
			sender: 'user',
		}

		setMessages(prevMessages => [...prevMessages, userMessage])
		const currentInput = input
		setInput('')

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
			}
			setMessages(prevMessages => [...prevMessages, aiMessage])
		} catch (error) {
			console.error('Error sending message:', error)
			const errorMessage: Message = {
				id: Date.now() + 1,
				text: 'Sorry, there was an error processing your message.',
				sender: 'ai',
			}
			setMessages(prevMessages => [...prevMessages, errorMessage])
		}
	}

	return (
		<div className='flex flex-col h-screen bg-gray-100 dark:bg-gray-900'>
			<div className='flex-1 p-4 overflow-y-auto'>
				<div className='flex flex-col gap-4'>
					{messages.map(message => (
						<div
							key={message.id}
							className={`flex ${
								message.sender === 'user' ? 'justify-end' : 'justify-start'
							}`}
						>
							<div
								className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
									message.sender === 'user'
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
								}`}
							>
								{message.text}
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			</div>

			<div className='p-4 pb-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
				<form onSubmit={handleSendMessage} className='flex items-center gap-4'>
					<input
						type='text'
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder='Type your message...'
						className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
					/>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						Send
					</button>
				</form>
			</div>
		</div>
	)
}
