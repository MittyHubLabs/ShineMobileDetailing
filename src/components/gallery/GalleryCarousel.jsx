import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/gallery';

const IMAGE_ADVANCE_MS = 4000;
const VIDEO_MAX_MS = 30000;
const TRANSITION_MS = 400;

function CarouselMedia({ item, active, onOpen, onVideoEnded }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || item.type !== 'video') return;

    if (active) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, item]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || item.type !== 'video' || !active) return undefined;

    const handleEnded = () => onVideoEnded?.();
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [active, item, onVideoEnded]);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full w-full cursor-zoom-in items-center justify-center"
      aria-label={`View fullscreen: ${item.filename}`}
    >
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          playsInline
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <img
          src={item.src}
          alt={item.filename}
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
      )}
    </button>
  );
}

export default function GalleryCarousel({ onOpenLightbox, paused = false }) {
  const count = GALLERY_ITEMS.length;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const item = GALLERY_ITEMS[index] ?? GALLERY_ITEMS[0];
  const advanceTimerRef = useRef(null);
  const goNextRef = useRef(() => {});

  const goTo = useCallback((nextIndex) => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex(nextIndex);
      setVisible(true);
    }, TRANSITION_MS);
  }, []);

  const goNext = useCallback(() => {
    if (count === 0) return;
    goTo((index + 1) % count);
  }, [count, goTo, index]);

  const goPrev = useCallback(() => {
    if (count === 0) return;
    goTo((index - 1 + count) % count);
  }, [count, goTo, index]);

  goNextRef.current = goNext;

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const triggerAdvance = useCallback(() => {
    clearAdvanceTimer();
    goNextRef.current();
  }, [clearAdvanceTimer]);

  const handleVideoEnded = useCallback(() => {
    triggerAdvance();
  }, [triggerAdvance]);

  useEffect(() => {
    if (paused || count === 0 || !visible || !item) return undefined;

    if (item.type === 'image') {
      advanceTimerRef.current = window.setTimeout(triggerAdvance, IMAGE_ADVANCE_MS);
      return clearAdvanceTimer;
    }

    advanceTimerRef.current = window.setTimeout(triggerAdvance, VIDEO_MAX_MS);
    return clearAdvanceTimer;
  }, [clearAdvanceTimer, count, index, item, paused, triggerAdvance, visible]);

  const handlePrev = (event) => {
    event.stopPropagation();
    clearAdvanceTimer();
    goPrev();
  };

  const handleNext = (event) => {
    event.stopPropagation();
    clearAdvanceTimer();
    goNext();
  };

  const handleDot = (dotIndex) => {
    if (dotIndex !== index) {
      clearAdvanceTimer();
      goTo(dotIndex);
    }
  };

  if (count === 0) {
    return (
      <div className="w-full bg-[#1a1a1a] py-16 text-center text-sm text-white/50">
        No gallery media found in src/gallery/
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#1a1a1a]">
      <div className="relative mx-auto flex h-[min(60vh,640px)] w-full max-w-[1400px] items-center justify-center px-12 sm:h-[min(70vh,640px)] sm:px-20">
        <div
          className={`h-full w-full transition-all duration-[400ms] ease-in-out ${
            visible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
          }`}
        >
          <CarouselMedia
            item={item}
            active={visible && !paused}
            onOpen={() => onOpenLightbox(index)}
            onVideoEnded={item.type === 'video' ? handleVideoEnded : undefined}
          />
        </div>

        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pb-6 pt-2">
        {GALLERY_ITEMS.map((galleryItem, dotIndex) => (
          <button
            key={galleryItem.id}
            type="button"
            onClick={() => handleDot(dotIndex)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label={`Go to slide ${dotIndex + 1}`}
            aria-current={dotIndex === index ? 'true' : undefined}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? 'h-2 w-6 bg-brand'
                  : 'h-2 w-2 bg-white/35 hover:bg-white/55'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
