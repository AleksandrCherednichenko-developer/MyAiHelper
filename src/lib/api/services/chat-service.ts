import { BaseApiClient } from '@/lib/api/base-client'
import { ChatRequest, ChatResponse } from '@/types/api'

export class ChatService extends BaseApiClient {
	async sendMessage(message: string): Promise<ChatResponse> {
		const requestData: ChatRequest = { message }

		const result = await this.request<ChatResponse>('/api/chat', {
			method: 'POST',
			body: JSON.stringify(requestData),
		})

		if (!result.success) {
			throw new Error(result.error)
		}

		return result.data
	}

	async getChatHistory(): Promise<ChatResponse[]> {
		const result = await this.request<ChatResponse[]>('/api/chat/history', {
			method: 'GET',
		})

		if (!result.success) {
			throw new Error(result.error)
		}

		return result.data
	}

	async clearChatHistory(): Promise<void> {
		const result = await this.request<void>('/api/chat/clear', {
			method: 'DELETE',
		})

		if (!result.success) {
			throw new Error(result.error)
		}
	}
}
