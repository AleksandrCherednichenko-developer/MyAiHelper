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

## Преимущества использования алиасов

1. **Короткие импорты** - не нужно писать длинные относительные пути
2. **Легкость рефакторинга** - при перемещении файлов импорты не ломаются
3. **Читаемость кода** - сразу понятно, откуда импортируется модуль
4. **Автодополнение** - IDE лучше понимает структуру проекта

## Примеры использования

### До (относительные импорты)

```typescript
import ChatMessage from '../../../components/ChatMessage'
import { Message } from '../../types/chat'
```

### После (алиасы)

```typescript
import ChatMessage from '@/components/ChatMessage'
import { Message } from '@/types/chat'
```

## Структура папок

```
src/
├── app/
│   ├── components/     # @/components/*
│   ├── types/         # @/types/*
│   ├── api/           # @/api/*
│   └── styles/        # @/styles/*
├── lib/               # @/lib/*
└── utils/             # @/utils/*
```
