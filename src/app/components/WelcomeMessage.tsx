interface WelcomeMessageProps {
	onQuickSuggestion: (suggestion: string) => void
}

export default function WelcomeMessage({
	onQuickSuggestion,
}: WelcomeMessageProps) {
	const quickSuggestions = [
		'👋 Hello!',
		'🤔 Help me with...',
		'📝 Write a summary',
		'💡 Give me ideas',
		'🔍 Explain this topic',
	]

	return (
		<div className='text-center py-8 animate-fadeIn'>
			<div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
				<span className='text-white text-2xl'>👋</span>
			</div>
			<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
				Welcome to AI Assistant!
			</h2>
			<p className='text-gray-600 dark:text-gray-300 mb-6'>
				Ask me anything and I&apos;ll be happy to help you.
			</p>
			<div className='flex flex-wrap gap-2 justify-center'>
				{quickSuggestions.map((suggestion, index) => (
					<button
						key={index}
						onClick={() => onQuickSuggestion(suggestion)}
						className='px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm hover:shadow-md'
					>
						{suggestion}
					</button>
				))}
			</div>
		</div>
	)
}
