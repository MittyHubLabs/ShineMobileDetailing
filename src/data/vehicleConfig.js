export const VEHICLES = [
  {
    id: 'coupe',
    label: 'Coupe',
    bestFor: 'Smaller 2-door vehicles',
  },
  {
    id: 'sedan',
    label: 'Sedan',
    bestFor: 'Standard passenger cars',
  },
  {
    id: 'midsize-suv',
    label: 'Midsize SUV',
    bestFor: 'Mid-size SUVs and larger crossovers',
  },
  {
    id: 'large',
    label: 'Truck, Van & 3-Row SUV',
    bestFor: 'Larger vehicles requiring additional time',
  },
];

export const SERVICE_TYPES = [
 {
 id: 'exterior',
 label: 'Exterior Only',
 tagline: 'Perfect if your interior is already clean.',
 estimatedTime: '1–1.5 Hours',
 popular: false,
 includes: ['Hand wash', 'Wheels cleaned', 'Tire shine', 'Windows'],
},
 {
 id: 'interior',
 label: 'Interior Only',
 tagline: 'Perfect for daily drivers.',
 estimatedTime: '1–2 Hours',
 popular: false,
 includes: ['Vacuum', 'Dash cleaning', 'Door panels', 'Interior windows'],
},
 {
 id: 'full',
 label: 'Full Detail',
 tagline: 'Our most popular service.',
 estimatedTime: null,
 popular: true,
 includes: ['Complete interior', 'Complete exterior', 'Best overall value'],
},
];

export const HERO_TRUST_POINTS = [
 'Mobile Service',
 'Professional Equipment',
 'Premium Products',
 'Satisfaction Guaranteed',
];

export const SUMMARY_TRUST_POINTS = [
 'We Come To You',
 'Fully Equipped',
 'Satisfaction Guaranteed',
];

export const BOOKING_STEPS = [
 { id: 1, label: 'Choose Vehicle'},
 { id: 2, label: 'Choose Service'},
 { id: 3, label: 'Choose Package'},
 { id: 4, label: 'Add Upgrades'},
];
