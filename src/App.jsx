import React, { useState } from 'react';
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
// use mocked data till API implementation
import { mockedAuthorsList, mockedCoursesList } from './constants';

import styles from './App.module.css';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js

function App() {
	const [allCourses, setAllCourses] = useState(mockedCoursesList);
	const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);

	const createAuthor = (newAuthor) => {
		setAllAuthors([...allAuthors, newAuthor]);
	};

	const createCourse = (course) => {
		setAllCourses([...allCourses, course]);
	};

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
									createCourse={createCourse}
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
