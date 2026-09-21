export function extractUserIdFromToken(token: string): string | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.UserId || null;
    } catch {
        return null;
    }
}
