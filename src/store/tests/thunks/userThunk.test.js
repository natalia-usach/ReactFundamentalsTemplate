import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getCurrentUser, logout } from '../../../services';
import { removeUserData, setUserData } from '../../../store/slices/userSlice';
import { getUserThunk, logoutThunk } from '../../../store/thunks/userThunk';

// Mock the services
jest.mock('../../../services', () => ({
	getCurrentUser: jest.fn(),
	logout: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('userThunk', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test('should get user data', async () => {
		getCurrentUser.mockResolvedValue({
			result: {
				name: 'John Doe',
				email: 'john.doe@example.com',
				role: 'user',
			},
		});
		localStorage.setItem('token', 'test_token');

		const store = mockStore({});

		await store.dispatch(getUserThunk());

		const expectedActions = [
			setUserData({
				name: 'John Doe',
				email: 'john.doe@example.com',
				token: 'test_token',
				role: 'user',
			}),
		];

		expect(store.getActions()).toEqual(expectedActions);
	});

	test('should handle errors while getting user data', async () => {
		getCurrentUser.mockRejectedValue('Failed to get user details');

		const store = mockStore({});

		try {
			await store.dispatch(getUserThunk());
		} catch (error) {
			expect(error).toEqual(new Error('Failed to get user details'));
		}
	});

	test('should logout user', async () => {
		logout.mockResolvedValue(true);

		const store = mockStore({});

		await store.dispatch(logoutThunk());

		const expectedActions = [removeUserData()];

		expect(store.getActions()).toEqual(expectedActions);
	});

	test('should handle errors while logging out', async () => {
		logout.mockRejectedValue('Failed to log out');

		const store = mockStore({});

		try {
			await store.dispatch(logoutThunk());
		} catch (error) {
			expect(error).toEqual(new Error('Failed to log out'));
		}
	});
});
