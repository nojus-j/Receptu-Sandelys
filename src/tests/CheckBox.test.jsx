import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "../components/CheckBox.jsx";
import "@testing-library/jest-dom";

describe("FilterRecipeCheckbox component", () => {
    const mockCheckboxFilters = {
        vegan: false,
        vegetarian: false,
        mealType: [],
    };

    const mockSetCheckboxFilters = vi.fn();

    test("1. Renders all checkboxes with correct labels", () => {
        render(
            <CheckBox checkboxFilters={mockCheckboxFilters} setCheckboxFilters={mockSetCheckboxFilters} />
        );

        expect(screen.getByLabelText(/vegan/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/vegetarian/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/breakfast/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/main course/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/snack/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/appetizer/i)).toBeInTheDocument();
    });

    test("2. Checkboxes can be checked and unchecked", () => {
        render(
            <CheckBox checkboxFilters={mockCheckboxFilters} setCheckboxFilters={mockSetCheckboxFilters} />
        );

        const veganCheckbox = screen.getByLabelText(/vegan/i);
        expect(veganCheckbox).not.toBeChecked();

        fireEvent.click(veganCheckbox);
        expect(mockSetCheckboxFilters).toHaveBeenCalledWith(expect.any(Function));
    });

    test("3. Meal type checkboxes trigger state updates", () => {
        render(
            <CheckBox checkboxFilters={mockCheckboxFilters} setCheckboxFilters={mockSetCheckboxFilters} />
        );

        const breakfastCheckbox = screen.getByLabelText(/breakfast/i);
        fireEvent.click(breakfastCheckbox);

        expect(mockSetCheckboxFilters).toHaveBeenCalledWith(expect.any(Function));
    });

    test("4. Title heading renders correctly", () => {
        render(
            <CheckBox checkboxFilters={mockCheckboxFilters} setCheckboxFilters={mockSetCheckboxFilters} />
        );

        expect(screen.getByRole("heading", { name: /meal & diet filters/i, level: 2 })).toBeInTheDocument();
    });

    test("5. Unchecking a meal type removes it from the list", () => {
        mockCheckboxFilters.mealType = ["breakfast", "snack"];

        render(
            <CheckBox checkboxFilters={mockCheckboxFilters} setCheckboxFilters={mockSetCheckboxFilters} />
        );

        const snackCheckbox = screen.getByLabelText(/snack/i);
        fireEvent.click(snackCheckbox);

        expect(mockSetCheckboxFilters).toHaveBeenCalledWith(expect.any(Function));
    });

});
