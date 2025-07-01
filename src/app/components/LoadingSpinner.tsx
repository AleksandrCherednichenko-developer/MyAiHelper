export default function LoadingSpinner() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
			<div className='flex flex-col items-center space-y-4'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
				<p className='text-gray-600 dark:text-gray-300'>
					Loading AI Assistant...
				</p>
			</div>
		</div>
	)
}
