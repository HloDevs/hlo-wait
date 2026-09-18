/**
 * Handle Normalizer
 * Performs standard trimming and lowercasing for consistent handle lookup
 * without aggressive heuristic substitutions that could block legitimate names.
 */

/**
 * Strips whitespace and normalizes handle to lowercase.
 */
export function sanitizeHandle(raw: string): string {
  if (typeof raw !== 'string') return '';
  return raw.trim().toLowerCase();
}
