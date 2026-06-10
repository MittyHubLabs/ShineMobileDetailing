export const PACKAGE_COMPARISON = [
  { service: 'Exterior Hand Wash', exteriorOnly: true, interiorOnly: false, standard: true, premium: true },
  { service: 'Wheels & Tires Cleaned', exteriorOnly: true, interiorOnly: false, standard: true, premium: true },
  { service: 'Tire Shine', exteriorOnly: true, interiorOnly: false, standard: true, premium: true },
  { service: 'Exterior Windows', exteriorOnly: true, interiorOnly: false, standard: true, premium: true },
  { service: 'Interior Vacuum', exteriorOnly: false, interiorOnly: true, standard: true, premium: true },
  { service: 'Complete Interior Wipe Down', exteriorOnly: false, interiorOnly: true, standard: true, premium: true },
  { service: 'Door Jamb Cleaning', exteriorOnly: false, interiorOnly: true, standard: true, premium: true },
  { service: 'Light Stain Treatment', exteriorOnly: false, interiorOnly: true, standard: true, premium: true },
  { service: 'Air Fresh Finish', exteriorOnly: false, interiorOnly: true, standard: true, premium: true },
  { service: 'Ceramic Wax', exteriorOnly: false, interiorOnly: false, standard: false, premium: true },
  { service: 'Deep Interior Detailing', exteriorOnly: false, interiorOnly: false, standard: false, premium: true },
  { service: 'Carpet Deep Cleaning', exteriorOnly: false, interiorOnly: false, standard: false, premium: true },
  { service: 'Leather Condition/Shampoo Seats', exteriorOnly: false, interiorOnly: false, standard: false, premium: true },
  { service: 'Odor Treatment', exteriorOnly: false, interiorOnly: false, standard: false, premium: true },
  { service: 'Extra Attention to Heavily Soiled Areas', exteriorOnly: false, interiorOnly: false, standard: false, premium: true },
];

export const PACKAGE_COLUMNS = [
  { id: 'exterior-only', label: 'Exterior Only', key: 'exteriorOnly', highlight: false },
  { id: 'interior-only', label: 'Interior Only', key: 'interiorOnly', highlight: false },
  { id: 'standard', label: 'Standard Shine', key: 'standard', highlight: true, badge: 'BEST VALUE' },
  { id: 'premium', label: 'Premium Shine', key: 'premium', highlight: false },
];
