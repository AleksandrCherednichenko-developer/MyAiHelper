import { ApiResult } from '@/types/api'

export class BaseApiClient {
	protected baseUrl: string

	constructor(baseUrl: string = '') {
		this.baseUrl = baseUrl
	}

	protected async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<ApiResult<T>> {
		try {
			const url = `${this.baseUrl}${endpoint}`

			const defaultOptions: RequestInit = {
				headers: {
					'Content-Type': 'application/json',
					...options.headers,
				},
			}

			const response = await fetch(url, {
				...defaultOptions,
				...options,
			})

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ error: 'Unknown error' }))
				return {
					success: false,
					error: errorData.error || `HTTP error! status: ${response.status}`,
				}
			}

			const data = await response.json()
			return {
				success: true,
				data,
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Network error',
			}
		}
	}
}
