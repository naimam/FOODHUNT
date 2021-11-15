/* eslint-disable*/
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('search for recipe', () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: /Search/i });
  expect(searchButton).toBeInTheDocument();
  fireEvent.click(searchButton);
  const recipeInput = screen.getByTestId("recipe-input");
  expect(recipeInput).toBeInTheDocument();
  fireEvent.change(recipeInput, { target: { value: 'chicken' } });
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);
  expect(screen.getByText(/chicken/i)).toBeInTheDocument();


});

test('search for restaurant', () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: /Search/i });
  expect(searchButton).toBeInTheDocument();
  fireEvent.click(searchButton);
  const restaurantButton = screen.getByRole('button', { name: /Restaurant/i });
  expect(restaurantButton).toBeInTheDocument();
  fireEvent.click(restaurantButton);
  const zipcodeInput = screen.getByTestId("zipcode-input");
  const restaurantInput = screen.getByTestId("restaurant-input");
  fireEvent.change(zipcodeInput, { target: { value: '30021' } });
  fireEvent.change(restaurantInput, { target: { value: 'chicken' } });
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);
  expect(screen.getByText(/chicken near 30021/i)).toBeInTheDocument();


});

