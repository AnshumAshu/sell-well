// src/components/Navbar.jsx
import React from "react";

const avatar = () => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-green-600 p-4 flex justify-between items-center text-white">
      <div className="text-xl font-bold">Seel & Weel</div>

      {user && (
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">{user.name}</span>
          <div className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center font-bold">
            {user.name[0].toUpperCase()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default avatar;
