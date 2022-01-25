import React from 'react';
import Image from 'next/image';

const index = () => {
  return (
    <div className='flex justift-between flex-wrap overflow-hidden'>
      <div className='w-2/5 mx-5 flex flex-1 flex-col'>
        <h1 className='ml-5 text-3xl font-bold my-5'>Products</h1>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='pl-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Id
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr key=''>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Image
                        width={40}
                        height={40}
                        src='/img/pizza.png'
                        alt=''
                      />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      3121
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      Title
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      Rs.40
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      <div className='flex'>
                        <button className='mr-5 border px-2 rounded-md bg-blue-400 text-white hover:bg-blue-500'>
                          Edit
                        </button>
                        <button className='border px-2 rounded-md bg-red-600 text-white hover:bg-red-700'>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='w-2/5 mx-5 mx-5 flex flex-1 flex-col'>
        <h1 className='ml-5 text-3xl font-bold my-5'>Orders</h1>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='pl-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Id
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
                      Total
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Payment
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr key=''>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Image
                        width={40}
                        height={40}
                        src='/img/pizza.png'
                        alt=''
                      />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      89213..
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      John Doe
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      Rs.50
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      Paid
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                      <button className='bg-gray-200 px-2 rounded-md hover:bg-gray-300'>
                        Next Stage
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
