import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import coupeImg from '../assets/coupe.png';
import msuvImg from '../assets/msuv2.png';
import sedanImg from '../assets/sedan.webp';
import suvImg from '../assets/suv2.avif';
import truckImg from '../assets/truck1.jpg';
import vanImg from '../assets/van1.png';
import emailjs from 'emailjs-com';

emailjs.init('OGL8sfwjhlwtQvq-O');
import { saveBooking } from '../hooks/useBookings';
import { submitBookingToFormspree } from '../services/formSpreeService';
import { ADDONS } from '../data/addons';
import { PACKAGES } from '../data/packages';
import {
  calculateTotal,
  formatPrice,
  getPackageLabel,
  getServicePrice,
  getVehicleById,
} from '../data/pricing';
import { SERVICE_TYPES, VEHICLES } from '../data/vehicleConfig';
import { PHONE_DISPLAY } from '../constants/contact';
import { ICON_STROKE } from '../constants/icons';
import {
  BOOKING_CARD_BASE,
  BOOKING_CARD_SELECTED,
  VEHICLE_CARD_BASE,
  VEHICLE_CARD_SELECTED,
} from '../constants/cardStyles';
import { getTierStyle } from '../constants/tierStyles';
import BookingDateTimeFields, { buildPreferredDateTime } from '../components/booking/BookingDateTimeFields';
import BookingSummaryPanel from '../components/booking/BookingSummaryPanel';
import {
  BOOKING_STEPS,
  canSubmitDetails,
  getNextStepAfterService,
  getPreviousStepIndex,
  getResumeStepIndex,
} from '../components/booking/bookingSteps';

const emptyContact = {
  name: '',
  phone: '',
  email: '',
  address: '',
  preferredDate: null,
  preferredTime: '',
};

const cardBase = BOOKING_CARD_BASE;
const cardSelected = BOOKING_CARD_SELECTED;

const VEHICLE_IMAGES = {
  coupe: coupeImg,
  sedan: sedanImg,
  'midsize-suv': msuvImg,
};

const vehicleImageFrameStyle = {
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
};

const singleVehicleImageStyle = {
  height: 140,
  width: 'auto',
  objectFit: 'contain',
  mixBlendMode: 'multiply',
};

const coupeImageFrameStyle = {
  ...vehicleImageFrameStyle,
  height: 200,
};

const coupeImageStyle = {
  ...singleVehicleImageStyle,
  height: 200,
  width: '100%',
  maxWidth: '100%',
};

const largeVehicleImageRowStyle = {
  height: 160,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '100%',
  overflow: 'hidden',
};

const largeVehicleImageStyle = {
  height: 100,
  width: 'auto',
  objectFit: 'contain',
  mixBlendMode: 'multiply',
  maxWidth: '30%',
};

function StepBadge({ children }) {
  return (
    <span className="inline-block rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]">
      {children}
    </span>
  );
}

function TierBadge({ tierId, children }) {
  const tier = getTierStyle(tierId);
  const badgeClass =
    tierId === 'standard' ? tier.bestValueBadge ?? tier.badge : tier.badge;

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}
    >
      {children}
    </span>
  );
}

