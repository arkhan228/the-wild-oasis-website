'use client';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    startTransition(() => onDelete(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className='flex items-center flex-grow gap-2 px-3 text-xs font-bold uppercase transition-colors group text-primary-300 hover:bg-accent-600 hover:text-primary-900'
    >
      {isPending ? (
        <span className='mx-auto'>
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className='w-5 h-5 transition-colors text-primary-600 group-hover:text-primary-800' />
          <span className='mt-1'>Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
