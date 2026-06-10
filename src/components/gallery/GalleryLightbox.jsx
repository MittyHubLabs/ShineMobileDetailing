import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/gallery';

const FADE_MS = 250;

function LightboxVideo({ src, visible }) {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.pause();
  }, [src]);

  return (
    <video
      ref={videoRef}
      key={src}
      src={src}
      controls
      playsInline
      className={`max-h-[85vh] max-w-[90vw] object-contain transition-opacity duration-[250ms] ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

export default function GalleryLightbox({ index, onClose, onChangeIndex }) {
  const item = GALLERY_ITEMS[index];
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const navigateTo = useCallback(
    (nextIndex) => {
      setContentVisible(false);
      window.setTimeout(() => {
        onChangeIndex(nextIndex);
        setContentVisible(true);
      }, FADE_MS);
    },
    [onChangeIndex],
  );

  const goPrev = useCallback(() => {
    navigateTo((index - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, [index, navigateTo]);

  const goNext = useCallback(() => {
    navigateTo((index + 1) % GALLERY_ITEMS.length);
  }, [index, navigateTo]);

  const dismiss = useCallback(() => {
    setMounted(false);
    window.setTimeout(onClose, FADE_MS);
  }, [onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') dismiss();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dismiss, goPrev, goNext]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-[250ms] ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery lightbox: ${item.filename}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/92"
        onClick={dismiss}
        aria-label="Close lightbox"
      />

      <button
        type="button"
        onClick={dismiss}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14"
        aria-label="Previous"
      >
        <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14"
        aria-label="Next"
      >
        <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
      </button>

      <div
        className="relative z-[1] flex items-center justify-center px-14 sm:px-20"
        onClick={(event) => event.stopPropagation()}
      >
        {item.type === 'image' ? (
          <img
            key={item.id}
            src={item.src}
            alt={item.filename}
            className={`max-h-[85vh] max-w-[90vw] object-contain transition-opacity duration-[250ms] ${
              contentVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <LightboxVideo key={item.id} src={item.src} visible={contentVisible} />
        )}
      </div>

      <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-sm font-medium text-white/50">
        {index + 1} / {GALLERY_ITEMS.length}
      </p>
    </div>,
    document.body,
  );
}
