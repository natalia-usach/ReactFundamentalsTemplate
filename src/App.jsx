import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { setAuthors } from './store/slices/authorsSlice';
import { setCourses } from './store/slices/coursesSlice';

import styles from './App.module.css';

function App() {
	const dispatch = useDispatch();

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
						<Route index element={<Courses />} />
						<Route path=':courseId' element={<CourseInfo />}></Route>
						<Route path='add' element={<CourseForm />}></Route>
					</Route>
				</Routes>
				<Outlet />
			</div>
		</>
	);
}

export default App;
