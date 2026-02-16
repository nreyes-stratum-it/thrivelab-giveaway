import {Suspense} from 'react'
import {SuccessContent} from "@/features/giveaway/components/layout/SuccessContent";

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-olive-25 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-olive-200 border-t-olive-600 rounded-full animate-spin"/>
            </div>
        }>
            <SuccessContent/>
        </Suspense>
    )
}