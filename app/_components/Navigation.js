import Link from 'next/link';
import { auth } from '../_lib/auth';
import Image from 'next/image';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 text-xl'>
      <ul className='flex items-center gap-16'>
        <li>
          <Link href='/' className='transition-colors hover:text-accent-400'>
            Home
          </Link>
        </li>
        <li>
          <Link
            href='/cabins'
            className='transition-colors hover:text-accent-400'
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='transition-colors hover:text-accent-400'
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href='/account'
              className='flex items-center gap-4 transition-colors hover:text-accent-400'
            >
              <div className='relative w-8 h-8'>
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  fill
                  className='object-cover rounded-full'
                />
              </div>
              Guest area
            </Link>
          ) : (
            <Link
              href='/account'
              className='transition-colors hover:text-accent-400'
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
