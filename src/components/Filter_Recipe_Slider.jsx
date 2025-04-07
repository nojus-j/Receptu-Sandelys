import React from "react";
import { Range } from "react-range";

const FilterRecipeSlider = ({ sliderValues, onSliderChange }) => {
  const minValues = { carbs: 10, protein: 10, calories: 50, fat: 1 };
  const maxValues = { carbs: 100, protein: 100, calories: 800, fat: 100 };

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filters</h2>
      {Object.keys(sliderValues).map((key) => (
        <div key={key} className="filter-group mb-6">
          <label className="filter-label font-semibold">{key.toUpperCase()}</label>

          <Range
            step={1}
            min={minValues[key]}
            max={maxValues[key]}
            values={sliderValues[key]}
            onChange={(values) => onSliderChange(key, values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-[250px] bg-gray-300 rounded-md mx-auto my-2"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-4 w-4 bg-blue-500 rounded-full shadow-md"
              />
            )}
          />

          <p className="filter-values text-sm text-center mt-1">
            {sliderValues[key][0]} - {sliderValues[key][1]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FilterRecipeSlider;