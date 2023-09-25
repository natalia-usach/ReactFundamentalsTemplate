import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	PrivateRoute,
	Registration,
} from './components';
import { isAuthSelector } from './store/selectors';
import { getAuthorsThunk } from './store/thunks/authorsThunk';
import { getCoursesThunk } from './store/thunks/coursesThunk';
import { getUserThunk } from './store/thunks/userThunk';

import styles from './App.module.css';

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthSelector);

	const fetchCourses = () => {
		dispatch(getCoursesThunk());
	};

	const fetchAuthors = () => {
		dispatch(getAuthorsThunk());
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(getUserThunk());
		}

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
					<Route
						path='/'
						element={
							isAuth ? <Navigate to='/courses' /> : <Navigate to='/login' />
						}
					></Route>
					<Route path='courses' element={<Courses />}></Route>
					<Route path='courses/:courseId' element={<CourseInfo />}></Route>
					<Route
						exact
						path='/courses/add'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/>
				</Routes>
				<Outlet />
			</div>
		</>
	);
}

export default App;
