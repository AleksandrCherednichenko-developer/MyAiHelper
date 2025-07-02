# Алиасы в проекте

Этот проект использует алиасы TypeScript для удобства импортов. Все алиасы настроены в `tsconfig.json`.

## Доступные алиасы

### `@/*` - Корневая папка src

```typescript
import { something } from '@/some-file'
```

### `@/components/*` - Компоненты React

```typescript
import ChatMessage from '@/components/ChatMessage'
import LoadingSpinner from '@/components/LoadingSpinner'
import ChatInput from '@/components/ChatInput'
```

### `@/types/*` - TypeScript типы

```typescript
import { Message } from '@/types/chat'
import { ChatRequest, ChatResponse } from '@/types/api'
```

### `@/api/*` - API routes

```typescript
// API routes находятся в этой папке
// Например: src/app/api/chat/route.ts
```

### `@/styles/*` - CSS файлы

```typescript
import '@/styles/main.css'
import '@/styles/globals.css'
```

### `@/lib/*` - Библиотеки и утилиты

```typescript
import { apiClient } from '@/lib/api'
import { constants } from '@/lib/constants'
```

### `@/utils/*` - Вспомогательные функции

```typescript
import { formatDate } from '@/utils/date'
import { validateInput } from '@/utils/validation'
```

### `@/hooks/*` - Кастомные React хуки

```typescript
import { useChat } from '@/hooks/use-chat'
```

### `@/services/*` - API сервисы

```typescript
import { ChatService } from '@/services/chat-service'
import { UserService } from '@/services/user-service'
```

## Преимущества использования алиасов

1. **Короткие импорты** - не нужно писать длинные относительные пути
2. **Легкость рефакторинга** - при перемещении файлов импорты не ломаются
3. **Читаемость кода** - сразу понятно, откуда импортируется модуль
4. **Автодополнение** - IDE лучше понимает структуру проекта

## Структура папок

```
src/
├── app/
│   ├── components/     # @/components/*
│   ├── types/         # @/types/*
│   ├── api/           # @/api/*
│   └── styles/        # @/styles/*
├── lib/
│   ├── api/           # API архитектура
│   │   ├── base-client.ts
│   │   ├── services/  # @/services/*
│   │   └── index.ts
│   ├── hooks/         # @/hooks/*
│   └── examples.ts
└── utils/             # @/utils/*
```
