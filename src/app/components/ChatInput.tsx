interface ChatInputProps {
	input: string
	setInput: (value: string) => void
	onSendMessage: (e: React.FormEvent) => void
	isLoading: boolean
}

export default function ChatInput({
	input,
	setInput,
	onSendMessage,
	isLoading,
}: ChatInputProps) {
	return (
		<div className='p-4 pb-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
			<form onSubmit={onSendMessage} className='flex items-center gap-3'>
				<div className='flex-1 relative'>
					<input
						type='text'
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder='Type your message...'
						disabled={isLoading}
						className='w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 transition-all duration-200'
					/>
					{input && (
						<button
							type='button'
							onClick={() => setInput('')}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
						>
							✕
						</button>
					)}
				</div>
				<button
					type='submit'
					disabled={isLoading || !input.trim()}
					className='size-10 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg'
				>
					{isLoading ? (
						<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
					) : (
						<span className='text-lg'>➤</span>
					)}
				</button>
			</form>
		</div>
	)
}
