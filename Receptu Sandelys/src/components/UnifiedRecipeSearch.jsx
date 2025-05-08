import React, { useState } from "react";
import FilterRecipeSlider from "./Filter_Recipe_Slider";
import FilterRecipeCheckbox from "./CheckBox";
import SearchBar from "./SearchBar";
import RecipeDetails from "./RecipeDetails";
import axios from "axios";

const UnifiedRecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [sliderValues, setSliderValues] = useState({
    carbs: [10, 100],
    protein: [10, 100],
    calories: [50, 800],
    fat: [1, 100],
  });

  const [checkboxFilters, setCheckboxFilters] = useState({
    vegan: false,
    vegetarian: false,
    mealType: [],
  });

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  // Aiškiai nustatome pradinę reikšmę kaip null
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSliderChange = (key, values) => {
    setSliderValues((prev) => ({ ...prev, [key]: values }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY3;
      const formattedIngredients = ingredients
          .split(" ")
          .map((i) => i.trim())
          .join(",+");

      const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              includeIngredients: ingredients ? formattedIngredients : undefined,
              minCarbs: sliderValues.carbs[0],
              maxCarbs: sliderValues.carbs[1],
              minProtein: sliderValues.protein[0],
              maxProtein: sliderValues.protein[1],
              minCalories: sliderValues.calories[0],
              maxCalories: sliderValues.calories[1],
              minFat: sliderValues.fat[0],
              maxFat: sliderValues.fat[1],
              diet: checkboxFilters.vegan
                  ? "vegan"
                  : checkboxFilters.vegetarian
                      ? "vegetarian"
                      : undefined,
              type: checkboxFilters.mealType.join(",") || undefined,
              number: 9,
              apiKey,
            },
          }
      );

      setRecipes(response.data.results || []);
    } catch (error) {
      console.error("API error:", error);
      alert("API Error: " + (error.response?.status || "Unknown"));
    } finally {
      setLoading(false);
    }
  };

  const openRecipeDetails = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  const closeRecipeDetails = () => {
    setSelectedRecipeId(null);
  };

  return (
      <div className="flex min-h-screen">
        {/* Sidebar: Contains only the filter controls */}
        <aside className="w-84 bg-gray-500">
          <h2 className="text-xl text-black font-bold mb-4">Filters</h2>
          <FilterRecipeSlider
              sliderValues={sliderValues}
              onSliderChange={handleSliderChange}
          />
          <FilterRecipeCheckbox
              checkboxFilters={checkboxFilters}
              setCheckboxFilters={setCheckboxFilters}
          />
        </aside>
        {/* Main Content: Contains the search bar, button, and recipe results */}
        <main className="flex-1 p-4">
          <h2 className="filter-title">Recipe Search</h2>
          <SearchBar ingredients={ingredients} setIngredients={setIngredients} />
          <div className="text-center mt-4">
            <button className="confirm-button" onClick={handleSearch}>
              {loading ? "Loading..." : "Find Recipes"}
            </button>
          </div>
          <h3 className="filter-title purple-text mt-6">Recipes</h3>
          {loading ? (
              <p className="loading-text">Loading...</p>
          ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => openRecipeDetails(recipe.id)}
                    >
                      <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-40 object-cover rounded-md mb-2"
                      />
                      <h3 className="text-sm font-semibold text-purple-600">{recipe.title}</h3>
                    </div>
                ))}
              </div>
          ) : (
              <p className="no-recipes">No recipes found.</p>
          )}
        </main>

        {/* Recipe Details Modal - tik tada, kai selectedRecipeId yra aiškiai apibrėžtas ir nėra null */}
        {selectedRecipeId && selectedRecipeId !== null && (
            <RecipeDetails
                recipeId={selectedRecipeId}
                onClose={closeRecipeDetails}
            />
        )}
      </div>
  );
};

export default UnifiedRecipeSearch;