import { configureStore } from '@reduxjs/toolkit';

import coursesReducer, {
	deleteCourse,
	saveCourse,
	setCourses,
	updateCourse,
} from '../../slices/coursesSlice';

describe('coursesSlice', () => {
	let store;

	beforeEach(() => {
		store = configureStore({ reducer: { courses: coursesReducer } });
	});

	test('setCourses adds an array of courses to state', () => {
		const courses = [
			{ id: 1, title: 'Course1' },
			{ id: 2, title: 'Course2' },
		];

		store.dispatch(setCourses(courses));

		expect(store.getState().courses).toEqual(courses);
	});

	test('saveCourse adds a new course to state', () => {
		const course = { id: 1, title: 'Course1' };

		store.dispatch(saveCourse(course));

		expect(store.getState().courses).toEqual([course]);
	});

	test('deleteCourse removes a course from state', () => {
		const courses = [
			{ id: 1, title: 'Course1' },
			{ id: 2, title: 'Course2' },
		];
		store.dispatch(setCourses(courses));

		store.dispatch(deleteCourse(1));

		expect(store.getState().courses).toEqual([{ id: 2, title: 'Course2' }]);
	});

	test('updateCourse updates a course in state', () => {
		const courses = [
			{ id: 1, title: 'Course1' },
			{ id: 2, title: 'Course2' },
		];
		store.dispatch(setCourses(courses));

		const updatedCourse = { id: 1, title: 'Updated Course1' };
		store.dispatch(updateCourse(updatedCourse));

		expect(store.getState().courses).toEqual([
			{ id: 1, title: 'Updated Course1' },
			{ id: 2, title: 'Course2' },
		]);
	});
});
