import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { EmptyCourseList } from '../EmptyCourseList';

jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('EmptyCourseList', () => {
	const navigateMock = jest.fn();
	useNavigate.mockImplementation(() => navigateMock);

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders empty course list with add new course button for admin user', () => {
		useSelector.mockImplementation(() => 'admin');
		render(<EmptyCourseList />);

		expect(screen.getByText('Your List Is Empty')).toBeInTheDocument();
		expect(screen.getByTestId('addCourse')).toBeInTheDocument();
		expect(
			screen.queryByText(
				"You don't have permissions to create a course. Please log in as ADMIN"
			)
		).toBeNull();
	});

	test('renders empty course list without add new course button for non-admin user', () => {
		useSelector.mockImplementation(() => 'non-admin');
		render(<EmptyCourseList />);

		expect(screen.getByText('Your List Is Empty')).toBeInTheDocument();
		expect(screen.queryByTestId('addCourse')).toBeNull();
		expect(
			screen.getByText(
				"You don't have permissions to create a course. Please log in as ADMIN"
			)
		).toBeInTheDocument();
	});
});
