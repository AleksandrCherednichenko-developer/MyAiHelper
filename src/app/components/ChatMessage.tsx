import { Message } from '../types/chat'

interface ChatMessageProps {
	message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const isUser = message.sender === 'user'

	return (
		<div
			className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${
				isUser ? 'animate-slideInRight' : 'animate-slideInLeft'
			}`}
		>
			<div className={`flex flex-col max-w-xs md:max-w-md lg:max-w-lg`}>
				<div
					className={`px-4 py-3 rounded-2xl shadow-md ${
						isUser
							? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
							: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
					}`}
				>
					<p className='leading-relaxed break-words'>{message.text}</p>
				</div>
				{message.timestamp && (
					<div
						className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
							isUser ? 'text-right' : 'text-left'
						}`}
					>
						{formatTime(message.timestamp)}
					</div>
				)}
			</div>
		</div>
	)
}
