"use client"

import {useEffect, useState, useRef} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {validateSuccessToken} from "@/features/giveaway/utils"

export function SuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isValid, setIsValid] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const hasValidated = useRef(false)

    useEffect(() => {
        if (hasValidated.current) {
            return
        }

        const validateAccess = () => {
            hasValidated.current = true

            const token = searchParams.get('token')
            const storedToken = sessionStorage.getItem('giveaway_success_token')


            if (!token || !storedToken || token !== storedToken) {
                router.replace('/giveaway')
                return
            }

            if (!validateSuccessToken(token)) {
                sessionStorage.removeItem('giveaway_success_token')
                sessionStorage.removeItem('giveaway_entry_id')
                router.replace('/giveaway')
                return
            }

            setIsValid(true)
            setIsChecking(false)

            sessionStorage.removeItem('giveaway_success_token')
            sessionStorage.removeItem('giveaway_entry_id')
        }

        validateAccess()
    }, [router, searchParams])

    if (isChecking) {
        return (
            <div className="min-h-screen bg-olive-25 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-olive-200 border-t-olive-600 rounded-full animate-spin"/>
            </div>
        )
    }

    if (!isValid) {
        return (
            <div className="min-h-screen bg-olive-25 flex items-center justify-center">
                <p className="text-gray-600">Redirecting...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-olive-25 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-2xl text-gray-900">
                        thrivelab
                    </h1>
                </div>

                <div
                    className="bg-gradient-to-b from-lime-50 via-cyan-100 to-cyan-100 rounded-3xl p-8 mb-8 text-center shadow-sm">
                    <h2 className="font-serif font-light text-4xl md:text-5xl text-gray-900 mb-4">
                        You're In!
                    </h2>
                    <p className="text-olive-900 font-medium text-sm leading-relaxed">
                        The winner will be announced on our<br/>
                        instagram page @mythrivelab
                    </p>
                </div>

                <div className="text-center space-y-6 px-4">
                    <p className="text-olive-900 font-medium text-sm leading-relaxed">
                        Thank you for sharing more about your health goals.
                        Whether you're the giveaway winner or not, this is
                        the first step toward exploring what's possible with
                        regenerative medicine.
                    </p>

                    <p className="text-gray-700 text-sm font-medium">
                        We'll be in touch with the results soon.
                    </p>
                </div>
            </div>
        </div>
    )
}