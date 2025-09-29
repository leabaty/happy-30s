import { IGift } from '@/models/Gift';

export function isGiftUnlocked(gift: IGift, currentTime?: Date): boolean {
  if (!gift.unlock_at) return true;
  const now = currentTime || new Date();
  return new Date(gift.unlock_at) <= now;
}
