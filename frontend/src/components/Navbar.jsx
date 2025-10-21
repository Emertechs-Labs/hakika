import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Hakika</Link>
        <div>
          <Link to="/" className="mr-4">Feed</Link>
          <Link to="/create">Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
