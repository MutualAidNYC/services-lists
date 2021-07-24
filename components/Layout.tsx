import React, { ReactNode } from 'react';

import Head from 'next/head';

import Navbar from './Navbar';
//import Footer from './Footer';

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = 'Main Layout',
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="container">
      <Navbar></Navbar>
    </div>
  </>
);

export default Layout;