import React from "react";

const Header = () => {
  return (
    <header className="bg-white text-black py-4 w-full">
      <div className="container mx-auto flex items-center justify-center">
        <img src="/emptyFridge.png" alt="Logo" className="w-24 h-24 mr-4" />
        <h1 className="text-3xl font-bold">Receptu sandelys</h1>
      </div>
    </header>
  );
};

export default Header;
