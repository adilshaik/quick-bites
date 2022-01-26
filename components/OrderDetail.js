import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const OrderDetail = ({ cash, createOrder, total }) => {
  const [customerName, setCustomerName] = useState();
  const [address, setAddress] = useState();
  const [open, setOpen] = useState(cash);

  const handleOrder = () => {
    createOrder({
      customerName,
      address,
      total,
      method: 0,
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div>
                <div className='text-center sm:mt-5'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-semibold leading-6 font-medium text-gray-900'
                  >
                    You will pay {total} after delivery
                  </Dialog.Title>
                  <form>
                    <div className='overflow-hidden sm:rounded-md'>
                      <div className='px-4 py-5 bg-white sm:p-6'>
                        <div className='grid grid-cols-6 gap-6'>
                          <div className='col-span-6'>
                            <label
                              htmlFor='name'
                              className='text-left block text-sm font-medium text-gray-700'
                            >
                              Name
                            </label>
                            <input
                              type='text'
                              name='customerName'
                              id='customerName'
                              autoComplete='name'
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                          <div className='col-span-6'>
                            <label
                              htmlFor='street-address'
                              className='text-left block text-sm font-medium text-gray-700'
                            >
                              Street address
                            </label>
                            <input
                              type='text'
                              name='street-address'
                              id='street-address'
                              autoComplete='street-address'
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className='mt-5 sm:mt-6'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                  onClick={handleOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OrderDetail;
