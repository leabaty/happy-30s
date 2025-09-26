'use client';

import { IGift } from '@/models/Gift';
import Image from 'next/image';
import { isGiftUnlocked } from '@/utils/giftUtils';
import styles from './GiftSummaryGrid.module.css';

interface GiftSummaryGridProps {
  gifts: IGift[];
  onGiftClick: (gift: IGift) => void;
}

export default function GiftSummaryGrid({ gifts, onGiftClick }: GiftSummaryGridProps) {
  const sortedGifts = [...gifts].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tes Cadeaux</h3>
      <div className={styles.grid}>
        {sortedGifts.map((gift) => (
          <GiftThumbnail key={gift._id.toString()} gift={gift} onClick={() => onGiftClick(gift)} />
        ))}
      </div>
    </div>
  );
}

interface GiftThumbnailProps {
  gift: IGift;
  onClick: () => void;
}

function GiftThumbnail({ gift, onClick }: GiftThumbnailProps) {
  const imageUrl = gift.thumb_url || gift.image_link;
  const unlocked = isGiftUnlocked(gift);

  if (gift.opened) {
    return (
      <button
        onClick={onClick}
        className={styles.thumbnail}
        aria-label={`View opened gift: ${gift.title}`}
      >
        <Image
          src={imageUrl}
          alt={gift.image_alt || gift.title}
          fill
          className={styles.thumbnailImage}
          sizes='(max-width: 640px) 25vw, 20vw'
        />
        {/* Order badge */}
        <div className={styles.orderBadge}>#{gift.order}</div>
      </button>
    );
  }

  if (!unlocked) {
    return (
      <div
        className={`${styles.thumbnail} ${styles.lockedThumbnail}`}
        aria-label={`Locked gift ${gift.order}`}
      >
        <div className={styles.giftBoxContainer}>
          <Image
            src='https://i.ibb.co/Z6fxpK0W/pngtree-blue-gift-box-with-yellow-ribbon-packaging-png-image-16954464.webp'
            alt='Locked gift box'
            fill
            className={styles.giftBoxImage}
            sizes='80px'
          />
        </div>
        <div className={styles.orderBadge}>#{gift.order}</div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.thumbnail} ${styles.unopenedThumbnail}`}
      aria-label={`Open gift ${gift.order}: ${gift.title}`}
    >
      {/* Closed gift box image */}
      <div className={styles.giftBoxContainer}>
        <Image
          src='https://i.ibb.co/Z6fxpK0W/pngtree-blue-gift-box-with-yellow-ribbon-packaging-png-image-16954464.webp'
          alt='Unopened gift box'
          fill
          className={styles.giftBoxImage}
          sizes='80px'
        />
      </div>
      <div className={styles.orderBadge}>#{gift.order}</div>
    </button>
  );
}
