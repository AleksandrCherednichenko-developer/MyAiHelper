import { ChatService } from './services'

export class ApiClient {
	public chat: ChatService

	constructor(baseUrl: string = '') {
		this.chat = new ChatService(baseUrl)
	}
}

// Экспортируем экземпляр клиента
export const apiClient = new ApiClient()

// Экспортируем сервисы для прямого использования
export { ChatService } from './services'
