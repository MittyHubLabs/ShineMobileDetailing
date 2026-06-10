export const BOOKING_STEPS = [
  { key: 'vehicle', label: 'Choose Vehicle', title: 'Choose your vehicle' },
  { key: 'service', label: 'Choose Service', title: 'Choose your service' },
  { key: 'package', label: 'Choose Package', title: 'Choose your package' },
  { key: 'addons', label: 'Add Upgrades', title: 'Add upgrades' },
  { key: 'details', label: 'Your Details', title: 'Your details' },
];

export function getResumeStepIndex(form) {
  const { vehicleId, serviceId, packageId } = form;
  if (!vehicleId) return 0;
  if (!serviceId) return 1;
  if (serviceId === 'full' && !packageId) return 2;
  return 3;
}

export function getNextStepAfterService(serviceId) {
  return serviceId === 'full' ? 2 : 3;
}

export function getPreviousStepIndex(currentIndex, serviceId) {
  if (currentIndex === 4) return 3;
  if (currentIndex === 3 && serviceId !== 'full') return 1;
  return Math.max(0, currentIndex - 1);
}

export function canSchedule({ vehicleId, serviceId, packageId }) {
  if (!vehicleId || !serviceId) return false;
  if (serviceId === 'full' && !packageId) return false;
  return true;
}

export function canSubmitDetails({ name, phone, email, address, preferredDate, preferredTime }) {
  return !!(
    name?.trim() &&
    phone?.trim() &&
    email?.trim() &&
    address?.trim() &&
    preferredDate &&
    preferredTime
  );
}
