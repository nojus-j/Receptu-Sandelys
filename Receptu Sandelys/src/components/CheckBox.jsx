import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const FilterRecipeCheckbox = () => {
    const [filters, setFilters] = useState({
        vegan: false,
        vegetarian: false,
        mealType: [],
    });

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        if (name === "vegan" || name === "vegetarian") {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: checked,
            }));
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                mealType: checked
                    ? [...prevFilters.mealType, name]
                    : prevFilters.mealType.filter((item) => item !== name),
            }));
        }
    };

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY3;

            console.log("Fetching recipes by checkboxes...");

            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    diet: filters.vegan ? "vegan" : filters.vegetarian ? "vegetarian" : "",
                    type: filters.mealType.join(","),
                    number: 5,
                    apiKey: apiKey,
                },
            });

            console.log("API Response:", response.data);
            setRecipes(response.data.results);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            alert(`API Error: ${error.response?.status || "Unknown"}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [filters]);

    return (
        <div className="filter-container">
            <h2 className="filter-title">Meal & Diet Filters</h2>

            <label>
                <input type="checkbox" name="vegan" checked={filters.vegan} onChange={handleCheckboxChange} />
                Vegan
            </label>

            <label>
                <input type="checkbox" name="vegetarian" checked={filters.vegetarian} onChange={handleCheckboxChange} />
                Vegetarian
            </label>

            <h3>Meal Type</h3>
            {["breakfast", "main course", "snack", "appetizer"].map((type) => (
                <label key={type}>
                    <input type="checkbox" name={type} checked={filters.mealType.includes(type)} onChange={handleCheckboxChange} />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
            ))}

            <h3 className="filter-title purple-text">Recipes by filters</h3>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : recipes.length > 0 ? (
                <div className="recipe-grid">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <img src={recipe.image} alt={recipe.title} className="recipe-img" />
                            <h3 className="recipe-title">{recipe.title}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-recipes">No recipes found.</p>
            )}
        </div>
    );
};

export default FilterRecipeCheckbox;

