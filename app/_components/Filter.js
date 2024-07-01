'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filters = ['all', 'small', 'medium', 'large'];
const filterValues = {
  all: 'All',
  small: '1-3',
  medium: '4-7',
  large: '8-12',
};

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className='flex border border-primary-800'>
      {filters.map(filter => (
        <Button
          key={filter}
          filter={filter}
          currentFilter={currentFilter}
          onFilter={handleFilter}
        >
          {filterValues[filter]} guests
        </Button>
      ))}
    </div>
  );
}

function Button({ filter, currentFilter, onFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-900 ${
        filter === currentFilter && 'bg-primary-900 text-primary-50'
      }`}
      onClick={() => onFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
