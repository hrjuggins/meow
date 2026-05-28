import { describe, expect, it } from '@jest/globals';
import { Cat } from './comms.types';
import {
  calculateTotalPricePence,
  formatCatNames,
  isFreeGiftEligible,
  penceToPounds,
} from './comms.utils';

describe('comms utils', () => {
  it('formats one cat name', () => {
    expect(formatCatNames(['A'])).toBe('A');
  });

  it('formats two cat names', () => {
    expect(formatCatNames(['A', 'B'])).toBe('A and B');
  });

  it('formats three cat names without oxford comma', () => {
    expect(formatCatNames(['A', 'B', 'C'])).toBe('A, B and C');
  });

  it('calculates total price in pence from active cats', () => {
    const activeCats: Cat[] = [
      { name: 'A', subscriptionActive: true, breed: 'Test', pouchSize: 'A' },
      { name: 'B', subscriptionActive: true, breed: 'Test', pouchSize: 'F' },
    ];

    expect(calculateTotalPricePence(activeCats)).toBe(12675);
  });

  it('converts pence into pounds', () => {
    expect(penceToPounds(13400)).toBe(134);
  });

  it('uses strict free gift threshold', () => {
    expect(isFreeGiftEligible(12000)).toBe(false);
    expect(isFreeGiftEligible(12001)).toBe(true);
  });
});
