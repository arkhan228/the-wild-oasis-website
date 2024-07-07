'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error('You must be logged in to update your profile');

  const nationalID = formData.get('nationalID');

  if (!/^[a-zA-Z0-9]{8,16}$/.test(nationalID))
    throw new Error('Please provide a valid National ID');

  const [nationality, countryFlag] = formData.get('nationality').split('%');

  const updatedData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { error } = await supabase
    .from('guests')
    .update(updatedData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function createReservation(bookingData, formData) {
  const session = await auth();

  if (!session)
    throw new Error('You must be logged in to create a reservation');

  const fullBookingData = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: +formData.get('numGuests'),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: 'unconfirmed',
    hasBreakfast: false,
    isPaid: false,
  };

  const { error } = await supabase.from('bookings').insert([fullBookingData]);

  if (error) throw new Error('Reservation could not be created');

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  const guestBookings = await getBookings(session?.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not authorized to delete this reservation');

  if (!session)
    throw new Error('You must be logged in to delete a reservation');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Reservation could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
  const session = await auth();

  if (!session)
    throw new Error('You must be logged in to update your reservation');

  const guestBookings = await getBookings(session?.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  const bookingId = +formData.get('bookingId');

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not authorized to update this reservation');

  const updatedData = {
    numGuests: +formData.get('numGuests'),
    observations: formData.get('observations').slice(0, 1000),
  };

  const { error } = await supabase
    .from('bookings')
    .update(updatedData)
    .eq('id', bookingId);

  if (error) throw new Error('Reservation could not be updated');

  revalidatePath('/account/reservations/edit/' + bookingId);
  revalidatePath('/account/reservations');
  redirect('/account/reservations');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
