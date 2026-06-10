import { Check } from 'lucide-react';
import { ADDONS } from '../../data/addons';
import { PACKAGES } from '../../data/packages';
import {
  calculateTotal,
  formatPrice,
  getEstimatedTime,
  getPackageLabel,
  getVehicleById,
} from '../../data/pricing';
import { SERVICE_TYPES, SUMMARY_TRUST_POINTS } from '../../data/vehicleConfig';
import { ICON_STROKE } from '../../constants/icons';

export default function BookingSummaryPanel({
  vehicleId,
  serviceId,
  packageId,
  addonIds,
  compact = false,
}) {
  const vehicle = getVehicleById(vehicleId);
  const service = SERVICE_TYPES.find((s) => s.id === serviceId);
  const selectedPackage = serviceId === 'full' ? PACKAGES.find((p) => p.id === packageId) : null;
  const selectedAddons = ADDONS.filter((a) => addonIds.includes(a.id));

  const total =
    vehicleId && serviceId
      ? calculateTotal(vehicleId, serviceId, packageId || 'standard', addonIds, ADDONS)
      : null;

  const estimatedTime = serviceId
    ? serviceId === 'full'
      ? selectedPackage?.estimatedTime ?? getEstimatedTime(serviceId, packageId)
      : service?.estimatedTime
    : null;

  const packageDisplay =
    serviceId === 'full'
      ? selectedPackage?.tier ?? '—'
      : serviceId
        ? getPackageLabel(serviceId, packageId)
        : '—';

  const rows = [
    { label: 'Vehicle', value: vehicle?.label },
    { label: 'Service', value: service?.label },
    { label: 'Package', value: packageDisplay },
    {
      label: 'Add-ons',
      value:
        selectedAddons.length > 0
          ? selectedAddons.map((a) => a.label).join(', ')
          : 'None selected',
      muted: selectedAddons.length === 0,
    },
    { label: 'Estimated Time', value: estimatedTime },
  ];

  return (
    <div
      className={`flex flex-col text-[#1a1a1a] ${
        compact
          ? 'border-t border-[#d0d0d0] bg-white px-5 py-4'
          : 'mx-4 mb-4 mt-0 rounded-2xl border border-[#d0d0d0] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] lg:m-6 lg:h-[calc(100%-2rem)] lg:p-8'
      }`}
    >
      <h2 className="font-display text-xl font-bold text-[#1a1a1a] lg:text-2xl">Your Detail</h2>

      <dl className={`mt-5 space-y-3.5 ${compact ? 'hidden sm:block' : ''}`}>
        {rows.map(({ label, value, muted }) => (
          <div key={label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="shrink-0 text-[#1a1a1a]/60">{label}</dt>
            <dd
              className={`text-right font-medium ${muted ? 'text-[#1a1a1a]/50' : 'text-[#1a1a1a]'}`}
            >
              {value ?? '—'}
            </dd>
          </div>
        ))}
      </dl>

      {compact && (
        <p className="mt-1 truncate text-xs text-[#1a1a1a]/80 sm:hidden">
          {[vehicle?.label, service?.label, packageDisplay !== '—' ? packageDisplay : null]
            .filter(Boolean)
            .join(' · ') || 'Make your selections'}
        </p>
      )}

      <div className={`${compact ? 'mt-3 flex items-end justify-between gap-4 sm:mt-6' : 'mt-8'}`}>
        <div className={compact ? 'sm:hidden' : ''}>
          <p
            className={`font-display font-bold tracking-tight text-[#1a1a1a] ${
              compact ? 'text-3xl' : 'text-5xl lg:text-6xl'
            }`}
          >
            {total != null ? formatPrice(total) : '—'}
          </p>
          <p className="mt-1.5 text-base font-semibold text-[#1a1a1a]/80">Estimated Total</p>
        </div>
        {compact && (
          <div className="hidden text-right sm:block">
            <p className="font-display text-4xl font-bold tracking-tight text-[#1a1a1a]">
              {total != null ? formatPrice(total) : '—'}
            </p>
            <p className="mt-1.5 text-base font-semibold text-[#1a1a1a]/80">Estimated Total</p>
          </div>
        )}
      </div>

      {!compact && (
        <>
          <p className="mt-4 text-sm leading-relaxed text-[#1a1a1a]/70">
            No hidden fees. Final price confirmed before work begins.
          </p>

          <ul className="mt-6 space-y-2.5">
            {SUMMARY_TRUST_POINTS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#1a1a1a]">
                <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={ICON_STROKE} />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-[#1a1a1a]/50">
            No payment required to request an appointment.
          </p>
        </>
      )}
    </div>
  );
}
