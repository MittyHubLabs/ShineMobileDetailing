/**
 * SiteApp — Facade
 * Single entry point. Template Method: shared bootstrap, page-specific hooks optional.
 */
import { Navigation } from './modules/navigation.js';
import { HeaderScroll } from './modules/header-scroll.js';
import { ScrollReveal } from './modules/scroll-reveal.js';
import { ContactForm } from './modules/contact-form.js';
import { VehiclePricing } from './modules/vehicle-pricing.js';
import { MockFormSubmissionStrategy } from './strategies/form-submission-strategy.js';

class SiteApp {
  constructor() {
    this.navigation = new Navigation(
      document.getElementById('hamburger'),
      document.getElementById('nav-links')
    );
    this.headerScroll = new HeaderScroll(document.getElementById('header'));
    this.scrollReveal = new ScrollReveal('.fade-in');
    this.vehiclePricing = new VehiclePricing(document.getElementById('vehicle-pricing'));
    this.contactForm = new ContactForm(
      document.getElementById('contact-form'),
      new MockFormSubmissionStrategy(),
      document.getElementById('form-success')
    );
  }

  /** Template Method — common init sequence for every page. */
  init() {
    this.navigation.init();
    this.headerScroll.init();
    this.scrollReveal.init();
    this.onPageReady();
  }

  /** Hook for page-specific setup (override via subclass or future pages). */
  onPageReady() {
    this.vehiclePricing.init();
    this.contactForm.init();
  }
}

document.addEventListener('DOMContentLoaded', () => new SiteApp().init());
