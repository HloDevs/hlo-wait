/**
 * Reserved handles protected for VIPs, founders, core brand names, and company initiatives.
 * These handles cannot be claimed by regular users during onboarding.
 */
export const RESERVED_HANDLES_LIST: readonly string[] = [
  // User specified reserved handles
  'rook',
  'hlo',
  'donum',
  'ravi',
  'packiam',
  'krishna',
  'radha',
  'links',
  'dots',
  'recruit',
  'dossier',
  'gtm',
  'pulse',
  'signal',
  'ranker',

  // Core brand & company entities
  'hloapp',
  'hlomail',
  'hlohq',
  'hloteam',
  'hlobeta',
  'hloofficial',
  'team',
  'official',
  'founders',
  'founder',
  'ceo',
  'cto',
  'cpo',
  'cfo',
  'coo',
  'staff',
  'press',
  'media',
  'security',
  'trust',
  'status',
  'help',
  'support',
  'contact',
  'careers',
  'jobs',
  'legal',
  'terms',
  'privacy',
  'compliance',
  'engineering',
  'product',
  'design',
  'marketing',
  'sales',
  'investors',
  'community',
  'developer',
  'developers',
  'changelog',
] as const;

export const RESERVED_HANDLES_SET: ReadonlySet<string> = new Set<string>(
  RESERVED_HANDLES_LIST.map((h) => h.toLowerCase())
);
