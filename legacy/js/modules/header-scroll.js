/** Observer: scroll events update header presentation. */
export class HeaderScroll {
  /** @param {HTMLElement|null} header @param {number} threshold */
  constructor(header, threshold = 20) {
    this.header = header;
    this.threshold = threshold;
    this._onScroll = this._onScroll.bind(this);
  }

  init() {
    if (!this.header) return;
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._onScroll();
  }

  _onScroll() {
    this.header.classList.toggle('scrolled', window.scrollY > this.threshold);
  }
}
