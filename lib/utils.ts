import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencySymbol(country?: string): string {
  if (!country) return '$';
  const c = country.trim().toLowerCase();
  if (c.includes('sri lanka') || c === 'lk' || c === 'lkr') return 'LKR ';
  if (c.includes('india') || c === 'in' || c === 'inr') return '₹';
  if (c.includes('united kingdom') || c.includes('britain') || c === 'uk' || c === 'gb' || c === 'gbp') return '£';
  if (c.includes('europe') || c.includes('germany') || c.includes('france') || c.includes('italy') || c.includes('spain') || c === 'eu' || c === 'eur') return '€';
  if (c.includes('australia') || c === 'au' || c === 'aud') return 'A$';
  if (c.includes('canada') || c === 'ca' || c === 'cad') return 'C$';
  if (c.includes('emirates') || c.includes('uae') || c.includes('dubai') || c === 'ae' || c === 'aed') return 'AED ';
  if (c.includes('singapore') || c === 'sg' || c === 'sgd') return 'S$';
  if (c.includes('malaysia') || c === 'my' || c === 'myr') return 'RM ';
  if (c.includes('bangladesh') || c === 'bd' || c === 'bdt') return '৳';
  if (c.includes('nepal') || c === 'np' || c === 'npr') return 'NPR ';
  if (c.includes('pakistan') || c === 'pk' || c === 'pkr') return 'PKR ';
  return '$';
}

export function formatCurrencyPrice(
  price: string | number | null | undefined,
  country?: string
): string | null {
  if (price === null || price === undefined || price === '') return null;
  const strPrice = String(price).trim();
  if (!strPrice || strPrice.toLowerCase() === 'on quote' || strPrice.toLowerCase() === 'custom quote') return null;

  // If already formatted with a currency symbol or letters (e.g. "₹500", "LKR 500", "$150")
  if (/[^\d.,\s]/.test(strPrice)) {
    return strPrice;
  }

  // Otherwise format with dynamic country symbol
  const symbol = getCurrencySymbol(country);
  return `${symbol}${strPrice}`;
}

