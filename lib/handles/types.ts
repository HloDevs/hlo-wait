export type HandleValidationStatus =
  | 'VALID'
  | 'INVALID_SYNTAX'
  | 'RESERVED'
  | 'RESTRICTED';

export type HandleRestrictedReason =
  | 'SYSTEM_ROUTE'
  | 'PROFANITY'
  | 'BRAND_PROTECTION';

export interface HandleValidationResult {
  isValid: boolean;
  status: HandleValidationStatus;
  handle: string;
  normalizedHandle: string;
  error?: string;
  isReserved: boolean;
  isRestricted: boolean;
  reason?: HandleRestrictedReason;
}
