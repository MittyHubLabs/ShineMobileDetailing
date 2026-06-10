export const VEHICLE_PRICING = [
 {
 id: 'coupe',
 label: 'Coupe',
 description: 'Small 2-door vehicles.',
 prices: {
 exterior: 45,
 interior: 55,
 full: { standard: 80, premium: 150},
},
},
 {
 id: 'sedan',
 label: 'Sedan',
 description: 'Standard 4-door vehicles.',
 prices: {
 exterior: 55,
 interior: 65,
 full: { standard: 90, premium: 165},
},
},
 {
 id: 'midsize-suv',
 label: 'Midsize SUV',
 description: 'Mid-size SUVs and larger crossovers.',
 prices: {
 exterior: 65,
 interior: 75,
 full: { standard: 100, premium: 180},
},
},
 {
 id: 'large',
 label: 'Truck, Van & 3-Row SUV',
 description: 'Full-size trucks, vans, and large 3-row SUVs.',
 prices: {
 exterior: 75,
 interior: 85,
 full: { standard: 110, premium: 200},
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
 const tiers = { standard: 'Standard Shine', premium: 'Premium Shine'};
 return tiers[packageId] ?? 'Standard Shine';
}

export function getPackageTierName(packageId) {
 return { standard: 'Standard', premium: 'Premium'}[packageId] ?? 'Standard';
}

export function getEstimatedTime(serviceId, packageId) {
 if (serviceId === 'exterior') return '1–1.5 Hours';
 if (serviceId === 'interior') return '1–2 Hours';
 const times = { standard: '2–3 Hours', premium: '3–5 Hours'};
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
