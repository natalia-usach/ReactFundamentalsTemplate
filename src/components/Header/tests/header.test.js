import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: 'test@mail.com',
		token: 'Test token',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

const renderWithReduxAndRouter = () => {
	return render(
		<Provider store={mockedStore}>
			<MemoryRouter>
				<Header></Header>
			</MemoryRouter>
		</Provider>
	);
};

describe('Header component tests', () => {
	test('Header renders Logo component', () => {
		renderWithReduxAndRouter();
		const logo = screen.getByAltText('logo');

		expect(logo).toBeInTheDocument();
	});

	test('User is authorized, renders user name and Logout button', () => {
		localStorage.setItem('token', 'fake-token');
		renderWithReduxAndRouter();
		const userName = screen.getByText('Test Name');
		const logoutButton = screen.getByText('LOGOUT');

		expect(userName).toBeInTheDocument();
		expect(logoutButton).toBeInTheDocument();
	});

	test('On logout button click, removes token from localStorage and navigates to /login', () => {
		renderWithReduxAndRouter();
		const logoutButton = screen.getByText('LOGOUT');
		fireEvent.click(logoutButton);

		expect(localStorage.getItem('token')).toBeNull();
		expect(mockedUsedNavigate).toBeCalledWith('/login');
	});

	test('User is not authorized, does not render user info and Logout button', () => {
		renderWithReduxAndRouter();
		const userName = screen.queryByText('Test Name');
		const logoutButton = screen.queryByText('LOGOUT');
		expect(userName).not.toBeInTheDocument();
		expect(logoutButton).not.toBeInTheDocument();
	});
});
