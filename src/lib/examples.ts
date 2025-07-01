// Примеры использования алиасов в проекте

// Импорт компонентов
export const componentImports = `
import LoadingSpinner from '@/components/LoadingSpinner'
import ChatHeader from '@/components/ChatHeader'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import TypingIndicator from '@/components/TypingIndicator'
import WelcomeMessage from '@/components/WelcomeMessage'
`

// Импорт типов
export const typeImports = `
import { Message } from '@/types/chat'
`

// Импорт API
export const apiImports = `
import { NextRequest, NextResponse } from 'next/server'
// API routes находятся в @/api/*
`

// Импорт утилит (будущие)
export const utilityImports = `
import { formatDate } from '@/utils/date'
import { validateInput } from '@/utils/validation'
`

// Импорт стилей
export const styleImports = `
import '@/styles/main.css'
import '@/styles/globals.css'
`

// Импорт библиотек (будущие)
export const libraryImports = `
import { apiClient } from '@/lib/api'
import { constants } from '@/lib/constants'
`
