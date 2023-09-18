import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	PrivateRoute,
	Registration,
} from './components';
import { getAuthors, getCourses } from './services';
import { authorsSelector, coursesSelector } from './store/selectors';
import { saveAuthor, setAuthors } from './store/slices/authorsSlice';
import { saveCourse, setCourses } from './store/slices/coursesSlice';

import styles from './App.module.css';

function App() {
	const allCourses = useSelector(coursesSelector);
	const allAuthors = useSelector(authorsSelector);
	const dispatch = useDispatch();

	const createAuthor = (newAuthor) => {
		dispatch(saveAuthor(newAuthor));
	};

	async function fetchCourses() {
		const response = await getCourses();
		if (response.successful) {
			dispatch(setCourses(response.result));
		}
	}

	async function fetchAuthors() {
		const response = await getAuthors();
		if (response.successful) {
			dispatch(setAuthors(response.result));
		}
	}

	const addCourse = async (course) => {
		dispatch(saveCourse(course));
	};

	useEffect(() => {
		fetchCourses();
		fetchAuthors();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<div className={styles.container}>
				<Routes>
					<Route path='registration' element={<Registration />}></Route>
					<Route path='login' element={<Login />}></Route>
					<Route path='/' element={<PrivateRoute />}></Route>
					<Route path='courses'>
						<Route
							index
							element={
								<Courses coursesList={allCourses} authorsList={allAuthors} />
							}
						/>
						<Route
							path=':courseId'
							element={
								<CourseInfo coursesList={allCourses} authorsList={allAuthors} />
							}
						></Route>
						<Route
							path='add'
							element={
								<CourseForm
									authorsList={allAuthors}
									createAuthor={createAuthor}
									createCourse={addCourse}
								/>
							}
						></Route>
					</Route>
				</Routes>
				<Outlet />
			</div>
		</>
	);
}

export default App;
