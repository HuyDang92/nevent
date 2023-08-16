import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
  return (
    <div className="relative">
      <Header />
      <main className="mx-auto min-h-screen 2xl:container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
