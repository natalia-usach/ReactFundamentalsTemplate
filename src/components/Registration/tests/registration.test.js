import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';

import { Registration } from '../Registration';

jest.mock('../../../services', () => ({
	createUser: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup);

describe('Registration', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render the Registration component', () => {
		const { container } = render(
			<BrowserRouter>
				<Registration />
			</BrowserRouter>
		);
		expect(container).toBeInTheDocument();
	});

	it('should display validation errors on form submit with empty inputs', async () => {
		const { container } = render(
			<BrowserRouter>
				<Registration />
			</BrowserRouter>
		);
		const button = screen.getByText('REGISTRATION');
		fireEvent.click(button);

		await waitFor(() => {
			expect(container.querySelectorAll('p.invalid').length).toEqual(3);
		});
	});
});
