import { Check, Plus } from 'lucide-react';
import { ICON_STROKE } from '../../constants/icons';

export default function BookingAddonCard({ addon, active, onToggle }) {
  const Icon = addon.icon;

  return (
    <div
      className={`flex h-full min-h-[220px] flex-col rounded-2xl bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 shadow-[inset_0_0_0_1px_rgba(200, 216, 208,0.3)] transition-all duration-200 sm:p-6 ${
        active ? 'bg-brand/[0.06] ring-2 ring-brand' : ''
      }`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#1a1a1a]">
        <Icon className="h-5 w-5" strokeWidth={ICON_STROKE} />
      </div>
      <h3 className="font-display text-base font-bold leading-tight text-shine-text sm:text-lg">
        {addon.label}
      </h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-shine-text/70 sm:text-sm">
        {addon.description}
      </p>
      <p className="mt-4 font-display text-2xl font-bold tracking-tight text-shine-text">
        {addon.priceLabel}
      </p>
      <button
        type="button"
        onClick={onToggle}
        className="btn-primary mt-4 flex w-full items-center justify-center gap-2 !py-3"
      >
        {active ? (
          <>
            <Check className="h-4 w-4" strokeWidth={ICON_STROKE} />
            Added
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" strokeWidth={ICON_STROKE} />
            Add
          </>
        )}
      </button>
    </div>
  );
}
