import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipeDetails = ({ recipeId, onClose }) => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Patikriname, ar recipeId yra apibrėžtas ir galiojantis
        if (!recipeId) {
            setError("Recipe ID is missing");
            setLoading(false);
            return;
        }

        const fetchRecipeDetails = async () => {
            setLoading(true);
            setError(null); // Išvalome ankstesnes klaidas

            try {
                const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY3;

                // Patikriname, ar apiKey yra apibrėžtas
                if (!apiKey) {
                    throw new Error("API key is missing. Please check your environment variables.");
                }

                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/${recipeId}/information`,
                    {
                        params: {
                            apiKey,
                            includeNutrition: true,
                        },
                    }
                );

                if (!response.data) {
                    throw new Error("No data received from API");
                }

                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
                setError(
                    error.response?.data?.message ||
                    "Failed to load recipe details. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    // Tiesiogiai patikriname, ar recipeId yra apibrėžtas
    if (!recipeId) {
        return null;
    }

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Loading...</h2>
                        <button onClick={onClose} className="text-2xl">&times;</button>
                    </div>
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                        <p className="mt-4 text-lg">Loading recipe details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-red-500">Error</h2>
                        <button onClick={onClose} className="text-2xl">&times;</button>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="text-center mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">No Recipe Data</h2>
                        <button onClick={onClose} className="text-2xl">&times;</button>
                    </div>
                    <p>Unable to load recipe information.</p>
                    <div className="text-center mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Saugus ištraukimas maistinių medžiagų informacijos
    const calories = recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0;
    const protein = recipe.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 0;
    const carbs = recipe.nutrition?.nutrients?.find(n => n.name === "Carbohydrates")?.amount || 0;
    const fat = recipe.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || 0;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-purple-600">{recipe.title}</h2>
                    <button onClick={onClose} className="text-2xl">&times;</button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    {recipe.image && (
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full md:w-1/3 rounded-lg object-cover"
                        />
                    )}

                    <div className="flex-1">
                        <div className="mb-4">
                            <p><span className="font-semibold">Ready in:</span> {recipe.readyInMinutes} minutes</p>
                            <p><span className="font-semibold">Servings:</span> {recipe.servings}</p>
                            {recipe.diets && recipe.diets.length > 0 && (
                                <p><span className="font-semibold">Diet:</span> {recipe.diets.join(", ")}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-2 bg-gray-100 p-3 rounded-lg">
                            <div className="text-center">
                                <p className="text-lg font-bold text-purple-600">{Math.round(calories)}</p>
                                <p className="text-sm text-gray-600">Calories</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-purple-600">{Math.round(protein)}g</p>
                                <p className="text-sm text-gray-600">Protein</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-purple-600">{Math.round(carbs)}g</p>
                                <p className="text-sm text-gray-600">Carbs</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-purple-600">{Math.round(fat)}g</p>
                                <p className="text-sm text-gray-600">Fat</p>
                            </div>
                        </div>
                    </div>
                </div>

                {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-purple-600 border-b border-purple-300 pb-2 mb-3">
                            Ingredients
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <li key={`${ingredient.id || index}`} className="bg-gray-50 p-2 rounded flex items-center">
                                    <span className="w-4 h-4 bg-purple-200 rounded-full mr-2"></span>
                                    <span className="text-purple-600">{ingredient.original}</span>

                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps && (
                    <div>
                        <h3 className="text-xl font-semibold text-purple-600 border-b border-purple-300 pb-2 mb-3">
                            Instructions
                        </h3>
                        <ol className="ml-4">
                            {recipe.analyzedInstructions[0].steps.map((step) => (
                                <li key={step.number} className="mb-3 p-3 bg-gray-50 rounded">
                  <span className="inline-block w-6 h-6 bg-purple-600 text-white rounded-full text-center mr-2">
                    {step.number}
                  </span>
                                    <span className="text-purple-600">{step.step}</span>

                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {recipe.summary && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-purple-600 border-b border-purple-300 pb-2 mb-3">
                            Summary
                        </h3>
                        <div
                            className="prose max-w-none text-purple-600"
                            dangerouslySetInnerHTML={{ __html: recipe.summary }}
                        />
                    </div>
                )}

                <div className="text-center mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;