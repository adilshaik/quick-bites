import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Index = ({ products, orders }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ['preparing', 'on the way', 'delivered'];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );
      setProductList(
        productList.filter((product) => {
          product._id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

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
                {productList.map((product) => (
                  <tbody
                    key={product._id}
                    className='bg-white divide-y divide-gray-200'
                  >
                    <tr>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Image
                          width={40}
                          height={40}
                          src={product.image}
                          alt=''
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {product._id.slice(0, 5)}...
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {product.title}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {product.prices[0]}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        <div className='flex'>
                          <button className='mr-5 border px-2 rounded-md bg-blue-400 text-white hover:bg-blue-500'>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className='border px-2 rounded-md bg-red-600 text-white hover:bg-red-700'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
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
                {orderList.map((order) => (
                  <tbody
                    key={order._id}
                    className='bg-white divide-y divide-gray-200'
                  >
                    <tr>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {order._id.slice(0, 5)}...
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {order.customerName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {order.total}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {order.method === 0 ? (
                          <span>Cash</span>
                        ) : (
                          <span>Paid</span>
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        {status[order.status]}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-700'>
                        <button
                          onClick={() => handleChangeStatus(order._id)}
                          className='bg-gray-200 px-2 rounded-md hover:bg-gray-300'
                        >
                          Next Stage
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || '';

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const productRes = await axios.get('http://localhost:3000/api/products');
  const orderRes = await axios.get('http://localhost:3000/api/orders');

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
