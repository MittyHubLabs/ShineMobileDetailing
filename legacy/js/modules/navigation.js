/** Header mobile nav — Command-style open/close. */
export class Navigation {
  /** @param {HTMLElement|null} hamburger @param {HTMLElement|null} nav */
  constructor(hamburger, nav) {
    this.hamburger = hamburger;
    this.nav = nav;
    this.spans = hamburger?.querySelectorAll('span') ?? [];
  }

  init() {
    if (!this.hamburger || !this.nav) return;

    this.hamburger.addEventListener('click', () => this.toggle());
    this.nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.close());
    });
  }

  toggle() {
    const isOpen = this.nav.classList.toggle('open');
    this._setIconState(isOpen);
  }

  close() {
    this.nav.classList.remove('open');
    this._setIconState(false);
  }

  /** @param {boolean} isOpen */
  _setIconState(isOpen) {
    const [top, bot] = this.spans;
    if (!top || !bot) return;
    top.style.transform = isOpen ? 'translateY(3.5px) rotate(45deg)' : '';
    bot.style.transform = isOpen ? 'translateY(-3.5px) rotate(-45deg)' : '';
  }
}
