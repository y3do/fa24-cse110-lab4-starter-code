import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test("sanity check", () => {
  render(<App />);

  expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
  expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Cost")).toBeInTheDocument();
  expect(screen.getByText("Save")).toBeInTheDocument();
  expect(screen.getByText("Expenses")).toBeInTheDocument();
  expect(screen.getByText("Add Expense")).toBeInTheDocument();
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Cost")).toBeInTheDocument();
  expect(screen.getByText("Save")).toBeInTheDocument();

});

test("1: creates new expense, updates total spent & remaining", () => {
  render(<App />);

  // name cost save
  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByText("Save");


  fireEvent.change(nameInput, { target: { value: "Pizza" } });
  fireEvent.change(costInput, { target: { value: "30" } });

  fireEvent.click(saveButton);

  expect(screen.getByText("Pizza")).toBeInTheDocument();
  expect(screen.getByText("$30")).toBeInTheDocument();

  expect(screen.getByText("Spent so far: $30")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $970")).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: "UFO" } });
  fireEvent.change(costInput, { target: { value: "99999999" } });

  fireEvent.click(saveButton);

  expect(screen.getByText("UFO")).toBeInTheDocument();
  expect(screen.getByText("$99999999")).toBeInTheDocument();

  expect(screen.getByText("Spent so far: $100000029")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $-99999029")).toBeInTheDocument();


});

test("2: delete expense updates total spent and remaining", () => {
  render(<App />);

  // name cost save
  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByText("Save");


  fireEvent.change(nameInput, { target: { value: "Pizza" } });
  fireEvent.change(costInput, { target: { value: "30" } });

  fireEvent.click(saveButton);

  expect(screen.getByText("Pizza")).toBeInTheDocument();
  expect(screen.getByText("$30")).toBeInTheDocument();

  expect(screen.getByText("Spent so far: $30")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $970")).toBeInTheDocument();

  fireEvent.click(screen.getByText("x"));

  expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
  expect(screen.queryByText("$30")).not.toBeInTheDocument();

  expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: "UFO" } });
  fireEvent.change(costInput, { target: { value: "99999999" } });

  fireEvent.click(saveButton);

  expect(screen.getByText("UFO")).toBeInTheDocument();
  expect(screen.getByText("$99999999")).toBeInTheDocument();

  expect(screen.getByText("Spent so far: $99999999")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $-99998999")).toBeInTheDocument();

  fireEvent.click(screen.getByText("x"));

  expect(screen.queryByText("UFO")).not.toBeInTheDocument();
  expect(screen.queryByText("$99999999")).not.toBeInTheDocument();

  expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();

});


test("3:  Budget = Remaining Balance + Total Expenditure true after ops", () => {
  render(<App />);

  const budget = 1000 // show this is true for ops
  let balance = 1000
  let expense = 0

  // name cost save
  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByText("Save");


  fireEvent.change(nameInput, { target: { value: "Pizza" } });
  fireEvent.change(costInput, { target: { value: "30" } });

  fireEvent.click(saveButton);

  expect(screen.getByText("Pizza")).toBeInTheDocument();
  expect(screen.getByText("$30")).toBeInTheDocument();

  expect(screen.getByText("Spent so far: $30")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $970")).toBeInTheDocument();


  // Test the equation

  balance -= 30
  expense += 30

  expect(budget).toBe(balance + expense);

  fireEvent.click(screen.getByText("x"));

  expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
  expect(screen.queryByText("$30")).not.toBeInTheDocument();

  expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();

  // Check equation again
  balance += 30
  expense -= 30

  expect(budget).toBe(balance + expense);

  fireEvent.change(nameInput, { target: { value: "UFO" } });
  fireEvent.change(costInput, { target: { value: "99999999" } });

  fireEvent.click(saveButton);

  expect(screen.getByText("UFO")).toBeInTheDocument();
  expect(screen.getByText("$99999999")).toBeInTheDocument();

  expect(screen.getByText("Spent so far: $99999999")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $-99998999")).toBeInTheDocument();


  // final equation check
  balance -= 99999999
  expense += 99999999

  expect(budget).toBe(balance + expense);



  


});