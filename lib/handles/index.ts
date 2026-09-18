export * from './types';
export * from './normalizer';
export * from './data/reserved';
export * from './data/system-routes';
export {
  validateHandle,
  isValidHandleSyntax,
  isHandleReserved,
  isHandleRestricted,
  getRestrictedWordsCount,
} from './validator';
