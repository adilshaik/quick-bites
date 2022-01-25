import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';

const index = () => {
  const status = 0;

  const statusClass = (index) => {
    if (index - status < 1) return '';
    if (index - status === 1) return 'animateProgress';
    if (index - status > 1) return 'undone';
  };

  return (
    <div className='flex flex-wrap justify-between py-10 px-3'>
      <div className='w-4/6 flex flex-2 flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='pl-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Order ID
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Customer
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Address
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Total
                    </th>

                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr key=''>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      12356718212121
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      John Doe
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      Address
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      Rs.80
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='my-5 px-10 flex flex-wrap justify-between items-center w-3/4'>
          <div
            className={`${statusClass(
              0
            )} flex flex-col justify-center items-center`}
          >
            <Image
              width={40}
              height={40}
              src='/img/paid.png'
              className=''
              alt='payment-image'
            />
            <span className='my-1'>Payment</span>
            <div className='checkedIcon'>
              <Image
                className='checkedIcon'
                src='/img/checked.png'
                width={20}
                height={20}
                alt='checked-image'
              />
            </div>
          </div>
          <div
            className={`${statusClass(
              1
            )} flex flex-col justify-center items-center`}
          >
            <Image
              width={40}
              height={40}
              src='/img/bake.png'
              className=''
              alt='cooking-image'
            />
            <span className='my-1'>Cooking</span>
            <div className='checkedIcon'>
              <Image
                className='checkedIcon'
                src='/img/checked.png'
                width={20}
                height={20}
                alt='checked-image'
              />
            </div>
          </div>
          <div
            className={`${statusClass(
              2
            )} flex flex-col justify-center items-center`}
          >
            <Image
              width={40}
              height={40}
              src='/img/bike.png'
              className=''
              alt='ontheway-image'
            />
            <span className='my-1'>On the way</span>
            <div className='checkedIcon'>
              <Image
                className='checkedIcon'
                src='/img/checked.png'
                width={20}
                height={20}
                alt='checked-image'
              />
            </div>
          </div>
          <div
            className={`${statusClass(
              3
            )} flex flex-col justify-center items-center`}
          >
            <Image
              width={40}
              height={40}
              src='/img/delivered.png'
              className='delivered-image'
              alt='delivered-image'
            />
            <span className='my-1'>Delivered</span>
            <div className='checkedIcon'>
              <Image
                className='checkedIcon'
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mx-10 p-5 flex-1 w-auto flex flex-col bg-gray-800 text-white rounded-md'>
        <div className='mb-5 text-xl font-bold tracking-wider'>CART TOTAL</div>
        <div className='flex flex-col'>
          <div className='my-1'>
            <span className='font-semibold'>Subtotal: </span>
            <span className='ml-2'>Rs.0</span>
          </div>
          <div className='my-1'>
            <span className='font-semibold'>Discount: </span>
            <span className='ml-2'>Rs.0</span>
          </div>
          <div className='my-1'>
            <span className='font-semibold'>Total: </span>
            <span className='ml-2'>Rs.0</span>
          </div>
        </div>
        <button className='w-full mt-5 py-2 bg-white text-black font-semibold uppercase rounded-sm hover:bg-gray-200'>
          PAID
        </button>
      </div>
      <style jsx>
        {`
          .animateProgress {
            animation: inProgress 1s ease infinite alternate;
          }

          @keyframes inProgress {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .undone {
            opacity: 0.3;
          }

          .undone .checkedIcon,
          .animateProgress .checkedIcon {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default index;
