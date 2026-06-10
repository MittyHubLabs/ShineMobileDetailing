export default function OptionTile({
  selected,
  onClick,
  children,
  className = '',
  variant = 'card',
}) {
  const cardBase =
    'w-full rounded-2xl bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-6 py-8 text-center shadow-[inset_0_0_0_1px_rgba(200, 216, 208,0.3)] transition-all duration-300 active:scale-[0.98]';
  const cardState = selected
    ? 'bg-brand/[0.06] text-shine-text ring-2 ring-brand shadow-[0_0_24px_rgba(26,107,58,0.15)]'
    : 'text-shine-text hover:bg-brand/[0.04]';

  const pillBase = 'rounded-full px-5 py-3 sm:px-7 sm:py-3.5';
  const pillState = selected
    ? 'bg-brand/[0.12] text-shine-text ring-2 ring-brand shadow-[0_0_20px_rgba(26,107,58,0.2)]'
    : 'text-shine-text hover:bg-black/5';

  const isCard = variant === 'card';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center ${
        isCard ? `${cardBase} ${cardState}` : `${pillBase} ${pillState}`
      } ${className}`}
    >
      {children}
    </button>
  );
}
