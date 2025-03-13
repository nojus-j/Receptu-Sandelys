import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle the input change and update the ingredients state
  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  // Function to call the Spoonacular API
  const fetchRecipes = async () => {
    if (!ingredients) {
      alert("Please enter some ingredients!");
      return;
    }

    setLoading(true);
    try {
      // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const formattedIngredients = ingredients
      .split(' ') // Split by commas
      .map((ingredient) => ingredient.trim()) // Trim whitespace
      .join(',+');
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredients}&number=9&apiKey=${apiKey}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error); 
      alert("There was an error fetching the recipes.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission (optional, if you want to prevent page reload)
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRecipes();
  };

  return (
<div className="p-6">
      
      <form onSubmit={handleSubmit} className="mb-8 flex justify-center">
        <input
          type="text"
          value={ingredients}
          onChange={handleInputChange}
          placeholder="Enter ingredients (e.g., chicken, tomato, cheese)"
          className="border border-gray-300 rounded-l-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white-500 text-black rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Loading...' : 'Find Recipes'}
        </button>
      </form>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-4">
        {recipes.length > 0 ? (
          recipes.slice(0, 9).map((recipe) => (
            // Show only the first 9 recipes
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <a
              href = "https://www.youtube.com/watch?v=yrsuzIpQuy0"
             target ="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity duration-200">
              <img
                src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`}
                alt={recipe.title}
                className="w-24 h-24 object-cover"
              />
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              </div>
              </a>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-600 col-span-3">No recipes found.</p>
        )}
      </div>
    </div>
   );
};

export default SearchBar;
