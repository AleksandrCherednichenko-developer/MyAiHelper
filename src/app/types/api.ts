// API Request types
export interface ChatRequest {
	message: string
}

// API Response types
export interface ChatResponse {
	response: string
	timestamp: string
}

export interface ApiError {
	error: string
	status?: number
}

// API Client response type
export type ApiResult<T> =
	| {
			success: true
			data: T
	  }
	| {
			success: false
			error: string
	  }
