export const VEHICLE_PRICING = [
 {
 id: 'coupe',
 label: 'Coupe',
 description: 'Small 2-door vehicles.',
 prices: {
 exterior: 30,
 interior: 40,
 full: { basic: 60, standard: 90, premium: 155},
},
},
 {
 id: 'sedan',
 label: 'Sedan',
 description: 'Standard 4-door vehicles.',
 prices: {
 exterior: 40,
 interior: 50,
 full: { basic: 70, standard: 100, premium: 185},
},
},
 {
 id: 'midsize-suv',
 label: 'Midsize SUV',
 description: 'Mid-size SUVs and larger crossovers.',
 prices: {
 exterior: 50,
 interior: 60,
 full: { basic: 80, standard: 110, premium: 215},
},
},
 {
 id: 'large',
 label: 'Truck, Van & 3-Row SUV',
 description: 'Full-size trucks, vans, and large 3-row SUVs.',
 prices: {
 exterior: 60,
 interior: 70,
 full: { basic: 90, standard: 120, premium: 245},
},
},
];

export const PRICING_DISCLAIMER =
 'Prices are based on average vehicle condition. Excessive dirt, stains, pet hair, or biohazards may require additional charges. Any additional cost will always be discussed and approved before work begins.';

export function formatPrice(amount) {
 return `$${amount}`;
}

export function getVehicleById(id) {
 return VEHICLE_PRICING.find((v) => v.id === id);
}

export function getServicePrice(vehicleId, serviceId, packageId = 'standard') {
 const vehicle = getVehicleById(vehicleId);
 if (!vehicle) return null;
 if (serviceId === 'exterior') return vehicle.prices.exterior;
 if (serviceId === 'interior') return vehicle.prices.interior;
 if (serviceId === 'full') return vehicle.prices.full[packageId] ?? null;
 return null;
}

export function getPackageLabel(serviceId, packageId) {
 if (serviceId === 'exterior') return 'Exterior Only';
 if (serviceId === 'interior') return 'Interior Only';
 const tiers = { basic: 'Basic Shine', standard: 'Standard Shine', premium: 'Premium Shine'};
 return tiers[packageId] ?? 'Standard Shine';
}

export function getPackageTierName(packageId) {
 return { basic: 'Basic', standard: 'Standard', premium: 'Premium'}[packageId] ?? 'Standard';
}

export function getEstimatedTime(serviceId, packageId) {
 if (serviceId === 'exterior') return '1–1.5 Hours';
 if (serviceId === 'interior') return '1–2 Hours';
 const times = { basic: '1–2 Hours', standard: '2–3 Hours', premium: '3–5 Hours'};
 return times[packageId] ?? '2–3 Hours';
}

export function calculateTotal(vehicleId, serviceId, packageId, addonIds = [], addonsList) {
 const base = getServicePrice(vehicleId, serviceId, packageId || 'standard') ?? 0;
 const addonTotal = addonIds.reduce((sum, id) => {
 const addon = addonsList.find((a) => a.id === id);
 return sum + (addon?.price ?? 0);
}, 0);
 return base + addonTotal;
}
