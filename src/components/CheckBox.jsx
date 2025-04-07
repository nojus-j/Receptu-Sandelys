import React from "react";

const FilterRecipeCheckbox = ({ checkboxFilters, setCheckboxFilters }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === "vegan" || name === "vegetarian") {
      setCheckboxFilters((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setCheckboxFilters((prev) => ({
        ...prev,
        mealType: checked
          ? [...prev.mealType, name]
          : prev.mealType.filter((item) => item !== name),
      }));
    }
  };

  return (
    <div className="filter-container text-center">
      <h2 className="filter-title purple-text mb-2">Meal & Diet Filters</h2>

      <div className="flex justify-center gap-6 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="vegan"
            checked={checkboxFilters.vegan}
            onChange={handleCheckboxChange}
          />
          Vegan
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="vegetarian"
            checked={checkboxFilters.vegetarian}
            onChange={handleCheckboxChange}
          />
          Vegetarian
        </label>
      </div>

      <h3 className="text-purple-500 text-sm mb-2">Meal Type</h3>

      <div className="flex flex-wrap justify-center gap-4">
        {["breakfast", "main course", "snack", "appetizer"].map((type) => (
          <label key={type} className="flex items-center gap-1">
            <input
              type="checkbox"
              name={type}
              checked={checkboxFilters.mealType.includes(type)}
              onChange={handleCheckboxChange}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterRecipeCheckbox;
