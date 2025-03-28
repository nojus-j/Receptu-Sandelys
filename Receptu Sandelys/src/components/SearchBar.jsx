import React from "react";

const SearchBar = ({ ingredients, setIngredients }) => {
  return (
    <div className="p-6">
      <form onSubmit={(e) => e.preventDefault()} className="mb-8 flex justify-center">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., chicken, tomato, cheese)"
          className="border border-gray-300 rounded-l-lg p-2 w-[400px] max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </form>
    </div>
  );
};

export default SearchBar;