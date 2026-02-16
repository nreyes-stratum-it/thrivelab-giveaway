"use client"

import React from 'react'
import {ErrorType, getErrorConfig} from "@/features/giveaway/utils";

interface ErrorAlertProps {
    message: string
    type: ErrorType
    onClose?: () => void
}

export function ErrorAlert({message, type, onClose}: ErrorAlertProps) {
    const config = getErrorConfig(type)

    return (
        <div className={`mb-6 p-4 border rounded-lg ${config.container}`}>
            <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{config.icon}</span>
                <div className="flex-1">
                    <p className={`text-xs font-semibold mb-1 uppercase tracking-wide ${config.text}`}>
                        {config.title}
                    </p>
                    <p className="text-sm font-medium text-gray-700 whitespace-pre-line">
                        {message}
                    </p>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close error"
                    >
                        <span className="text-lg">✕</span>
                    </button>
                )}
            </div>
        </div>
    )
}