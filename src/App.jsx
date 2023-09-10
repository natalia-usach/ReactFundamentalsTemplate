import React from 'react';
import { CourseInfo, Courses, Header, Login, PrivateRoute, Registration } from './components';
import styles from './App.module.css';
import {Routes, Route, Outlet} from "react-router-dom";

// use mocked data till API implementation
import { mockedAuthorsList, mockedCoursesList } from './constants';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js

function App() {
	return (
		<>
			<Header />
			<div className={styles.container}>
				<Routes>
					<Route path="registration" element={<Registration />}></Route>
					<Route path="login" element={<Login />}></Route>
					<Route path="/" element={<PrivateRoute />}></Route>
					<Route path="courses">
						<Route index element={<Courses coursesList={mockedCoursesList} authorsList={mockedAuthorsList} />} />
						<Route path=":courseId" element={<CourseInfo coursesList={mockedCoursesList} authorsList={mockedAuthorsList} />}></Route>
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
