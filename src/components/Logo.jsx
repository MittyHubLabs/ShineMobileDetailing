import logo from '../../assets/smlogo.png';

const SIZES = {
 sm: 'h-20 sm:h-24',
 md: 'h-28 sm:h-32',
 lg: 'h-56 sm:h-64',
 xl: 'h-72 sm:h-96 lg:h-[28rem]',
  hero: 'h-[380px] sm:h-[420px] lg:h-[460px]',
};

export default function Logo({ size = 'md', className = '' }) {
  const sizeClass = size === 'none' ? '' : (SIZES[size] ?? SIZES.md);

  return (
    <img
      src={logo}
      alt="Shine Mobile Car Detailing"
      className={`border-0 bg-transparent object-contain shadow-none mix-blend-multiply ${sizeClass} ${className}`}
    />
  );
}
