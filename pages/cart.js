import { useEffect, useState } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import axios from 'axios';

const cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data);
      console.log(res);
      if (res.status === 201) {
        router.push(`/orders/${res.data._id}`);
        dispatch(reset());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // This values are the props in the UI
  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customerName: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className='flex flex-wrap justify-between py-10 px-3'>
      <div className='w-4/6 flex flex-2 flex-col'>
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
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-lg font-bold text-gray-800 capitalize tracking-wider'
                    >
                      Extras
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
                      Quantity
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
                  {cart.products.length > 0 ? (
                    cart?.products.map((product) => (
                      <tr key={product._id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Image
                            width={100}
                            height={100}
                            src={product.image}
                            alt=''
                          />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                          {product.title}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                          {product.extras.length > 0 ? (
                            product.extras.map((extra) => (
                              <span key={extra._id}>{extra.text},</span>
                            ))
                          ) : (
                            <span>No extras</span>
                          )}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                          Rs.{product.price}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                          {product.quantity}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                          Rs.{product.price * product.quantity}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className='py-5 text-md font-semibold'>
                      Add products to cart
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          open
            ? 'h-80 mx-10 p-5 flex-1 w-auto flex flex-col bg-gray-800 text-white rounded-md'
            : 'h-64 mx-10 p-5 flex-1 w-auto flex flex-col bg-gray-800 text-white rounded-md'
        }
      >
        <div className='mb-5 text-xl font-bold tracking-wider'>CART TOTAL</div>
        <div className='flex flex-col'>
          <div className='my-1'>
            <span className='font-semibold'>Subtotal: </span>
            <span className='ml-2'>Rs.{cart.total}</span>
          </div>
          <div className='my-1'>
            <span className='font-semibold'>Discount: </span>
            <span className='ml-2'>Rs.0</span>
          </div>
          <div className='my-1'>
            <span className='font-semibold'>Total: </span>
            <span className='ml-2'>Rs.{cart.total}</span>
          </div>
        </div>
        {open ? (
          <>
            <button className='w-full border-2 mt-5 py-2 bg-white text-black font-semibold uppercase rounded-sm hover:bg-gray-200'>
              Cash On Delivery
            </button>
            <div
              className='mt-5'
              style={{ maxWidth: '750px', minHeight: '200px' }}
            >
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'AYqlbFjfWVnjdNd_b89FSHq4vI0O9EPFwkym1onHIuSoTzwvUAizg5wnT4HamXoasyhmqz9S5qgcqXJ2',
                  components: 'buttons',
                  currency: 'USD',
                  'disable-funding': 'credit,card,p24',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          </>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className='w-full border-2 mt-5 py-2 bg-white text-black font-semibold uppercase rounded-sm hover:bg-gray-200'
          >
            Checkout Now
          </button>
        )}
      </div>
    </div>
  );
};

export default cart;
