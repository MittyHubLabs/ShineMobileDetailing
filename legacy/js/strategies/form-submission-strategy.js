/** @typedef {Object} FormData
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} service
 * @property {string} vehicle
 * @property {string} address
 * @property {string} date
 * @property {string} message
 */

/** @typedef {Object} SubmissionResult
 * @property {boolean} ok
 * @property {string} [error]
 */

/** Strategy interface for form backends (mock, Formspree, API). */
export class FormSubmissionStrategy {
  /** @param {FormData} _data @returns {Promise<SubmissionResult>} */
  async submit(_data) {
    throw new Error('FormSubmissionStrategy.submit() must be implemented');
  }
}

/** Local success UI without a backend — swap for FormspreeStrategy later. */
export class MockFormSubmissionStrategy extends FormSubmissionStrategy {
  /** @param {FormData} data @returns {Promise<SubmissionResult>} */
  async submit(data) {
    await new Promise(resolve => setTimeout(resolve, 350));
    console.info('[Shine Mobile] Reservation request:', data);
    return { ok: true };
  }
}
