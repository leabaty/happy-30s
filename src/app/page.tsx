'use client';

import { useQuery } from '@tanstack/react-query';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { IGift } from '@/models/Gift';
import { pickNextGift } from '@/utils/giftUtils';
import BigGift from '@/components/BigGift';
import GiftSummaryGrid from '@/components/GiftSummaryGrid';
import styles from './page.module.css';

async function fetchGifts(): Promise<IGift[]> {
  const response = await fetch('/api/gifts');
  if (!response.ok) {
    throw new Error('Failed to fetch gifts');
  }
  return response.json();
}

export default function Home() {
  const bigGiftRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedGift, setSelectedGift] = useState<IGift | null>(null);
  const [isOpeningGift, setIsOpeningGift] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    data: gifts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['gifts'],
    queryFn: fetchGifts,
  });

  // Sync selectedGift with updated query data when gifts change
  useEffect(() => {
    if (selectedGift && gifts.length > 0) {
      const updatedGift = gifts.find((g) => g._id.toString() === selectedGift._id.toString());
      if (updatedGift) {
        // Always update with the latest data to keep the state in sync
        setSelectedGift(updatedGift);
      }
    }
  }, [gifts, selectedGift]);

  // Don't change the current gift while a gift is being opened to prevent flashing
  const currentGift =
    isOpeningGift && selectedGift ? selectedGift : selectedGift || pickNextGift(gifts);

  const handleGiftClick = (gift: IGift) => {
    setSelectedGift(gift);
    if (bigGiftRef.current) {
      bigGiftRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleGiftOpened = (openedGift: IGift) => {
    // When a gift is opened, keep it selected so it stays visible
    // Use the returned gift from the API which should have the correct opened state
    setSelectedGift(openedGift);
    setIsOpeningGift(false);
  };

  const handleGiftOpenStart = () => {
    setIsOpeningGift(true);
  };

  if (!isMounted || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinningGift}>
            <Image
              src='https://i.ibb.co/Z6fxpK0W/pngtree-blue-gift-box-with-yellow-ribbon-packaging-png-image-16954464.webp'
              alt='Loading gifts'
              fill
              className={styles.spinningGiftImage}
              priority
              sizes='128px'
            />
          </div>
          <p className={styles.loadingText}>Chargement de tes cadeaux...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <p className={styles.errorText}>Échec du chargement des cadeaux</p>
          <button onClick={() => window.location.reload()} className={styles.errorButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          {currentGift ? (
            <>
              <h1 className={styles.title}>Joyeux 30 ans</h1>
              <h1 className={styles.subtitle}>{currentGift.love_surname}</h1>
            </>
          ) : (
            <h1 className={styles.title}>Joyeux 30 ans ❤ </h1>
          )}
        </header>

        {/* Current Gift */}
        {currentGift && (
          <section ref={bigGiftRef}>
            <BigGift
              gift={currentGift}
              onGiftOpened={handleGiftOpened}
              onGiftOpenStart={handleGiftOpenStart}
              isLoading={isOpeningGift}
            />
          </section>
        )}

        {/* All gifts completed */}
        {!currentGift && gifts.length > 0 && (
          <section className={styles.completedSection}>
            <h2 className={styles.completedTitle}>🎉 30 cadeaux ouverts 🎉</h2>
          </section>
        )}

        {/* Gift Summary Grid */}
        {gifts.length > 0 && (
          <section>
            <GiftSummaryGrid gifts={gifts} onGiftClick={handleGiftClick} />
          </section>
        )}

        {/* No gifts message */}
        {gifts.length === 0 && (
          <section className={styles.noGiftsSection}>
            <p className={styles.noGiftsText}>
              Petite erreur : La base de données ne contient aucun cadeau.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
