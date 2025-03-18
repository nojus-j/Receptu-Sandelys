import React, { useState, useEffect } from "react";
import axios from "axios";
import { Range } from "react-range";
import "./App.css";

const FilterRecipeSlider = () => {
  const [filters, setFilters] = useState({
    carbs: [10, 100],
    protein: [10, 100],
    calories: [50, 800],
    fat: [1, 100],
  });

  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(false);

  const minValues = { 
    carbs: 10,
     protein: 10,
      calories: 50,
       fat: 1 
    };
  const maxValues = { 
    carbs: 100, 
    protein: 100,
     calories: 800, 
     fat: 100 
    };

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY2;

      console.log("Fetching recipes by filters...");

      const response = await axios.get(`https://api.spoonacular.com/recipes/findByNutrients`, {
        params: {
          minCarbs: filters.carbs[0],
          maxCarbs: filters.carbs[1],
          minProtein: filters.protein[0],
          maxProtein: filters.protein[1],
          minCalories: filters.calories[0],
          maxCalories: filters.calories[1],
          minFat: filters.fat[0],
          maxFat: filters.fat[1],
          number: 5,
          apiKey: apiKey,
        },
      });

      console.log("API Response:", response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error(" Error fetching recipes:", error);
      alert(`API Error: ${error.response?.status || "Unknown"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); 
  }, [filters]);

  const handleSliderChange = (key, values) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: values }));
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filters</h2>
      {Object.keys(filters).map((key) => (
        <div key={key} className="filter-group">
          <label className="filter-label">{key.toUpperCase()}</label>
          <Range
            step={1}
            min={minValues[key]}
            max={maxValues[key]}
            values={filters[key]}
            onChange={(values) => handleSliderChange(key, values)}
            renderTrack={({ props, children }) => <div {...props} className="filter-slider">{children}</div>}
            renderThumb={({ props }) => <div {...props} className="filter-thumb" />}
          />
          <p className="filter-values">{filters[key][0]} - {filters[key][1]}</p>
        </div>
      ))}

      {/* Receptų rodymas */}
      <h3 className="filter-title purple-text">Recipes by filters</h3>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-img" />
              <h3 className="recipe-title">{recipe.title}</h3>
              {recipe.calories ? <p className="recipe-info">Calories: {recipe.calories}</p> : null}
              {recipe.carbs ? <p className="recipe-info">Carbs: {recipe.carbs}</p> : null}
              {recipe.protein ? <p className="recipe-info">Protein: {recipe.protein}</p> : null}
              {recipe.fat ? <p className="recipe-info">Fat: {recipe.fat}</p> : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recipes">No recipes found.</p>
      )}
    </div>
  );
};

export default FilterRecipeSlider;
