import * as services from '../../services';
import {
	deleteCourse,
	saveCourse,
	setCourses,
	updateCourse,
} from '../slices/coursesSlice';

export const updateCourseThunk = (id, course) => {
	return async function (dispatch) {
		try {
			const { result } = await services.updateCourse(id, course);
			dispatch(updateCourse(result));
		} catch (error) {
			throw new Error(error);
		}
	};
};

export const deleteCourseThunk = (id) => {
	return async function (dispatch) {
		try {
			await services.deleteCourse(id);
			dispatch(deleteCourse(id));
		} catch (error) {
			throw new Error(error);
		}
	};
};

export const createCourseThunk = (course) => {
	return async function (dispatch) {
		try {
			const { result } = await services.createCourse(course);
			dispatch(saveCourse(result));
		} catch (error) {
			throw new Error(error);
		}
	};
};

export const getCoursesThunk = () => {
	return async function (dispatch) {
		const response = await services.getCourses();

		dispatch(setCourses(response.result ?? []));
	};
};
