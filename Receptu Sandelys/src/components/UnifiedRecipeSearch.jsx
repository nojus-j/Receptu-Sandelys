import React, { useState } from "react";
import FilterRecipeSlider from "./Filter_Recipe_Slider";
import FilterRecipeCheckbox from "./CheckBox";
import SearchBar from "./SearchBar";
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

  return (
    <div className="filter-container">
      <h2 className="filter-title">Recipe Search</h2>

      <SearchBar ingredients={ingredients} setIngredients={setIngredients} />

      <FilterRecipeSlider
        sliderValues={sliderValues}
        onSliderChange={handleSliderChange}
      />

      <FilterRecipeCheckbox
        checkboxFilters={checkboxFilters}
        setCheckboxFilters={setCheckboxFilters}
      />

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
            className="bg-white p-4 rounded-lg shadow-md text-center"
        >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md mb-2"
        />
        <h3 className="text-sm font-semibold">{recipe.title}</h3>
      </div>
    ))}
  </div>
  ) : (
  <p className="no-recipes">No recipes found.</p>
    )}
    </div>
  );
};

export default UnifiedRecipeSearch;
