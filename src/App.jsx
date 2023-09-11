import React, { useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

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
	const [allCourseAuthors, setAllCourseAuthors] = useState(mockedAuthorsList);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const navigate = useNavigate();

	const createAuthor = (newAuthor) => {
		setAllAuthors([...allAuthors, newAuthor]);
		setAllCourseAuthors([...allCourseAuthors, newAuthor]);
	};

	const addAuthor = (event, id) => {
		event.preventDefault();
		const targetAuthor = allCourseAuthors.find((author) => author.id === id);
		setAllCourseAuthors([
			...allCourseAuthors.filter((author) => author.id !== id),
		]);
		setCourseAuthors([...courseAuthors, targetAuthor]);
	};

	const deleteAuthor = (event, id) => {
		event.preventDefault();
		const targetAuthor = courseAuthors.find((author) => author.id === id);
		setAllCourseAuthors([...allCourseAuthors, targetAuthor]);
		setCourseAuthors([...courseAuthors.filter((author) => author.id !== id)]);
	};

	const createCourse = (course) => {
		setAllCourses([...allCourses, course]);
	};

	const onCancelFormClick = (event) => {
		event.preventDefault();
		setAllCourseAuthors(mockedAuthorsList);
		setCourseAuthors([]);
		navigate('/courses');
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
									authorsList={allCourseAuthors}
									courseAuthors={courseAuthors}
									createAuthor={createAuthor}
									deleteAuthor={deleteAuthor}
									addAuthor={addAuthor}
									createCourse={createCourse}
									onCancel={onCancelFormClick}
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
