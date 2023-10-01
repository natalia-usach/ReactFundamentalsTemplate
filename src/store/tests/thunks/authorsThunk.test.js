import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { createAuthor, getAuthors } from '../../../services';
import { saveAuthor, setAuthors } from '../../../store/slices/authorsSlice';
import {
	createAuthorThunk,
	getAuthorsThunk,
} from '../../../store/thunks/authorsThunk';

// Mock the services
jest.mock('../../../services', () => ({
	createAuthor: jest.fn(),
	getAuthors: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('authorsActions', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test('should create a new author', async () => {
		const author = {
			id: '1',
			name: 'John Doe',
		};
		createAuthor.mockImplementation(() => Promise.resolve({ result: author }));

		const store = mockStore({ authors: [] });
		await store.dispatch(createAuthorThunk(author));

		const actions = store.getActions();
		expect(createAuthor).toHaveBeenCalledWith(author);
		expect(actions[0]).toEqual(saveAuthor(author));
	});

	test('should return an error for failed createAuthor', async () => {
		createAuthor.mockImplementation(() =>
			Promise.reject(new Error('Failed to create author'))
		);

		const store = mockStore({ authors: [] });
		await expect(store.dispatch(createAuthorThunk({}))).rejects.toThrow(
			'Failed to create author'
		);

		const actions = store.getActions();
		expect(actions).toEqual([]);
	});

	test('should get all authors', async () => {
		const authors = [
			{ id: '1', name: 'John Doe' },
			{ id: '2', name: 'Jane Doe' },
		];
		getAuthors.mockImplementation(() => Promise.resolve({ result: authors }));

		const store = mockStore({ authors: [] });
		await store.dispatch(getAuthorsThunk());

		const actions = store.getActions();
		expect(getAuthors).toHaveBeenCalled();
		expect(actions[0]).toEqual(setAuthors(authors));
	});
});
