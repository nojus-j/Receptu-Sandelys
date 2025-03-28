import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterRecipeSlider from "../components/Filter_Recipe_Slider";
import "@testing-library/jest-dom";

describe("FilterRecipeSlider component", () => {
  const mockSliderValues = {
    carbs: [10, 100],
    protein: [10, 100],
    calories: [50, 800],
    fat: [1, 100],
  };

  const mockChangeHandler = vi.fn();

  test("1. Renders all slider labels", () => {
    render(<FilterRecipeSlider sliderValues={mockSliderValues} onSliderChange={mockChangeHandler} />);
    expect(screen.getByText(/CARBS/i)).toBeInTheDocument();
    expect(screen.getByText(/PROTEIN/i)).toBeInTheDocument();
    expect(screen.getByText(/CALORIES/i)).toBeInTheDocument();
    expect(screen.getByText(/FAT/i)).toBeInTheDocument();
  });

  test("2. Displays initial slider values", () => {
    render(<FilterRecipeSlider sliderValues={mockSliderValues} onSliderChange={mockChangeHandler} />);
    
    expect(screen.getAllByText("10 - 100")[0]).toBeInTheDocument(); // carbs
    expect(screen.getAllByText("10 - 100")[1]).toBeInTheDocument(); // protein
    expect(screen.getByText("50 - 800")).toBeInTheDocument();       // calories
    expect(screen.getByText("1 - 100")).toBeInTheDocument();        // fat
  });

  test("3. Renders correct number of sliders", () => {
    render(<FilterRecipeSlider sliderValues={mockSliderValues} onSliderChange={mockChangeHandler} />);
    const sliders = screen.getAllByRole("slider");
    expect(sliders.length).toBe(8); // Each nutrient has 2 thumbs
  });

  test("4. Sliders are accessible via keyboard", () => {
    render(<FilterRecipeSlider sliderValues={mockSliderValues} onSliderChange={mockChangeHandler} />);
    const sliders = screen.getAllByRole("slider");
    sliders.forEach((slider) => {
      expect(slider).toHaveAttribute("tabindex");
    });
  });

  test("5. Component renders title heading correctly", () => {
    render(<FilterRecipeSlider sliderValues={mockSliderValues} onSliderChange={mockChangeHandler} />);
    expect(screen.getByRole("heading", { name: /filters/i, level: 2 })).toBeInTheDocument();
  });

  test("6. onSliderChange is called when slider is moved", () => {
    render(<FilterRecipeSlider sliderValues={mockSliderValues} onSliderChange={mockChangeHandler} />);
    const sliderThumbs = screen.getAllByRole("slider");

    fireEvent.keyDown(sliderThumbs[0], { key: "ArrowRight", code: "ArrowRight" });

    expect(mockChangeHandler).toHaveBeenCalled();
  });
});
