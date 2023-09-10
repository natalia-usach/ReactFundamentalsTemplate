import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import {
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
								<Courses
									coursesList={mockedCoursesList}
									authorsList={mockedAuthorsList}
								/>
							}
						/>
						<Route
							path=':courseId'
							element={
								<CourseInfo
									coursesList={mockedCoursesList}
									authorsList={mockedAuthorsList}
								/>
							}
						></Route>
					</Route>
				</Routes>
				<Outlet />
			</div>
			{/* <div className={styles.container}>
				{
					showCourseId
						? <CourseInfo coursesList={mockedCoursesList} authorsList={mockedAuthorsList} showCourseId={showCourseId} onBack={onBack} />
						: <Courses coursesList={mockedCoursesList} authorsList={mockedAuthorsList} handleShowCourse={handleShowCourse} />
				}
			</div> */}
		</>
	);
}

export default App;
