import {
  HandleRestrictedReason,
  HandleValidationResult,
} from './types';
import { RESERVED_HANDLES_SET } from './data/reserved';
import { SYSTEM_ROUTES_SET } from './data/system-routes';
import restrictedWordsList from './data/restricted-words.json';
import { sanitizeHandle } from './normalizer';

// Fast O(1) lookup set for restricted dictionary (bad words + explicit misspellings, >2,000 words)
const RESTRICTED_WORDS_SET: ReadonlySet<string> = new Set<string>(
  restrictedWordsList.map((w: string) => w.toLowerCase())
);

/**
 * Validates the basic syntactic requirements of an Hlo handle:
 * - 3 to 30 characters
 * - lowercase alphanumeric only ([a-z0-9])
 */
export function isValidHandleSyntax(handle: string): boolean {
  if (typeof handle !== 'string') return false;
  return /^[a-z0-9]{3,30}$/.test(handle);
}

/**
 * Checks if a handle is reserved by Hlo for VIPs, founders, brands, or core ecosystem names.
 */
export function isHandleReserved(rawHandle: string): boolean {
  const clean = sanitizeHandle(rawHandle);
  if (!clean) return false;
  return RESERVED_HANDLES_SET.has(clean);
}

/**
 * Checks if a handle matches system routes or the curated restricted words list (including explicit misspellings).
 * Uses exact matching only to prevent false-positive restrictions on legitimate user names.
 */
export function isHandleRestricted(rawHandle: string): {
  restricted: boolean;
  reason?: HandleRestrictedReason;
} {
  const clean = sanitizeHandle(rawHandle);
  if (!clean) return { restricted: false };

  // 1. System routing collision
  if (SYSTEM_ROUTES_SET.has(clean)) {
    return { restricted: true, reason: 'SYSTEM_ROUTE' };
  }

  // 2. Exact match in restricted words & explicit misspellings dictionary
  if (RESTRICTED_WORDS_SET.has(clean)) {
    return { restricted: true, reason: 'PROFANITY' };
  }

  return { restricted: false };
}

/**
 * Enterprise validation orchestrator for Hlo handles.
 * Executes pipeline: Syntax Verification -> Reservation Governance -> Prohibited/System Filtering.
 */
export function validateHandle(rawHandle: string): HandleValidationResult {
  const trimmed = typeof rawHandle === 'string' ? rawHandle.trim().toLowerCase() : '';
  const clean = sanitizeHandle(trimmed);

  // 1. Syntax Format Check
  if (!isValidHandleSyntax(trimmed)) {
    let errorMsg = 'Handles must be between 3 and 30 characters using lowercase letters and numbers.';
    if (trimmed.length < 3) {
      errorMsg = 'Handles need at least 3 lowercase letters or numbers.';
    } else if (trimmed.length > 30) {
      errorMsg = 'Handles cannot exceed 30 characters.';
    } else if (/[^a-z0-9]/.test(trimmed)) {
      errorMsg = 'Only lowercase letters and numbers are allowed (no spaces or symbols).';
    }

    return {
      isValid: false,
      status: 'INVALID_SYNTAX',
      handle: trimmed,
      normalizedHandle: clean,
      error: errorMsg,
      isReserved: false,
      isRestricted: false,
    };
  }

  // 2. Brand & VIP Reservation Check
  if (isHandleReserved(clean)) {
    return {
      isValid: false,
      status: 'RESERVED',
      handle: trimmed,
      normalizedHandle: clean,
      error: 'This handle is reserved by Hlo.',
      isReserved: true,
      isRestricted: false,
      reason: 'BRAND_PROTECTION',
    };
  }

  // 3. Restricted & Bad Words Check (exact list only, preserving real names)
  const restrictedCheck = isHandleRestricted(clean);
  if (restrictedCheck.restricted) {
    return {
      isValid: false,
      status: 'RESTRICTED',
      handle: trimmed,
      normalizedHandle: clean,
      error: 'This handle is not available. Please choose another.',
      isReserved: false,
      isRestricted: true,
      reason: restrictedCheck.reason,
    };
  }

  // Handle is completely valid and available for reservation
  return {
    isValid: true,
    status: 'VALID',
    handle: trimmed,
    normalizedHandle: clean,
    isReserved: false,
    isRestricted: false,
  };
}

/**
 * Returns total count of restricted words loaded into memory.
 */
export function getRestrictedWordsCount(): number {
  return RESTRICTED_WORDS_SET.size;
}
