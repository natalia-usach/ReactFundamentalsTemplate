import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';

import { userSlice } from '../../slices/userSlice';

const store = configureStore({ reducer: { user: userSlice.reducer } });

const initialState = {
	isAuth: !!localStorage.getItem('token'),
	name: '',
	email: '',
	token: localStorage.getItem('token') || '',
	role: '',
};

describe('userSlice', () => {
	beforeEach(() => {
		jest.spyOn(global.localStorage.__proto__, 'getItem');
		store.dispatch({ type: 'RESET' });
	});

	afterEach(() => {
		localStorage.getItem.mockRestore();
	});

	it('sets user data correctly', () => {
		const userData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			token: 'abcdef123456',
			role: 'user',
		};

		store.dispatch(userSlice.actions.setUserData(userData));
		const currentState = store.getState().user;

		expect(currentState).toEqual({
			...initialState,
			...userData,
			isAuth: true,
		});
	});

	it('removes user data correctly', () => {
		const userData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			token: 'abcdef123456',
			role: 'user',
		};

		store.dispatch(userSlice.actions.setUserData(userData));
		store.dispatch(userSlice.actions.removeUserData());
		const currentState = store.getState().user;

		expect(currentState).toEqual(initialState);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
