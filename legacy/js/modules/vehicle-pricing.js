/** Vehicle type tabs update package prices on the home page. */
export class VehiclePricing {
  /** @param {HTMLElement|null} root */
  constructor(root) {
    this.root = root;
    this.prices = {
      coupe:  { refresh: 129, restoration: 319, preservation: 849 },
      sedan:  { refresh: 149, restoration: 349, preservation: 899 },
      suv:    { refresh: 179, restoration: 399, preservation: 999 },
      truck:  { refresh: 199, restoration: 429, preservation: 1049 },
    };
  }

  init() {
    if (!this.root) return;

    const tabs = this.root.querySelectorAll('[data-vehicle]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => this._select(tab.dataset.vehicle, tabs));
    });

    this._select('sedan', tabs);
  }

  /** @param {string} type @param {NodeListOf<Element>} tabs */
  _select(type, tabs) {
    const rates = this.prices[type];
    if (!rates) return;

    tabs.forEach(tab => {
      tab.classList.toggle('is-on', tab.dataset.vehicle === type);
      tab.setAttribute('aria-selected', tab.dataset.vehicle === type ? 'true' : 'false');
    });

    this.root.querySelectorAll('[data-price-key]').forEach(el => {
      const key = el.dataset.priceKey;
      if (key && rates[key] !== undefined) {
        el.textContent = `$${rates[key]}`;
      }
    });
  }
}
