// courses.test.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { Courses } from '../Courses';

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

const renderWithReduxRouter = (ui) => {
	return render(
		<Provider store={mockedStore}>
			<BrowserRouter>{ui}</BrowserRouter>
		</Provider>
	);
};

jest.mock('../../../store/selectors', () => {
	return {
		coursesSelector: () => [
			{ title: 'Test Course 1', id: '1', authors: ['1', '2'] },
			{ title: 'Test Course 2', id: '2', authors: ['1', '2'] },
		],
		authorsSelector: () => [
			{ id: '1', name: 'Author 1' },
			{ id: '2', name: 'Author 2' },
		],
		userRoleSelector: () => 'admin',
	};
});

describe('Courses component', () => {
	test('renders courses correctly', () => {
		renderWithReduxRouter(<Courses />);

		screen.getByText('Test Course 1');
		screen.getByText('Test Course 2');
	});

	test('shows add new course button', () => {
		renderWithReduxRouter(<Courses />);
		screen.getByText('ADD NEW COURSE');
	});

	test('filters courses by search', () => {
		renderWithReduxRouter(<Courses />);

		const searchBar = screen.getByPlaceholderText('input text');
		fireEvent.change(searchBar, { target: { value: '2' } });

		const searchButton = screen.getByText(/search/i);
		fireEvent.click(searchButton);

		expect(screen.queryByText('Test Course 1')).not.toBeInTheDocument();
		screen.getByText('Test Course 2');
	});
});
