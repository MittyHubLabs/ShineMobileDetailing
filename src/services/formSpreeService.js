const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeobkwb';

function formatPreferredDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatAddonsList(addons) {
  if (!addons?.length) return 'None';
  return addons.map((a) => `${a.label} (${a.price})`).join(', ');
}

/**
 * POST booking data to Formspree via the fetch API.
 * @param {object} booking
 */
export async function submitBookingToFormspree(booking) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      service_address: booking.address,
      preferred_date: formatPreferredDate(booking.preferredDate),
      preferred_time: booking.preferredTime ?? '',
      vehicle_type: booking.vehicleType,
      service_type: booking.serviceType,
      package: booking.packageTier,
      addons: formatAddonsList(booking.addons),
      estimated_total: booking.totalPrice,
    }),
  });

  if (!response.ok) {
    throw new Error(`Formspree returned status ${response.status}`);
  }

  return response.json();
}
