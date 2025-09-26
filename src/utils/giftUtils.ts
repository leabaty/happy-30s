import { IGift } from '@/models/Gift';

export function pickNextGift(gifts: IGift[], currentTime?: Date): IGift | null {
  if (!gifts || gifts.length === 0) return null;

  // Sort by order to ensure correct sequence
  const sortedGifts = [...gifts].sort((a, b) => a.order - b.order);

  // Use provided time or current time
  const now = currentTime || new Date();

  for (const gift of sortedGifts) {
    if (!gift.opened) {
      // If unlock_at doesn't exist or it's in the past/present, this gift is available
      if (!gift.unlock_at || new Date(gift.unlock_at) <= now) {
        return gift;
      }
    }
  }

  return null;
}

export function isGiftUnlocked(gift: IGift, currentTime?: Date): boolean {
  if (!gift.unlock_at) return true;
  const now = currentTime || new Date();
  return new Date(gift.unlock_at) <= now;
}
