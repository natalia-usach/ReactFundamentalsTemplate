import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { AuthorItem } from '../AuthorItem';

describe('AuthorItem', () => {
	const defaultProps = {
		name: 'John Doe',
		onAddAuthor: jest.fn(),
		onDeleteAuthor: jest.fn(),
		forCourse: false,
	};

	test('renders author name correctly', () => {
		const { getByText } = render(<AuthorItem {...defaultProps} />);

		expect(getByText('John Doe')).toBeInTheDocument();
	});

	test('renders add button when forCourse is false', () => {
		const { getByTestId } = render(
			<AuthorItem {...defaultProps} forCourse={false} />
		);
		expect(getByTestId('addAuthor')).toBeInTheDocument();
	});

	test('renders delete button when forCourse is true', () => {
		const { queryByTestId, getAllByText } = render(
			<AuthorItem {...defaultProps} forCourse={true} />
		);

		expect(queryByTestId('addAuthor')).toBeNull();

		expect(getAllByText('Delete').length).toBeGreaterThan(0);
	});

	test('calls onAddAuthor when add button is clicked', () => {
		const onAddAuthor = jest.fn();
		const { getByTestId } = render(
			<AuthorItem {...defaultProps} onAddAuthor={onAddAuthor} />
		);
		fireEvent.click(getByTestId('addAuthor'));
		expect(onAddAuthor).toHaveBeenCalledTimes(1);
	});

	test('calls onDeleteAuthor when delete button is clicked', () => {
		const onDeleteAuthor = jest.fn();
		const { getAllByText } = render(
			<AuthorItem
				{...defaultProps}
				onDeleteAuthor={onDeleteAuthor}
				forCourse={true}
			/>
		);
		const btn = getAllByText('Delete')[0];
		fireEvent.click(btn);

		expect(onDeleteAuthor).toHaveBeenCalledTimes(1);
	});
});
