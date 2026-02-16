export type ErrorType = 'conflict' | 'validation' | 'network' | null

interface ErrorConfig {
    container: string
    text: string
    icon: string
    title?: string
}

const ERROR_CONFIGS: Record<Exclude<ErrorType, null>, ErrorConfig> = {
    conflict: {
        container: 'bg-orange-50 border-orange-200',
        text: 'text-orange-600',
        icon: '⚠️',
        title: 'Already Registered',
    },
    validation: {
        container: 'bg-red-50 border-red-200',
        text: 'text-red-600',
        icon: '❌',
        title: 'Validation Error',
    },
    network: {
        container: 'bg-gray-50 border-gray-200',
        text: 'text-gray-600',
        icon: '🔌',
        title: 'Connection Error',
    },
}

export function getErrorConfig(type: ErrorType): ErrorConfig {
    return ERROR_CONFIGS[type || 'validation']
}

export function getErrorStyles(type: ErrorType): string {
    return getErrorConfig(type).container
}

export function getErrorIcon(type: ErrorType): string {
    return getErrorConfig(type).icon
}

export function getErrorTitle(type: ErrorType): string {
    return getErrorConfig(type).title || 'Error'
}