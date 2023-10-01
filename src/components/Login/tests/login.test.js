import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Login } from '../Login';

const mockedState = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const renderWithRouterAndRedux = (component) => {
	return {
		...render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			</Provider>
		),
	};
};

describe('Login Component', () => {
	it('renders Login component', () => {
		const { getByText } = renderWithRouterAndRedux();

		expect(getByText('Login')).toBeInTheDocument();
	});

	it('renders email input', () => {
		const { getByLabelText } = renderWithRouterAndRedux();

		expect(getByLabelText('Email')).toBeInTheDocument();
	});

	it('renders password input', () => {
		const { getByLabelText } = renderWithRouterAndRedux();

		expect(getByLabelText('Password')).toBeInTheDocument();
	});

	it('handles email and password input changes', () => {
		const { getByLabelText } = renderWithRouterAndRedux();
		const emailInput = getByLabelText('Email');
		const passwordInput = getByLabelText('Password');

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

		expect(emailInput.value).toBe('test@example.com');
		expect(passwordInput.value).toBe('testPassword');
	});

	it('submits the form with email and password without errors', async () => {
		const setResponseError = jest.fn();

		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Login setError={setResponseError} />
				</BrowserRouter>
			</Provider>
		);

		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Password');
		const button = screen.getByText('LOGIN');

		userEvent.type(emailInput, 'test@example.com');
		userEvent.type(passwordInput, 'testPassword');
		userEvent.click(button);

		expect(setResponseError).not.toHaveBeenCalled();
	});
});
