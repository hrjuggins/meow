import { FREE_GIFT_THRESHOLD_PENCE, POUCH_PRICE_PENCE } from './comms.constants';
import { Cat } from './comms.types';

export function formatCatNames(names: string[]): string {
  if (names.length === 0) {
    return '';
  }

  if (names.length === 1) {
    return names[0];
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }

  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export function calculateTotalPricePence(activeCats: Cat[]): number {
  return activeCats.reduce((total, cat) => total + POUCH_PRICE_PENCE[cat.pouchSize], 0);
}

export function penceToPounds(pence: number): number {
  return pence / 100;
}

export function isFreeGiftEligible(totalPricePence: number): boolean {
  return totalPricePence > FREE_GIFT_THRESHOLD_PENCE;
}
