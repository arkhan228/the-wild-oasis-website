'use client';

import Image from 'next/image';
import { useReservation } from './ReservationContext';
import { differenceInDays } from 'date-fns';
import SubmitButton from './SubmitButton';
import { createReservation } from '../_lib/actions';

function setLocalHoursToUTCOffset(date) {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  date?.setHours(hours, minutes);
  return date;
}

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = setLocalHoursToUTCOffset(range.from);
  const endDate = setLocalHoursToUTCOffset(range.to);
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    cabinId: id,
    numNights,
    startDate,
    endDate,
    cabinPrice,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div className='scale-[1.01]'>
      <div className='flex items-center justify-between px-16 py-2 bg-primary-800 text-primary-300'>
        <p>Logged in as</p>

        <div className='flex items-center gap-4'>
          <div className='relative w-8 h-8'>
            <Image
              // Important to display google profile images
              referrerPolicy='no-referrer'
              className='object-cover rounded-full'
              src={user.image}
              alt={user.name}
              fill
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async FormData => {
          await createReservationWithData(FormData);
          resetRange();
        }}
        className='flex flex-col gap-5 px-16 py-10 text-lg bg-primary-900'
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(x => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex items-center justify-end gap-6'>
          <p className='text-base text-primary-300'>Start by selecting dates</p>

          <SubmitButton disabled={!(range.from && range.to)}>
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
