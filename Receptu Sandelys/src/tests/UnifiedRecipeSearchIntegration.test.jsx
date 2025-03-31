import React from 'react';
import '@testing-library/jest-dom'; // for toBeInTheDocument and toHaveClass
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import UnifiedRecipeSearch from '../components/UnifiedRecipeSearch';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios'); // axios mock, so no API calls are actually made

const UnifiedRecipeSearchDriver = {
  render: () => render(<UnifiedRecipeSearch />), // renders the UnifidRecipeSearch component
  getSearchInput: () => // finds the seached element by its placeholder text
    screen.getByPlaceholderText("Enter ingredients (e.g., chicken, tomato, cheese)"),
  getSearchButton: () => //returns search button
    screen.getByRole("button", { name: /find recipes/i }),
};

describe('UnifiedReciSearch integrpeation tests', () => {
  beforeAll(() => { // runs before all of the tests
    console.log('Starting UnifiedRecipeSearch integration tests');
  });

  afterEach(() => { // runs after each test
    cleanup(); // removes any rendered components
    vi.clearAllMocks(); // clears all mocks
  });
  afterAll(() => { // runs after all tests are completed
    console.log('Completed UnifiedRecipeSearch integration tests');
  });

  test('Integration Test 1: Displays recipes when API returns results', async () => {
    const fakeRecipes = [ // fake API response with sample recipes
      { id: 1, title: "Recipe one", image: "image1.jpg" },
      { id: 2, title: "Recipe two", image: "image2.jpg" },
    ];
    axios.get.mockResolvedValue({ data: { results: fakeRecipes } }); // puting mock values that should be renturned when the button is clicked
    UnifiedRecipeSearchDriver.render();
    const searchInput = UnifiedRecipeSearchDriver.getSearchInput();
    fireEvent.change(searchInput, { target: { value: "chicken" } }); // simulate writing chicken into search bar ( what is written doesnt matter)
    const searchButton = UnifiedRecipeSearchDriver.getSearchButton();
    fireEvent.click(searchButton);// simulate a click from the button
    await waitFor(() => { // wait for the mock recipes to be displayed on the screen
      expect(screen.getByText("Recipe one")).toBeInTheDocument();
      expect(screen.getByText("Recipe two")).toBeInTheDocument();
    });
  });

  test('Integration Test 2: Displays "No recipes found." when API returns empty results', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } }); // putting noting in the return when the button is clicked
    UnifiedRecipeSearchDriver.render();
    const searchInput = UnifiedRecipeSearchDriver.getSearchInput();
    fireEvent.change(searchInput, { target: { value: "nonexistent" } }); // simulate writing nonexistent into search bar
    const searchButton = UnifiedRecipeSearchDriver.getSearchButton();
    fireEvent.click(searchButton); // simulate a click from the button
    await waitFor(() => { // wait for the "No recipes found" message to appear on the screen
      expect(screen.getByText("No recipes found.")).toBeInTheDocument();
    });
  });
});