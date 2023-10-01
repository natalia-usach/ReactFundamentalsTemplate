import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as services from '../../../services';
import {
	deleteCourse,
	saveCourse,
	setCourses,
	updateCourse,
} from '../../../store/slices/coursesSlice';
import {
	createCourseThunk,
	deleteCourseThunk,
	getCoursesThunk,
	updateCourseThunk,
} from '../../../store/thunks/coursesThunk';

// Mock the services
jest.mock('../../../services', () => ({
	updateCourse: jest.fn(),
	deleteCourse: jest.fn(),
	createCourse: jest.fn(),
	getCourses: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('coursesThunk', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test('should create a new course', async () => {
		const course = {
			id: '5',
			title: 'Test Course 5',
			description: 'This is a test course',
			duration: 120,
			creationDate: '2020-10-30',
			authors: ['1', '2'],
		};
		services.createCourse.mockImplementation(() =>
			Promise.resolve({ result: course })
		);

		const store = mockStore({ courses: [] });
		await store.dispatch(createCourseThunk(course));

		const actions = store.getActions();
		expect(services.createCourse).toHaveBeenCalledWith(course);
		expect(actions[0]).toEqual(saveCourse(course));
	});

	test('should update an existing course', async () => {
		const courseId = 1;
		const courseData = { title: 'New Course' };
		const updatedCourse = { id: courseId, ...courseData };

		services.updateCourse.mockImplementation(() =>
			Promise.resolve({ result: updatedCourse })
		);

		const store = mockStore({ courses: [] });
		await store.dispatch(updateCourseThunk(courseId, courseData));

		const actions = store.getActions();
		expect(services.updateCourse).toHaveBeenCalledWith(courseId, courseData);
		expect(actions[0]).toEqual(updateCourse(updatedCourse));
	});

	test('should delete a course', async () => {
		const courseId = 1;

		services.deleteCourse.mockImplementation(() => Promise.resolve());

		const store = mockStore({ courses: [] });
		await store.dispatch(deleteCourseThunk(courseId));

		const actions = store.getActions();
		expect(services.deleteCourse).toHaveBeenCalledWith(courseId);
		expect(actions[0]).toEqual(deleteCourse(courseId));
	});

	test('should create a new course', async () => {
		const courseData = { title: 'New Course' };
		const newCourse = { id: 1, ...courseData };

		services.createCourse.mockImplementation(() =>
			Promise.resolve({ result: newCourse })
		);

		const store = mockStore({ courses: [] });
		await store.dispatch(createCourseThunk(courseData));

		const actions = store.getActions();
		expect(services.createCourse).toHaveBeenCalledWith(courseData);
		expect(actions[0]).toEqual(saveCourse(newCourse));
	});

	test('should fetch courses', async () => {
		const courses = [
			{ id: 1, title: 'Course 1' },
			{ id: 2, title: 'Course 2' },
		];

		services.getCourses.mockImplementation(() =>
			Promise.resolve({ result: courses })
		);

		const store = mockStore({ courses: [] });
		await store.dispatch(getCoursesThunk());

		const actions = store.getActions();
		expect(services.getCourses).toHaveBeenCalled();
		expect(actions[0]).toEqual(setCourses(courses));
	});
});
