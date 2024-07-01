'use client';

import { useFormStatus } from 'react-dom';
import SpinnerMini from './SpinnerMini';

function SubmitButton({ disabled = false, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className='px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
      disabled={disabled}
    >
      {pending ? (
        <span className='mx-auto'>
          <SpinnerMini />
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default SubmitButton;
