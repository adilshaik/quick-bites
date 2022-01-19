import React, { Fragment } from 'react';
import { useTheme } from 'next-themes';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import {
  BsFillCartFill,
  BsFillMoonStarsFill,
  BsFillSunFill,
} from 'react-icons/bs';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Featured', href: '#featured' },
  { id: 3, name: 'Products', href: '#products' },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Popover className='w-full fixed bg-white top-0 left-0 dark:bg-gray-800'>
      <div className='max-w-full mx-auto shadow-md sm:px-6'>
        <div className='flex justify-between items-center py-5 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <a href='#'>
              <span className='sr-only'>Quick Bites</span>
              <img className='h-8 w-auto sm:h-10' src='favicon.ico' alt='' />
            </a>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
              <span className='sr-only'>Open menu</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          <Popover.Group as='nav' className='hidden md:flex space-x-10'>
            {navigation.map((item) => (
              <Link key={item.id} href={item.href}>
                <span className='cursor-pointer text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-400'>
                  {item.name}
                </span>
              </Link>
            ))}
          </Popover.Group>
          <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
            <button
              aria-label='Toggle Dark Mode'
              type='button'
              className='p-3 h-12 w-12 order-2 md:order-3'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <BsFillSunFill size={20} color='yellow' />
              ) : (
                <BsFillMoonStarsFill size={20} color='gray' />
              )}
            </button>
            <Link href='/cart'>
              <a className='relative'>
                <BsFillCartFill size={30} color='purple' />
              </a>
            </Link>
            <span className='w-7 text-center rounded-full bg-black text-white relative font-bold text-lg -top-4 -left-2'>
              0
            </span>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='favicon.ico'
                    alt='Quick Bites'
                  />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 '>
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                {navigation.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <span className='cursor-pointer text-lg font-medium text-gray-900 hover:text-gray-70 dark:text-white dark:hover:text-gray-400'>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <Link href='/cart'>
                    <a className='flex items-center justify-center text-base font-medium text-white absolute'>
                      <BsFillCartFill size={30} color='purple' />
                    </a>
                  </Link>
                  <span className='px-2 pb-1 text-center relative font-bold bg-black text-white rounded-full -top-4 left-5'>
                    0
                  </span>
                </div>
                <p className=''>
                  <button
                    aria-label='Toggle Dark Mode'
                    type='button'
                    className='h-12 w-12 order-2 md:order-3'
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                  >
                    {theme === 'dark' ? (
                      <BsFillSunFill size={20} color='yellow' />
                    ) : (
                      <BsFillMoonStarsFill size={20} color='gray' />
                    )}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
