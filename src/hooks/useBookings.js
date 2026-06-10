const STORAGE_KEY = 'detailing_bookings';

export function getBookings() {
 try {
 const raw = localStorage.getItem(STORAGE_KEY);
 return raw ? JSON.parse(raw) : [];
} catch {
 return [];
}
}

/** @param {object} booking */
export function saveBooking(booking) {
 const existing = getBookings();
 const entry = {
 ...booking,
 id: crypto.randomUUID(),
 submittedAt: new Date().toISOString(),
};
 localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing]));
 return entry;
}
