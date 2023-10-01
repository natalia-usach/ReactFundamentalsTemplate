import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { CourseCard } from '../CourseCard';

const mockCourse = {
	id: '1',
	title: 'Test Course',
	description: 'test description',
	authors: ['1', '2'],
	duration: 60,
	creationDate: '2021-09-19',
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
	courses: [],
	authors: mockAuthors,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const renderWithProviders = (component) => {
	return render(
		<Provider store={mockedStore}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>
	);
};

describe('<CourseCard />', () => {
	test('renders course information', () => {
		renderWithProviders(<CourseCard course={mockCourse} />);

		expect(screen.getByTestId('courseCard')).toBeInTheDocument();
		expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
		expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
	});

	test('shows author names and details', () => {
		renderWithProviders(<CourseCard course={mockCourse} />);

		expect(
			screen.getByText(`${mockAuthors.map((author) => author.name).join(', ')}`)
		).toBeInTheDocument();
		expect(screen.getByText(/duration/i)).toBeInTheDocument();
		expect(screen.getByText(/created/i)).toBeInTheDocument();
	});

	test('displays buttons for admin role', () => {
		renderWithProviders(<CourseCard course={mockCourse} />);

		expect(screen.getByText('SHOW COURSE')).toBeInTheDocument();
		expect(screen.getByText('DELETE')).toBeInTheDocument();
		expect(screen.getByText('UPDATE')).toBeInTheDocument();
	});

	test('triggers onDeleteCourse when delete button is clicked', () => {
		const deleteCourseSpy = jest.spyOn(mockedStore, 'dispatch');

		renderWithProviders(<CourseCard course={mockCourse} />);

		fireEvent.click(screen.getByTestId('deleteCourse'));
		expect(deleteCourseSpy).toHaveBeenCalled();
	});
});
