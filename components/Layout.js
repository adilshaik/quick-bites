import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className='mt-24'>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
