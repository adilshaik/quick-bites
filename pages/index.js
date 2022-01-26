import Head from 'next/head';
import Image from 'next/image';
import Featured from '../components/Featured';
import { Hero } from '../components/Hero';
import ProductsList from '../components/ProductsList';
import Modal from '../components/Modal';
import axios from 'axios';
import { useState } from 'react';

export default function Home({ products, admin }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Featured />
        {admin && <Modal />}
        <ProductsList products={products} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || '';
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(`http://localhost:3000/api/products`);

  return {
    props: {
      products: res.data,
      admin: admin,
    },
  };
};
