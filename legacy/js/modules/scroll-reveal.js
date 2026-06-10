/** Observer: IntersectionObserver reveals elements on scroll. */
export class ScrollReveal {
  /** @param {string} selector */
  constructor(selector = '.fade-in') {
    this.selector = selector;
    this.observer = null;
  }

  init() {
    const elements = document.querySelectorAll(this.selector);
    if (!elements.length) return;

    const reveal = /** @param {Element} el */ el => el.classList.add('visible');

    elements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight + 80) reveal(el);
    });

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    elements.forEach(el => {
      if (!el.classList.contains('visible')) this.observer.observe(el);
    });
  }
}
