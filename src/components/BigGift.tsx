'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import { IGift } from '@/models/Gift';
import { isGiftUnlocked } from '@/utils/giftUtils';
import Image from 'next/image';
import styles from './BigGift.module.css';

interface BigGiftProps {
  gift: IGift;
  onGiftOpened?: (openedGift: IGift) => void;
  onGiftOpenStart?: () => void;
  isLoading?: boolean;
}

export default function BigGift({ gift, onGiftOpened, onGiftOpenStart, isLoading }: BigGiftProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [showContent, setShowContent] = useState(gift.opened);
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();

  // Memoize computed values
  const unlocked = useMemo(() => isGiftUnlocked(gift), [gift]);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update showContent when gift changes (important for thumbnail clicks)
  useEffect(() => {
    setShowContent(gift.opened);
  }, [gift.opened, gift._id]);

  // Single effect for image preloading
  useEffect(() => {
    if (gift.image_link && !gift.opened) {
      const img = new window.Image();
      img.src = gift.image_link;
    }
  }, [gift.image_link, gift.opened]);

  // Memoized mutation callbacks
  const onMutateCallback = useCallback(
    async (giftId: string) => {
      await queryClient.cancelQueries({ queryKey: ['gifts'] });
      const previousGifts = queryClient.getQueryData<IGift[]>(['gifts']);

      queryClient.setQueryData(['gifts'], (old: IGift[] | undefined) => {
        if (!old) return old;
        return old.map((g) =>
          g._id.toString() === giftId ? { ...g, opened: true, opened_at: new Date() } : g
        );
      });

      return { previousGifts };
    },
    [queryClient]
  );

  const onErrorCallback = useCallback(
    (err: Error, giftId: string, context: { previousGifts?: IGift[] } | undefined) => {
      if (context?.previousGifts) {
        queryClient.setQueryData(['gifts'], context.previousGifts);
      }
      setIsRevealing(false);
      setShowContent(false);

      if (onGiftOpened) {
        onGiftOpened(gift);
      }
    },
    [queryClient, onGiftOpened, gift]
  );

  const onSuccessCallback = useCallback(
    (updatedGift: IGift) => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsRevealing(true);

      if (onGiftOpened) {
        onGiftOpened(updatedGift);
      }

      setTimeout(() => {
        setShowContent(true);
        setIsRevealing(false);
      }, 800);
    },
    [onGiftOpened]
  );

  const openGiftMutation = useMutation({
    mutationFn: async (giftId: string) => {
      const response = await fetch(`/api/gifts/${giftId}/open`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to open gift');
      }

      return response.json();
    },
    onMutate: onMutateCallback,
    onError: onErrorCallback,
    onSuccess: onSuccessCallback,
  });

  const disabled = useMemo(
    () => openGiftMutation.isPending || !unlocked || gift.opened,
    [openGiftMutation.isPending, unlocked, gift.opened]
  );

  const handleOpen = useCallback(() => {
    if (disabled) return;

    if (onGiftOpenStart) {
      onGiftOpenStart();
    }

    openGiftMutation.mutate(gift._id.toString());
  }, [disabled, onGiftOpenStart, openGiftMutation, gift._id]);

  // Early returns for different states
  if (!isMounted) {
    return (
      <div className={styles.placeholderContainer}>
        <div className={styles.placeholder}></div>
        <div className={styles.placeholderText}></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingContent}>
          <div className={styles.spinningGift}>
            <Image
              src='https://i.ibb.co/Z6fxpK0W/pngtree-blue-gift-box-with-yellow-ribbon-packaging-png-image-16954464.webp'
              alt='Loading gift'
              fill
              className={styles.spinningGiftImage}
              priority
              sizes='128px'
            />
          </div>
          <p className={styles.loadingText}>Ouverture du cadeau...</p>
        </div>
      </div>
    );
  }

  if (gift.opened || (showContent && !isLoading)) {
    return (
      <div className={styles.giftContentWrapper}>
        <div className={styles.giftImageContainer}>
          <Image
            src={gift.image_link}
            alt={gift.image_alt || gift.title}
            fill
            className={styles.giftImage}
            priority
            sizes='100vw'
          />
        </div>
        <div className={styles.giftTextContent}>
          <h2 className={styles.giftTitle}>{gift.title}</h2>
          {gift.message && <p className={styles.giftMessage}>{gift.message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.unopenedGift}>
      <div
        className={`${styles.giftButtonContainer} ${isRevealing ? styles.revealing : ''} ${
          disabled ? styles.disabled : ''
        }`}
        onClick={handleOpen}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <Image
          src='https://i.ibb.co/Z6fxpK0W/pngtree-blue-gift-box-with-yellow-ribbon-packaging-png-image-16954464.webp'
          alt='Gift box'
          fill
          className={styles.giftButton}
          priority
          sizes='256px'
        />
      </div>

      <div className={styles.giftInfo}>
        {!unlocked && gift.unlock_at && (
          <p className={styles.lockedMessage}>
            Unlocks on {new Date(gift.unlock_at).toLocaleDateString()}
          </p>
        )}
        <p className={styles.giftOrder}>Cadeau #{gift.order}</p>
        {!unlocked && <p className={styles.lockedMessage}>Cadeau verrouillé</p>}
      </div>
    </div>
  );
}
