import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Fragment, useState } from 'react';

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState([]);
  const [file, setFile] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dj7nomqfd/image/upload',
        data
      );

      const { url } = uploadRes.data;
      setFile(url);

      const newProduct = {
        title,
        prices,
        description,
        image: url,
        extraOptions,
      };

      await axios.post('http://localhost:3000/api/products', newProduct);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='m-5'>
        <button
          type='button'
          onClick={openModal}
          className='px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        >
          Add Product
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-center text-lg font-medium leading-6 text-gray-900'
                >
                  Add A Product
                </Dialog.Title>
                <div className='mt-2'>
                  <div>
                    <div className='overflow-hidden sm:rounded-md'>
                      <div className='px-4 py-5 bg-white sm:p-6'>
                        <div className='grid grid-cols-6 gap-6'>
                          <div className='col-span-6'>
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='file-upload'
                                className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none'
                              >
                                <span>Upload Image</span>
                                <input
                                  id='file-upload'
                                  name='file-upload'
                                  type='file'
                                  className='sr-only'
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                              </label>
                            </div>
                          </div>

                          <div className='col-span-6'>
                            <label
                              htmlFor='title'
                              className='text-left block text-sm font-medium text-gray-700'
                            >
                              Title
                            </label>
                            <input
                              type='text'
                              name='title'
                              id='title'
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                          <div className='col-span-6'>
                            <label
                              htmlFor='description'
                              className='text-left block text-sm font-medium text-gray-700'
                            >
                              Description
                            </label>
                            <textarea
                              type='text'
                              name='description'
                              id='description'
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                          <div className='col-span-6'>
                            <label
                              htmlFor='prices'
                              className='text-left block text-sm font-medium text-gray-700'
                            >
                              Prices
                            </label>
                            <div className='flex justify-between'>
                              <input
                                type='number'
                                name='prices'
                                id='prices'
                                placeholder='Small'
                                onChange={(e) => changePrice(e, 0)}
                                className='mt-1 w-24 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                              <input
                                type='number'
                                name='prices'
                                id='prices'
                                placeholder='Medium'
                                onChange={(e) => changePrice(e, 1)}
                                className='mt-1 w-24 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                              <input
                                type='number'
                                name='prices'
                                id='prices'
                                placeholder='Large'
                                onChange={(e) => changePrice(e, 2)}
                                className='mt-1 w-24 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                            </div>
                          </div>
                          <div className='col-span-6'>
                            <label
                              htmlFor='extra'
                              className='text-left block text-sm font-medium text-gray-700'
                            >
                              Extra
                            </label>
                            <div className='flex justify-between'>
                              <input
                                type='text'
                                placeholder='Item'
                                name='text'
                                onChange={handleExtraInput}
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-20 shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                              <input
                                type='number'
                                name='price'
                                placeholder='Price'
                                onChange={handleExtraInput}
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-20 shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                              <button className='w-20' onClick={handleExtra}>
                                Add
                              </button>
                            </div>
                            <div className='col-span-6 flex mt-5'>
                              {extraOptions.map((extra) => (
                                <span
                                  className='px-2 border-2 rounded-md mr-5'
                                  key={extra.text}
                                >
                                  {extra.text}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-4 flex justify-center'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={handleSubmit}
                  >
                    Add a Product
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
