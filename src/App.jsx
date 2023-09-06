import React, { useState } from 'react';
import { CourseInfo, Courses, Header } from './components';
import styles from './App.module.css';

// use mocked data till API implementation
import { mockedAuthorsList, mockedCoursesList } from './constants';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js

function App() {
	const [showCourseId, setShowCourseId] = useState(null);

	const handleShowCourse = (id) => {
		setShowCourseId(id);
	};

	const onBack = () => {
		setShowCourseId(null);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				{
					showCourseId
						? <CourseInfo coursesList={mockedCoursesList} authorsList={mockedAuthorsList} showCourseId={showCourseId} onBack={onBack} />
						: <Courses coursesList={mockedCoursesList} authorsList={mockedAuthorsList} handleShowCourse={handleShowCourse} />
				}
			</div>
			
		</>
	);
}

export default App;
