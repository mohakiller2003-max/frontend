import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAED(amount: number): string {
  return `${amount} AED`;
}

export function generateEventId(eventName: string): string {
  return `${eventName}_${Date.now()}_${crypto.randomUUID()}`;
}

export function normalizeUAEPhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-\(\)\.]+/g, '');
  const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;

  if (/^05\d{8}$/.test(digits)) return '+971' + digits.slice(1);
  if (/^9715\d{8}$/.test(digits)) return '+' + digits;
  if (/^\+9715\d{8}$/.test(cleaned)) return cleaned;

  return null;
}

export function isValidUAEPhone(raw: string): boolean {
  return normalizeUAEPhone(raw) !== null;
}
