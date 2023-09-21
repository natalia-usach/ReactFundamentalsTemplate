import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: !!localStorage.getItem('token'),
	name: '',
	email: '',
	token: localStorage.getItem('token') || '',
	isAdmin: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, { payload }) => ({
			...state,
			isAuth: true,
			name: payload.name,
			email: payload.email,
			token: payload.token,
			role: payload.role,
		}),
		removeUserData: (state) => ({
			...state,
			isAuth: false,
			name: '',
			email: '',
			token: '',
		}),
	},
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
