import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/Navbar';
import Footer from '../Components/Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