function IncludesList({ items }) {
  return (
    <ul className="mt-4 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-shine-text/80">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1a1a1a]/30" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PackageIncludesList({ items, tierId }) {
  const tier = getTierStyle(tierId);

  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
          <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${tier.accent}`} strokeWidth={ICON_STROKE} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state ?? {};

  const mainRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [vehicleId, setVehicleId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [addonIds, setAddonIds] = useState([]);
  const [contact, setContact] = useState(emptyContact);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const svc = prefill.serviceId ?? '';
    const next = {
      vehicleId: prefill.vehicleId ?? '',
      serviceId: svc,
      packageId: svc === 'full' ? (prefill.packageId ?? prefill.package?.id ?? '') : '',
      addonIds: prefill.addonIds ?? [],
    };
    setVehicleId(next.vehicleId);
    setServiceId(next.serviceId);
    setPackageId(next.packageId);
    setAddonIds(next.addonIds);
    setContact(emptyContact);
    setStepIndex(getResumeStepIndex(next));
    setSubmitted(false);
  }, [location.key]);

  const currentStep = BOOKING_STEPS[stepIndex];
  const vehicle = getVehicleById(vehicleId);
  const service = SERVICE_TYPES.find((s) => s.id === serviceId);
  const pkg = serviceId === 'full' ? PACKAGES.find((p) => p.id === packageId) : null;
  const chosenAddons = ADDONS.filter((a) => addonIds.includes(a.id));
  const totalPrice = calculateTotal(
    vehicleId,
    serviceId,
    packageId || 'standard',
    addonIds,
    ADDONS,
  );

  const goToStep = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(index, BOOKING_STEPS.length - 1));
    setStepIndex((current) => {
      if (current !== nextIndex) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return nextIndex;
    });
  }, []);

  const selectVehicle = (id) => {
    setVehicleId(id);
    setServiceId('');
    setPackageId('');
    setAddonIds([]);
    goToStep(1);
  };

  const selectService = (id) => {
    setServiceId(id);
    setPackageId(id === 'full' ? 'standard' : '');
    setAddonIds([]);
    goToStep(getNextStepAfterService(id));
  };

  useEffect(() => {
    if (stepIndex === 2 && serviceId !== 'full') {
      goToStep(3);
    }
  }, [stepIndex, serviceId, goToStep]);

  const selectPackage = (id) => {
    setPackageId(id);
    goToStep(3);
  };

  const toggleAddon = (id) => {
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const back = () => {
    if (stepIndex > 0) goToStep(getPreviousStepIndex(stepIndex, serviceId));
    else navigate('/');
  };

  const updateContact = (field) => (e) =>
    setContact((prev) => ({ ...prev, [field]: e.target.value }));

  const updatePhone = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setContact((prev) => ({ ...prev, phone: digits }));
  };

  const handleContinueAddons = () => goToStep(4);

  const handleSchedule = async () => {
    if (!canSubmitDetails(contact) || submitting) return;

    setSubmitting(true);
    setSubmitError('');

    const servicePrice = getServicePrice(vehicleId, serviceId, packageId || 'standard');
    const booking = {
      ...contact,
      preferredDateTime: buildPreferredDateTime(contact.preferredDate, contact.preferredTime),
      vehicleId,
      serviceId,
      packageId,
      addonIds,
      vehicleType: vehicle?.label ?? vehicleId,
      serviceType: service?.label ?? serviceId,
      packageTitle: pkg?.tier ?? getPackageLabel(serviceId, packageId),
      packageTier: pkg?.tier ?? getPackageLabel(serviceId, packageId),
      packagePrice: servicePrice != null ? formatPrice(servicePrice) : '',
      totalPrice: formatPrice(totalPrice),
      addons: chosenAddons.map((a) => ({ id: a.id, label: a.label, price: a.priceLabel })),
    };

    try {
      await submitBookingToFormspree(booking);
      saveBooking(booking);

      try {
        await emailjs.send('service_v5hbtml', 'template_69wp5de', {
          customer_name: booking.name,
          customer_email: booking.email,
          vehicle: booking.vehicleType,
          service: booking.serviceType,
          package: booking.packageTier,
          addons: booking.addons?.length
            ? booking.addons.map((a) => a.label).join(', ')
            : 'None',
          total: booking.totalPrice,
          date: booking.preferredDate
            ? booking.preferredDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '',
          time: booking.preferredTime,
          address: booking.address,
        });
      } catch (emailErr) {
        console.error('EmailJS confirmation failed:', emailErr);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Formspree submission failed:', err);
      setSubmitError(
        `Something went wrong, please call us at ${PHONE_DISPLAY}`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-6 text-center">
        <CheckCircle2 className="h-20 w-20 text-brand" />
        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-shine-text sm:text-5xl">
          You&apos;re booked.
        </h1>
        <p className="mt-4 max-w-md text-lg text-shine-text">
          We&apos;ll reach out shortly to confirm your appointment.
        </p>
        <p className="mt-8 font-display text-5xl font-bold text-shine-text">{formatPrice(totalPrice)}</p>
        <p className="mt-1 text-sm text-shine-text/70">Estimated total</p>
        <Link
          to="/"
          className="btn-primary mt-12 !px-10"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-shine-text lg:flex-row">
      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col lg:min-h-0">
        {/* Progress bar */}
        <header className="sticky top-0 z-30 border-b border-black/10 bg-white/75 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4 sm:px-6 lg:max-w-none lg:px-8">
            <button
              type="button"
              onClick={back}
              className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-shine-text transition hover:bg-black/5"
              aria-label={stepIndex === 0 ? 'Back to home' : 'Back'}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex gap-1">
                {BOOKING_STEPS.map((step, i) => (
                  <div
                    key={step.key}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= stepIndex ? 'bg-brand' : 'bg-brand/10'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 flex min-w-0 items-center gap-2 truncate text-[10px] font-semibold uppercase tracking-[0.15em] sm:text-xs">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 text-brand">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold leading-none text-white">
                    {stepIndex + 1}
                  </span>
                  <span>Step {stepIndex + 1} of {BOOKING_STEPS.length}</span>
                </span>
                <span className="truncate text-shine-text/50">· {currentStep.label}</span>
              </p>
            </div>
          </div>
        </header>

        {/* Step content */}
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
        >
          <div className="mx-auto max-w-3xl">
            <h1
              className={`font-display font-bold leading-tight text-shine-text ${
                currentStep.key === 'vehicle'
                  ? 'text-3xl sm:text-5xl lg:text-[3rem]'
                  : 'text-2xl sm:text-4xl lg:text-[2.75rem]'
              }`}
            >
              {currentStep.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-shine-text/80">
              {stepIndex === 0 && 'Tell us what you drive so we can tailor your detail.'}
              {stepIndex === 1 && 'Pick the level of care your vehicle needs today.'}
              {stepIndex === 2 && 'Choose the shine level that fits your routine.'}
              {stepIndex === 3 && 'Optional upgrades to take your detail further.'}
              {stepIndex === 4 && 'Where should we come, and when works best for you?'}
            </p>

            <div className="mt-10 sm:mt-12">
              {/* Step 1: Vehicle */}
              {currentStep.key === 'vehicle' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  {VEHICLES.map((v) => {
                    const selected = vehicleId === v.id;
                    const vehicleImage = VEHICLE_IMAGES[v.id];

                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => selectVehicle(v.id)}
                        className={`${VEHICLE_CARD_BASE} ${selected ? VEHICLE_CARD_SELECTED : ''} flex min-h-[220px] flex-col items-center justify-center text-center sm:min-h-[240px]`}
                      >
                        {v.id === 'large' ? (
                          <div className="mb-4 w-full" style={largeVehicleImageRowStyle}>
                            <img
                              src={suvImg}
                              alt="SUV"
                              style={largeVehicleImageStyle}
                            />
                            <img
                              src={truckImg}
                              alt="Truck"
                              style={largeVehicleImageStyle}
                            />
                            <img
                              src={vanImg}
                              alt="Van"
                              style={largeVehicleImageStyle}
                            />
                          </div>
                        ) : (
                          vehicleImage && (
                            <div
                              className="mb-4 w-full"
                              style={{ backgroundColor: 'white' }}
                            >
                              <div
                                style={
                                  v.id === 'coupe'
                                    ? coupeImageFrameStyle
                                    : vehicleImageFrameStyle
                                }
                              >
                                <img
                                  src={vehicleImage}
                                  alt={v.label}
                                  style={
                                    v.id === 'coupe'
                                      ? coupeImageStyle
                                      : singleVehicleImageStyle
                                  }
                                />
                              </div>
                            </div>
                          )
                        )}
                        <h3 className="font-display text-xl font-bold text-[#1a1a1a] sm:text-2xl">
                          {v.label}
                        </h3>
                        <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-[#1a1a1a]/75">
                          <span className="font-medium text-[#1a1a1a]">Best for:</span> {v.bestFor}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 2: Service */}
              {currentStep.key === 'service' && (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {SERVICE_TYPES.map((svc) => {
                    const selected = serviceId === svc.id;
                    const price = vehicleId
                      ? svc.id === 'full'
                        ? `From ${formatPrice(getServicePrice(vehicleId, 'full', 'basic'))}`
                        : formatPrice(getServicePrice(vehicleId, svc.id))
                      : null;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => selectService(svc.id)}
                        className={`${cardBase} relative flex flex-col ${selected ? cardSelected : ''}`}
                      >
                        {svc.popular && (
                          <div className="absolute right-4 top-4">
                            <StepBadge>Most Popular</StepBadge>
                          </div>
                        )}
                        <h3 className="pr-24 font-display text-xl font-bold text-shine-text">
                          {svc.label}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-shine-text/80">
                          {svc.tagline}
                        </p>
                        {price && (
                          <p className="mt-4 font-display text-2xl font-bold text-shine-text">{price}</p>
                        )}
                        <div className="mt-4 border-t border-[#c8d8d0]/20 pt-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-shine-text/60">
                            Includes
                          </p>
                          <IncludesList items={svc.includes} />
                        </div>
                        {svc.estimatedTime && (
                          <p className="mt-4 text-sm text-shine-text/70">
                            Time: {svc.estimatedTime}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 3: Package */}
              {currentStep.key === 'package' && (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {PACKAGES.map((p) => {
                    const selected = packageId === p.id;
                    const tier = getTierStyle(p.id);
                    const price = vehicleId
                      ? getServicePrice(vehicleId, 'full', p.id)
                      : getServicePrice('coupe', 'full', p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => selectPackage(p.id)}
                        className={`relative flex w-full flex-col rounded-2xl p-6 text-left transition-all duration-200 active:scale-[0.99] ${tier.bg} ${tier.borderTop} ${selected ? tier.selected : ''}`}
                      >
                        {p.badge && (
                          <div className="absolute right-4 top-4">
                            <TierBadge tierId={p.id}>{p.badge}</TierBadge>
                          </div>
                        )}
                        <h3 className="font-display text-xl font-bold text-white">{p.tier}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/80">{p.tagline}</p>
                        <div className={`my-5 h-px ${tier.divider}`} />
                        <p className={`font-display text-3xl font-bold tracking-tight ${tier.accent}`}>
                          {vehicleId ? formatPrice(price) : `From ${formatPrice(price)}`}
                        </p>
                        <div className={`mt-5 pt-5 ${tier.includesBorder}`}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                            Includes
                          </p>
                          <PackageIncludesList items={p.highlights} tierId={p.id} />
                        </div>
                        <p className="mt-5 text-sm text-white/70">Time: {p.estimatedTime}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 4: Add-ons */}
              {currentStep.key === 'addons' && (
                <div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    {ADDONS.map((addon) => {
                      const active = addonIds.includes(addon.id);
                      const Icon = addon.icon;
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`${cardBase} relative ${active ? cardSelected : ''}`}
                        >
                          {active && (
                            <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                            </div>
                          )}
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#1a1a1a]">
                            <Icon className="h-5 w-5" strokeWidth={ICON_STROKE} />
                          </div>
                          <h3 className="mt-4 font-display text-lg font-bold text-shine-text">
                            {addon.label}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-shine-text/75">
                            {addon.description}
                          </p>
                          <p className="mt-4 font-display text-xl font-bold text-shine-text">
                            {addon.priceLabel}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleContinueAddons}
                    className="btn-primary mt-10 flex w-full items-center justify-center gap-2 !py-4 text-base sm:max-w-sm"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
                  </button>
                </div>
              )}

              {/* Step 5: Customer details */}
              {currentStep.key === 'details' && (
                <div className="w-full space-y-7 sm:mx-auto sm:max-w-lg">
                  <BookingField label="Full Name">
                    <input
                      type="text"
                      required
                      value={contact.name}
                      onChange={updateContact('name')}
                      className="booking-field-input"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </BookingField>
                  <BookingField label="Phone Number">
                    <input
                      type="tel"
                      required
                      value={contact.phone}
                      onChange={updatePhone}
                      className="booking-field-input"
                      placeholder="1234567890"
                      maxLength={10}
                      autoComplete="tel"
                    />
                  </BookingField>
                  <BookingField label="Email">
                    <input
                      type="email"
                      required
                      value={contact.email}
                      onChange={updateContact('email')}
                      className="booking-field-input"
                      placeholder="you@email.com"
                      autoComplete="email"
                    />
                  </BookingField>
                  <BookingField label="Service Address">
                    <input
                      type="text"
                      required
                      value={contact.address}
                      onChange={updateContact('address')}
                      className="booking-field-input"
                      placeholder="Street, city, ZIP"
                      autoComplete="street-address"
                    />
                  </BookingField>
                  <BookingDateTimeFields
                    preferredDate={contact.preferredDate}
                    preferredTime={contact.preferredTime}
                    onDateChange={(date) =>
                      setContact((prev) => ({ ...prev, preferredDate: date }))
                    }
                    onTimeChange={updateContact('preferredTime')}
                  />
                  {submitError && (
                    <p className="rounded-lg bg-red-950/40 px-4 py-3 text-sm text-red-300" role="alert">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleSchedule}
                    disabled={!canSubmitDetails(contact) || submitting}
                    className="btn-primary mt-4 flex w-full items-center justify-center gap-2 !py-4 text-base disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {submitting ? 'Sending…' : 'Schedule My Detail'}
                    {!submitting && (
                      <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
                    )}
                  </button>
                  <p className="text-center text-xs text-shine-text/50">
                    No payment required to request an appointment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Desktop summary */}
      <aside className="hidden w-[min(400px,36vw)] shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto">
        <BookingSummaryPanel
          vehicleId={vehicleId}
          serviceId={serviceId}
          packageId={packageId}
          addonIds={addonIds}
        />
      </aside>

      {/* Mobile summary — full panel at bottom of page */}
      <div className="shrink-0 lg:hidden">
        <BookingSummaryPanel
          vehicleId={vehicleId}
          serviceId={serviceId}
          packageId={packageId}
          addonIds={addonIds}
        />
      </div>
    </div>
  );
}

function BookingField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-shine-text">{label}</span>
      {children}
    </label>
  );
}
