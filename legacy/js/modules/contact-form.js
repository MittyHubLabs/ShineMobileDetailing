import { FormSubmissionStrategy } from '../strategies/form-submission-strategy.js';

/** Contact form wired to a pluggable submission Strategy. */
export class ContactForm {
  /**
   * @param {HTMLFormElement|null} form
   * @param {FormSubmissionStrategy} strategy
   * @param {HTMLElement|null} successEl
   */
  constructor(form, strategy, successEl) {
    this.form = form;
    this.strategy = strategy;
    this.successEl = successEl;
    this._onSubmit = this._onSubmit.bind(this);
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', this._onSubmit);
  }

  /** @param {SubmitEvent} e */
  async _onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this.form));
    const submitBtn = this.form.querySelector('[type="submit"]');

    if (submitBtn instanceof HTMLButtonElement) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';
    }

    try {
      const result = await this.strategy.submit(data);
      if (result.ok) this._showSuccess();
    } catch {
      if (this.successEl) {
        this.successEl.textContent = 'Something went wrong. Please call us directly.';
        this.successEl.classList.add('show');
      }
    } finally {
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Request';
      }
    }
  }

  _showSuccess() {
    if (!this.successEl) return;
    this.successEl.classList.add('show');
    this.form.reset();
    this.successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
