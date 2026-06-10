import { useCallback, useState } from 'react';
import GalleryCarousel from './gallery/GalleryCarousel';
import GalleryLightbox from './gallery/GalleryLightbox';
import ScrollReveal from './ScrollReveal';

export default function BeforeAfterGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <section className="bg-white py-28 sm:py-36" id="gallery">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mb-12 text-center sm:mb-16">
          <p className="section-eyebrow">Our Work</p>
          <h2 className="section-heading mt-4">Our Work</h2>
        </ScrollReveal>
      </div>

      <ScrollReveal className="mt-4">
        <GalleryCarousel
          onOpenLightbox={openLightbox}
          paused={lightboxIndex !== null}
        />
      </ScrollReveal>

      {lightboxIndex !== null && (
        <GalleryLightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onChangeIndex={setLightboxIndex}
        />
      )}
    </section>
  );
}
