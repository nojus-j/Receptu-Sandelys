import React from 'react';
import '@testing-library/jest-dom'; // for toBeInTheDocument and toHaveClass
import { render, cleanup } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { vi } from 'vitest';

const SidebarDriver = { // creates Sidebar driver when called
  render: () => render(<Sidebar />),// renders the sidebar, to get information from
  getAside: (container) => container.querySelector('aside'), // gets aside element
  getHeading: (container) => container.querySelector('h2'), //gets h2 element
};

describe('Sidebar component unit tests', () => {
  beforeAll(() => { //runs once before all tests
    console.log('Starting Sidebar Component Tests');
  });

  afterEach(() => { // runs after each test
    cleanup(); // removes any rendered components
    vi.clearAllMocks();// clears all mocks created in the test
  });

  afterAll(() => { // runs after all tests
    console.log('Completed sidebar component tests');
  });

  test('Test 1: Renders without errors', () => {
    const { container } = SidebarDriver.render();
    expect(SidebarDriver.getAside(container)).toBeInTheDocument();// checks if the aside element exists in the document
    expect(SidebarDriver.getHeading(container)).toBeInTheDocument(); // cheks if the h2 element is in the document
});

  test('Test 2: aside element has the correct classes', () => {
    const { container } = SidebarDriver.render();
    const aside = SidebarDriver.getAside(container);
    //verifies that the aside element has the correct classes
    expect(aside).toHaveClass('w-64');
    expect(aside).toHaveClass('bg-gray-500');
    expect(aside).toHaveClass('p-4');
  });

  test('Test 3: h2 element has text "Sidebar" and correct css classes', () => {
    const { container } = SidebarDriver.render();
    const heading = SidebarDriver.getHeading(container);
    // check that the heading exists and has the correct text and classes
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Sidebar');
    expect(heading).toHaveClass('text-xl');
    expect(heading).toHaveClass('text-black');
    expect(heading).toHaveClass('font-bold');
  });

  test('Test 4: Matches the snapshot', () => {
    const { container } = SidebarDriver.render();
    expect(container).toMatchSnapshot(); // checks if the current snapshot matches and earlier snapshot (if there are any changes made in the component) it there are changes, that means it could ruin other tests too
  });

  test.each([
    ['w-64'],
    ['bg-gray-500'],
    ['p-4']
  ])('Test 5: aside element should include the class "%s"', (className) => {
    const { container } = SidebarDriver.render();
    const aside = SidebarDriver.getAside(container);
    expect(aside).toHaveClass(className); // check if provided from parameters class is in aside element
  });

  test.each([
    ['text-xl'],
    ['text-black'],
    ['font-bold']
  ])('Test 6: h2 element should include the class "%s"', (className) => {
    const { container } = SidebarDriver.render();
    const heading = SidebarDriver.getHeading(container);
    expect(heading).toHaveClass(className);// check if provided from parameters class is in aside element
  });

  test('Test 7: A stub function returns a fixed output regardless of input', () => { // only testing and chekcing how stub function works
    const stubTransform = (text) => "Stubbed sidebar"; // stub function that always returns text Stubed Sidebar
    const { container } = SidebarDriver.render();
    const heading = SidebarDriver.getHeading(container);   
    const transformedText = stubTransform(heading.textContent); // calling stub function with the heading text
    expect(transformedText).toBe("Stubbed sidebar"); // check if stub function returned Stubbed Sidebar not the heading text
  });

  test('Test 8: A mock function transforms heading text to uppercase', () => {
    const mockTransform = vi.fn((text) => text.toUpperCase()); // mock function that changes given text into same text but all letters are uppercase
    const { container } = SidebarDriver.render();
    const heading = SidebarDriver.getHeading(container);
    const transformedText = mockTransform(heading.textContent);
    expect(transformedText).toBe("SIDEBAR"); // check if the mock function returned same text but uppercase
  });
});