import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const TIME_SLOTS = [
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
];

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function isDateSelectable(date) {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day >= startOfToday() && date.getDay() !== 0;
}

export function buildPreferredDateTime(date, time) {
  if (!date || !time) return '';
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return `${dateStr} at ${time}`;
}

export default function BookingDateTimeFields({ preferredDate, preferredTime, onDateChange, onTimeChange }) {
  return (
    <div className="space-y-7">
      <label className="block">
        <span className="mb-2 block text-xs font-medium text-shine-text">Preferred Date</span>
        <DatePicker
          selected={preferredDate}
          onChange={onDateChange}
          minDate={startOfToday()}
          filterDate={isDateSelectable}
          dateFormat="EEEE, MMMM d, yyyy"
          placeholderText="Select a date"
          className="booking-field-input w-full"
          calendarClassName="shine-datepicker"
          popperClassName="shine-datepicker-popper"
          popperPlacement="bottom-start"
          showPopperArrow={false}
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-medium text-shine-text">Preferred Time</span>
        <select
          value={preferredTime}
          onChange={onTimeChange}
          className="booking-field-input w-full cursor-pointer appearance-none"
        >
          <option value="" disabled>
            Select a time
          </option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot} className="bg-white text-[#1a1a1a]">
              {slot}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
