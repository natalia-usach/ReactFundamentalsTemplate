import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { CourseInfo } from '../CourseInfo';

const mockCourse = {
	id: '1',
	title: 'Test Course 1',
	description: 'This is a test course',
	duration: 120,
	creationDate: '2020-10-30',
	authors: ['1', '2'],
};

const mockAuthors = [
	{ id: '1', name: 'Author 1' },
	{ id: '2', name: 'Author 2' },
];

const mockedState = {
	user: {
		isAuth: true,
		name: 'test',
		email: 'test@mail.com',
		token: 'test token',
		role: 'admin',
	},
	courses: [mockCourse],
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

jest.mock('../../../store/selectors', () => {
	return {
		coursesSelector: () => [mockCourse],
		authorsSelector: () => mockAuthors,
		userRoleSelector: () => 'admin',
	};
});

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({ courseId: '1' }),
}));

describe('CourseInfo', () => {
	test('displays course title, ID, duration, and author names', () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseInfo />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText(mockCourse.id)).toBeInTheDocument();
		expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
		expect(screen.getByText('02:00 hours')).toBeInTheDocument();
		mockAuthors.forEach((author) => {
			expect(screen.getByText(author.name)).toBeInTheDocument();
		});
	});

	test('displays the Back button', () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseInfo />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText('Back')).toBeInTheDocument();
	});
});
