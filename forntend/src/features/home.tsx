import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Search Professional</h1>
          <ul className="flex space-x-6 text-sm font-medium">
            <li><a href="#" className="hover:text-blue-500">Home</a></li>
         
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-100 to-blue-50">
        <h2 className="text-4xl font-bold mb-4">Find the Right Professional for Any Task</h2>
        <p className="text-lg mb-8 text-gray-600">Connect with verified professionals near you in seconds.</p>
        <div className="flex justify-center px-4">
          <input
            type="text"
            placeholder="Search for electricians, designers, developers..."
            className="w-full max-w-md p-3 rounded-l-lg border border-gray-300 focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center mb-12">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold mb-2">Verified Experts</h4>
              <p className="text-gray-600">All professionals are screened and approved for quality and reliability.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold mb-2">Fast & Easy</h4>
              <p className="text-gray-600">Search and connect with the right person in just a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold mb-2">Trusted by Users</h4>
              <p className="text-gray-600">Thousands of satisfied users across the country trust Search Professional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © 2025 Search Professional. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
