import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
	title: 'Personal AI Helper',
	description: 'This is my personal ai helper',
	viewport:
		'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
	themeColor: '#3b82f6',
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
				<Script id='sw-register' strategy='afterInteractive'>
					{`
						if ('serviceWorker' in navigator) {
							navigator.serviceWorker.register('/sw.js');
						}
					`}
				</Script>
			</head>
			<body>{children}</body>
		</html>
	)
}
