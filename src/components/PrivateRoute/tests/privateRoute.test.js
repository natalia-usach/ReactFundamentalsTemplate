import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { render } from '@testing-library/react';

import { PrivateRoute } from '../PrivateRoute';

jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	Navigate: jest.fn(() => null),
}));

describe('<PrivateRoute />', () => {
	test('renders children for admin users', () => {
		useSelector.mockImplementation(() => 'admin');
		const { getByText } = render(
			<PrivateRoute>
				<div>Admin Content</div>
			</PrivateRoute>
		);

		expect(getByText('Admin Content')).toBeInTheDocument();
		expect(Navigate).not.toHaveBeenCalled();
	});

	test('renders <Navigate to="/courses"> for non-admin users', () => {
		useSelector.mockImplementation(() => 'user');
		render(<PrivateRoute />);
		expect(Navigate).toHaveBeenCalledWith({ to: '/courses' }, {});
	});
});
