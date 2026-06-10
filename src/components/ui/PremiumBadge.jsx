const VARIANTS = {
 gold: 'bg-brand/[0.06] text-shine-text/90',
 green: 'bg-brand/[0.06] text-shine-text',
 white: 'bg-transparent text-shine-text',
 subtle: 'text-shine-text text-[10px] font-semibold uppercase tracking-wider',
};

export default function PremiumBadge({ label, variant = 'gold', className = ''}) {
 if (variant === 'subtle') {
 return <span className={`${VARIANTS.subtle} ${className}`}>{label}</span>;
}

 return (
 <span
 className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${VARIANTS[variant]} ${className}`}
 >
 {label}
 </span>
 );
}
