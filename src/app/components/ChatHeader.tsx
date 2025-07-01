export default function ChatHeader() {
	return (
		<div className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4'>
			<div className='flex items-center space-x-3'>
				<div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md'>
					<span className='text-white font-bold text-sm'>AI</span>
				</div>
				<div>
					<h1 className='font-semibold text-gray-900 dark:text-white'>
						AI Assistant
					</h1>
					<p className='text-sm text-gray-500 dark:text-gray-400 flex items-center'>
						<span className='w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-slow'></span>
						Always here to help
					</p>
				</div>
			</div>
		</div>
	)
}
