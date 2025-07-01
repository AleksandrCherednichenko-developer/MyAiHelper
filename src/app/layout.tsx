import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
	title: 'Personal AI Helper',
	description: 'This is my personal ai helper',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link rel='preconnect' href='https://api.groq.com' />
				<Script
					src='https://telegram.org/js/telegram-web-app.js'
					strategy='beforeInteractive'
				/>
			</head>
			<body>{children}</body>
		</html>
	)
}
