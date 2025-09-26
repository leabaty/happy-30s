import { describe, it, expect, beforeEach, vi } from 'vitest';
import { pickNextGift, isGiftUnlocked } from '@/utils/giftUtils';
import { IGift } from '@/models/Gift';
import mongoose from 'mongoose';

// Mock current date for consistent testing
const mockDate = new Date('2025-09-18T10:00:00Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(mockDate);
});

const createMockGift = (overrides: Partial<IGift> = {}): IGift =>
  ({
    _id: new mongoose.Types.ObjectId(),
    title: 'Test Gift',
    image_link: 'https://example.com/image.jpg',
    love_surname: 'Chérie',
    opened: false,
    order: 1,
    slug: 'test-gift',
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  } as IGift);

describe('pickNextGift', () => {
  it('returns null for empty array', () => {
    expect(pickNextGift([])).toBeNull();
  });

  it('returns null for null/undefined input', () => {
    expect(pickNextGift(null as unknown as IGift[])).toBeNull();
    expect(pickNextGift(undefined as unknown as IGift[])).toBeNull();
  });

  it('returns first unopened gift when no unlock_at is set', () => {
    const gifts: IGift[] = [
      createMockGift({ order: 1, opened: false }),
      createMockGift({ order: 2, opened: false }),
      createMockGift({ order: 3, opened: false }),
    ];

    const result = pickNextGift(gifts);
    expect(result).toBeTruthy();
    expect(result?.order).toBe(1);
  });

  it('skips opened gifts and returns next unopened', () => {
    const gifts: IGift[] = [
      createMockGift({ order: 1, opened: true }),
      createMockGift({ order: 2, opened: true }),
      createMockGift({ order: 3, opened: false }),
    ];

    const result = pickNextGift(gifts);
    expect(result).toBeTruthy();
    expect(result?.order).toBe(3);
  });

  it('respects unlock_at dates - returns unlocked gift', () => {
    const pastDate = new Date('2025-09-17T10:00:00Z');
    const gifts: IGift[] = [
      createMockGift({ order: 1, opened: false, unlock_at: pastDate }),
      createMockGift({ order: 2, opened: false }),
    ];

    const result = pickNextGift(gifts);
    expect(result).toBeTruthy();
    expect(result?.order).toBe(1);
  });

  it('skips locked gifts (unlock_at in future)', () => {
    const futureDate = new Date('2025-09-19T10:00:00Z');
    const pastDate = new Date('2025-09-17T10:00:00Z');
    const gifts: IGift[] = [
      createMockGift({ order: 1, opened: false, unlock_at: futureDate }),
      createMockGift({ order: 2, opened: false, unlock_at: pastDate }),
    ];

    const result = pickNextGift(gifts);
    expect(result).toBeTruthy();
    expect(result?.order).toBe(2);
  });

  it('returns null when all gifts are opened', () => {
    const gifts: IGift[] = [
      createMockGift({ order: 1, opened: true }),
      createMockGift({ order: 2, opened: true }),
      createMockGift({ order: 3, opened: true }),
    ];

    const result = pickNextGift(gifts);
    expect(result).toBeNull();
  });

  it('returns null when all unopened gifts are locked', () => {
    const futureDate = new Date('2025-09-19T10:00:00Z');
    const gifts: IGift[] = [
      createMockGift({ order: 1, opened: true }),
      createMockGift({ order: 2, opened: false, unlock_at: futureDate }),
      createMockGift({ order: 3, opened: false, unlock_at: futureDate }),
    ];

    const result = pickNextGift(gifts);
    expect(result).toBeNull();
  });

  it('sorts gifts by order before processing', () => {
    const gifts: IGift[] = [
      createMockGift({ order: 3, opened: false }),
      createMockGift({ order: 1, opened: false }),
      createMockGift({ order: 2, opened: false }),
    ];

    const result = pickNextGift(gifts);
    expect(result).toBeTruthy();
    expect(result?.order).toBe(1);
  });

  it('handles current time exactly at unlock_at', () => {
    const exactTime = new Date('2025-09-18T10:00:00Z');
    const gifts: IGift[] = [createMockGift({ order: 1, opened: false, unlock_at: exactTime })];

    const result = pickNextGift(gifts);
    expect(result).toBeTruthy();
    expect(result?.order).toBe(1);
  });
});

describe('isGiftUnlocked', () => {
  it('returns true when unlock_at is not set', () => {
    const gift = createMockGift({ unlock_at: undefined });
    expect(isGiftUnlocked(gift)).toBe(true);
  });

  it('returns true when unlock_at is in the past', () => {
    const pastDate = new Date('2025-09-17T10:00:00Z');
    const gift = createMockGift({ unlock_at: pastDate });
    expect(isGiftUnlocked(gift)).toBe(true);
  });

  it('returns true when unlock_at is exactly now', () => {
    const gift = createMockGift({ unlock_at: mockDate });
    expect(isGiftUnlocked(gift)).toBe(true);
  });

  it('returns false when unlock_at is in the future', () => {
    const futureDate = new Date('2025-09-19T10:00:00Z');
    const gift = createMockGift({ unlock_at: futureDate });
    expect(isGiftUnlocked(gift)).toBe(false);
  });
});
