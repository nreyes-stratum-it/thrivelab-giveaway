export function generateSuccessToken(entryId: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)

    const payload = `${entryId}|${timestamp}|${random}`


    return btoa(payload)
}

export function validateSuccessToken(token: string, maxAge: number = 5 * 60 * 1000): boolean {
    try {
        const payload = atob(token)
        const parts = payload.split('|')

        if (parts.length !== 3) {
            return false
        }

        const [entryId, timestampStr, random] = parts
        const timestamp = parseInt(timestampStr, 10)


        if (isNaN(timestamp)) {
            return false
        }

        const tokenAge = Date.now() - timestamp


        if (tokenAge < 0) {
            return false
        }

        if (tokenAge > maxAge) {
            return false
        }

        return true
    } catch (error) {
        return false
    }
}


export function getEntryIdFromToken(token: string): string | null {
    try {
        const payload = atob(token)
        const [entryId] = payload.split('|')
        return entryId
    } catch {
        return null
    }
}