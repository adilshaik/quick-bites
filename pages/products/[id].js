import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

const index = ({ product }) => {
  const [price, setPrice] = useState(product.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, extras, price, quantity }));
  };

  return (
    <div className='flex text-base text-left transform transition w-full md:inline-block md:px-4  md:align-middle'>
      <div className='w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
        <div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
          <div className='aspect-w-2 flex justify-center rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5'>
            <Image
              width={500}
              height={500}
              src={product.image}
              alt={product.title}
              className='object-center object-cover'
            />
          </div>
          <div className='sm:col-span-8 lg:col-span-7'>
            <h2 className='text-3xl uppercase font-extrabold text-gray-900 sm:pr-12'>
              {product.title}
            </h2>

            <section aria-labelledby='information-heading' className='mt-2'>
              <h3 id='information-heading' className='sr-only'>
                Product information
              </h3>

              <p className='text-2xl font-semibold underline text-red-700'>
                Rs.{price}
              </p>

              <p className='text-lg my-3 text-gray-900'>
                {product.description}
              </p>
            </section>

            <section aria-labelledby='options-heading' className='mt-5'>
              <h3 id='options-heading' className='sr-only'>
                Product options
              </h3>

              <div>
                {/* Size */}
                <div>
                  <h4 className='text-lg tracking-wide font-lg font-bold text-gray-900 font-medium'>
                    Choose the Size
                  </h4>
                  <div className='flex flex-wrap items-center'>
                    <div
                      className='cursor-pointer relative'
                      onClick={() => handleSize(0)}
                    >
                      <Image
                        width={70}
                        height={70}
                        src={product.image}
                        alt=''
                      />
                      <span
                        className='relative -top-12 pb-1 -left-10 text-white bg-red-500 px-4 rounded-lg'
                        style={{ backgroundColor: 'teal' }}
                      >
                        Small
                      </span>
                    </div>
                    <div
                      className='cursor-pointer relative'
                      onClick={() => handleSize(1)}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={product.image}
                        alt=''
                      />
                      <span
                        className='relative -top-16 pb-1 -left-10 text-white bg-red-500 px-4 rounded-lg'
                        style={{ backgroundColor: 'teal' }}
                      >
                        Medium
                      </span>
                    </div>
                    <div
                      className='cursor-pointer relative'
                      onClick={() => handleSize(2)}
                    >
                      <Image
                        width={130}
                        height={130}
                        src={product.image}
                        alt=''
                      />
                      <span
                        className='relative -top-20 pb-1 -left-10 text-white bg-red-500 px-4 rounded-lg'
                        style={{ backgroundColor: 'teal' }}
                      >
                        Large
                      </span>
                    </div>
                  </div>
                </div>

                {/* Extra Options */}
                <fieldset className='space-y-3'>
                  <h4 className='text-lg tracking-wide font-lg font-bold text-gray-900 font-medium'>
                    Choose extra options
                  </h4>
                  {product.extraOptions.map((extra) => (
                    <div key={extra._id} className='relative flex items-start'>
                      <div className='flex items-center h-6'>
                        <input
                          id={extra.text}
                          aria-describedby={extra.text}
                          name={extra.text}
                          type='checkbox'
                          onChange={(e) => handleChange(e, extra)}
                          className='focus:ring-indigo-500 mt-1 h-5 w-5 text-indigo-600 border-gray-300 rounded'
                        />
                      </div>
                      <div className='ml-3 text-md'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-700'
                        >
                          {extra.text}
                        </label>
                        <span
                          id='comments-description'
                          className='text-gray-500'
                        >
                          <span className='ml-2'>+ Rs.{extra.price}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </fieldset>

                <div className='flex items-center mt-5'>
                  <input
                    onChange={(e) => setQuantity(e.target.value)}
                    type='number'
                    defaultValue={1}
                    className='w-16 h-10 border-2 rounded-sm focus:border-gray-500'
                  />
                  <button
                    onClick={handleClick}
                    className='ml-4 w-40 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none'
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );

  return {
    props: {
      product: res.data || null,
    },
  };
};

export default index;
