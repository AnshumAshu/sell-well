// src/components/Header.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../logo.jpeg";
import DefaultAvatar from "../avatar.png"; // default avatar image

// Dropdown component for logged-in user
const UserDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <img
        src={user.avatar || DefaultAvatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 mt-12 w-48 bg-white shadow-lg rounded border border-gray-200 z-50">
          <ul className="flex flex-col">
			<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hello Name</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Wallet</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Credits</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Vouchers</li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={onLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-green-500">
            Home
          </Link>
          {!user && (
            <Link to="/signin" className="mr-5 hover:text-green-500">
              Sign In
            </Link>
          )}
          <Link to="/rate" className="mr-5 hover:text-green-500">
            Scrap Rate
          </Link>
          <Link to="/contact" className="mr-5 hover:text-green-500">
            Contact
          </Link>
        </nav>

        {/* Avatar or Sell Scrap button */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserDropdown user={user} onLogout={handleLogout} />
          ) : (
            <Link
              to="/signin"
              className="inline-flex items-center text-white bg-green-600 border-0 py-1 px-3 focus:outline-none hover:bg-green-500 rounded text-base mt-4 md:mt-0"
            >
              Sell Scrap
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
