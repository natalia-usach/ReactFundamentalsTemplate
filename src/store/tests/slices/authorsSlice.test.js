import { configureStore } from '@reduxjs/toolkit';

import authorsReducer, {
	saveAuthor,
	setAuthors,
} from '../../slices/authorsSlice';

// Create a store with authorsReducer
const store = configureStore({
	reducer: {
		authors: authorsReducer,
	},
});

describe('authors slice', () => {
	test('should handle initial state', () => {
		const authors = store.getState().authors;
		expect(authors).toEqual([]);
	});

	test('should set authors', () => {
		const authorsData = [
			{ id: 1, name: 'Author 1' },
			{ id: 2, name: 'Author 2' },
		];

		// Dispatch the setAuthors action with payload
		store.dispatch(setAuthors(authorsData));

		// Check if the state has updated
		const authors = store.getState().authors;
		expect(authors).toEqual(authorsData);
	});

	test('should save author', () => {
		const newAuthor = { id: 3, name: 'Author 3' };

		// Dispatch the saveAuthor action with payload
		store.dispatch(saveAuthor(newAuthor));

		// Check if the state has updated
		const authors = store.getState().authors;
		expect(authors).toContainEqual(newAuthor);
	});
});
