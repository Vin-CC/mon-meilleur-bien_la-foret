export function extractCityFromAddress(address?: string | null): string | undefined {
    const normalized = (address ?? '').trim().replace(/\s+/g, ' ');
    if (!normalized) return undefined;

    const parts = normalized.split(',').map((part) => part.trim()).filter(Boolean);
    let candidate = parts.length ? parts[parts.length - 1] : normalized;

    if (/^france$/i.test(candidate) && parts.length > 1) {
        candidate = parts[parts.length - 2];
    }

    const postalMatch = candidate.match(/(?:^|\b)\d{5}\s+(.+)$/);
    let city = postalMatch ? postalMatch[1] : candidate;

    city = city.replace(/\bfrance\b/i, '').trim();
    return city || undefined;
}
