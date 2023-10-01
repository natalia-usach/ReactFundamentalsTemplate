import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { CourseForm } from '../CourseForm';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({ courseId: 'course-1' }),
}));

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
		{
			id: 'course-1',
			title: 'React course',
			description: 'Learn React',
			duration: 50,
			authors: [],
		},
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

const renderWithProviders = (component) =>
	render(
		<Provider store={mockedStore}>
			<MemoryRouter>{component}</MemoryRouter>
		</Provider>
	);

describe('CourseForm component', () => {
	test('renders form fields', () => {
		renderWithProviders(<CourseForm />);
		const titleInput = screen.getByTestId('titleInput');
		const descriptionTextArea = screen.getByTestId('descriptionTextArea');
		const durationInput = screen.getByTestId('durationInput');
		const createCourseButton = screen.getByTestId('createCourseButton');

		expect(titleInput).toBeInTheDocument();
		expect(descriptionTextArea).toBeInTheDocument();
		expect(durationInput).toBeInTheDocument();
		expect(createCourseButton).toBeInTheDocument();
	});

	test('renders form fields with correct values when editing course', () => {
		const editableCourse = {
			id: 'course-1',
			title: 'React course',
			description: 'Learn React',
			duration: 50,
			authors: [],
		};
		renderWithProviders(<CourseForm editableCourse={editableCourse} />);

		const titleInput = screen.getByTestId('titleInput');
		const descriptionTextArea = screen.getByTestId('descriptionTextArea');
		const durationInput = screen.getByTestId('durationInput');

		expect(titleInput.value).toBe('React course');
		expect(descriptionTextArea.value).toBe('Learn React');
		expect(durationInput.value).toBe('50');
	});

	test('handles title input value change', () => {
		renderWithProviders(<CourseForm />);

		const titleInput = screen.getByTestId('titleInput');
		fireEvent.change(titleInput, { target: { value: 'New course' } });

		expect(titleInput.value).toBe('New course');
	});

	test('handles description text area value change', () => {
		renderWithProviders(<CourseForm />);

		const descriptionTextArea = screen.getByTestId('descriptionTextArea');
		fireEvent.change(descriptionTextArea, {
			target: { value: 'New description' },
		});

		expect(descriptionTextArea.value).toBe('New description');
	});

	test('handles duration input value change, displaying only numbers', () => {
		renderWithProviders(<CourseForm />);

		const durationInput = screen.getByTestId('durationInput');
		fireEvent.change(durationInput, { target: { value: '4a5b6c7' } });

		expect(durationInput.value).toBe('4567');
	});
});
