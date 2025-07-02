# API Архитектура

Этот проект использует модульную архитектуру API для лучшей масштабируемости и организации кода.

## Структура

### 1. Базовый клиент (`@/lib/api/base-client.ts`)

Содержит общую логику для всех API запросов:

- Обработка HTTP запросов
- Обработка ошибок
- Типизированные ответы

### 2. Сервисы (`@/lib/api/services/`)

Отдельные сервисы для разных доменов:

#### ChatService (`chat-service.ts`)

```typescript
import { apiClient } from '@/lib/api'

// Отправка сообщения
const response = await apiClient.chat.sendMessage('Hello!')

// Получение истории чата
const history = await apiClient.chat.getChatHistory()

// Очистка истории
await apiClient.chat.clearChatHistory()
```

#### UserService (`user-service.ts`)

```typescript
// Получение профиля пользователя
const profile = await apiClient.user.getProfile()

// Обновление профиля
const updatedProfile = await apiClient.user.updateProfile({
	preferences: { theme: 'dark' },
})

// Получение списка пользователей
const users = await apiClient.user.getUsers()
```

### 3. Главный клиент (`@/lib/api/index.ts`)

Объединяет все сервисы в один клиент:

```typescript
export const apiClient = new ApiClient()
// apiClient.chat - для работы с чатом
// apiClient.user - для работы с пользователями
```

## Преимущества

1. **Модульность** - каждый сервис отвечает за свой домен
2. **Масштабируемость** - легко добавлять новые сервисы
3. **Переиспользование** - общая логика в базовом клиенте
4. **Типобезопасность** - строгая типизация для каждого сервиса
5. **Тестируемость** - каждый сервис можно тестировать отдельно

## Добавление нового сервиса

1. **Создайте сервис** в `src/lib/api/services/`:

```typescript
export class NewService extends BaseApiClient {
	async someMethod(): Promise<SomeType> {
		const result = await this.request<SomeType>('/api/some-endpoint', {
			method: 'GET',
		})

		if (!result.success) {
			throw new Error(result.error)
		}

		return result.data
	}
}
```

2. **Добавьте в индекс** `src/lib/api/services/index.ts`:

```typescript
export { NewService } from './new-service'
```

3. **Добавьте в главный клиент** `src/lib/api/index.ts`:

```typescript
export class ApiClient {
	public new: NewService

	constructor(baseUrl: string = '') {
		this.new = new NewService(baseUrl)
	}
}
```

## Использование в компонентах

```typescript
import { apiClient } from '@/lib/api'

// Использование через главный клиент
const response = await apiClient.chat.sendMessage('Hello!')

// Или прямое использование сервиса
import { ChatService } from '@/lib/api'
const chatService = new ChatService()
const response = await chatService.sendMessage('Hello!')
```
