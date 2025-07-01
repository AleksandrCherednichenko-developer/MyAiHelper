export default function TypingIndicator() {
	return (
		<div className='flex justify-start animate-fadeIn'>
			<div className='bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-md border border-gray-200 dark:border-gray-600'>
				<div className='flex space-x-1'>
					<div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
					<div
						className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
						style={{ animationDelay: '0.1s' }}
					></div>
					<div
						className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
						style={{ animationDelay: '0.2s' }}
					></div>
				</div>
			</div>
		</div>
	)
}
