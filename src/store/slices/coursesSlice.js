import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setCourses: (state, { payload }) => payload,
		saveCourse: (state, { payload }) => [...state, payload],
		deleteCourse: (state, { payload }) =>
			state.filter((course) => course.id !== payload),
		updateCourse: (state, { payload }) => {
			const index = state.findIndex((course) => course.id === payload.id);
			state[index] = payload;
		},
	},
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, deleteCourse, updateCourse } =
	coursesSlice.actions;

export default coursesSlice.reducer;
