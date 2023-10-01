import React from 'react';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import { CreateAuthor } from '../CreateAuhtor';

describe('CreateAuthor', () => {
	const mockedState = {
		user: {
			isAuth: true,
			name: 'test',
			email: 'test@mail.com',
			token: 'test token',
			role: 'admin',
		},
		courses: [
			{ title: 'Test Course 1', id: '1' },
			{ title: 'Test Course 2', id: '2' },
		],
		authors: [
			{ id: '1', name: 'Author 1' },
			{ id: '2', name: 'Author 2' },
		],
	};

	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<CreateAuthor />
			</Provider>
		);
	});

	test('should display input and button elements', () => {
		const inputElement = screen.getByTestId('createAuthorInput');
		const buttonElement = screen.getByTestId('createAuthorButton');

		expect(inputElement).toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
	});

	test('should update input value on change', () => {
		const inputElement = screen.getByTestId('createAuthorInput');

		fireEvent.change(inputElement, { target: { value: 'John Doe' } });

		expect(inputElement.value).toBe('John Doe');
	});

	test('should display an error message when author name is less than 2 characters', () => {
		const inputElement = screen.getByTestId('createAuthorInput');
		const buttonElement = screen.getByTestId('createAuthorButton');

		fireEvent.change(inputElement, { target: { value: 'J' } });
		fireEvent.click(buttonElement);

		const errorMessage = screen.getByText(
			/should be at least 2 characters long/i
		);

		expect(errorMessage).toBeInTheDocument();
	});

	test('should call createAuthorThunk when input value is valid', () => {
		const inputElement = screen.getByTestId('createAuthorInput');
		const buttonElement = screen.getByTestId('createAuthorButton');

		fireEvent.change(inputElement, { target: { value: 'John Doe' } });
		fireEvent.click(buttonElement);

		expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
	});

	test('should clear the input value and error message after calling createAuthorThunk', () => {
		const inputElement = screen.getByTestId('createAuthorInput');
		const buttonElement = screen.getByTestId('createAuthorButton');

		fireEvent.change(inputElement, { target: { value: 'John Doe' } });
		fireEvent.click(buttonElement);

		expect(inputElement.value).toBe('');
		expect(
			screen.queryByText(/should be at least 2 characters long/i)
		).toBeNull();
	});
});
