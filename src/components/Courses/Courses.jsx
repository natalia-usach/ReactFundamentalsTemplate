import React, { useState } from 'react';

import styles from './styles.module.css';
import { Button, Searchbar } from '../../common';
import { CourseCard } from './components';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';

export const Courses = ({coursesList, authorsList, handleShowCourse}) => {
	const buttonText = 'ADD NEW COURSE';

	const [searchTxt, setSearchTxt] = useState('');
	const [coursesToRender, setCoursesToRender] = useState(coursesList);

	const onSearchInputChange = (value) => {
		if (!value) {
			setCoursesToRender(coursesList);
		}

		setSearchTxt(value);
	};

	const setFilteredCourses = () => {
		setCoursesToRender(coursesList.filter(({title, id}) => {
			return title.toLowerCase().includes(searchTxt) || id.toLowerCase().includes(searchTxt);
		}) || []);
	}

	const getCoursesToRender = () => {
		return coursesToRender.map(course => {
			const authorNames = [];
	
			course.authors.forEach(id => {
				authorNames.push(authorsList.find(author => author.id === id).name);
			});
			return <CourseCard course={course} authorsList={authorNames} handleShowCourse={() => handleShowCourse(course.id)} key={course.id} />;
		});
	};

	const onSearchClick = () => {
		setFilteredCourses();
	}

	// for EmptyCourseListComponent container use data-testid="emptyContainer" attribute
	// for button in EmptyCourseListComponent add data-testid="addCourse" attribute

	return (
		coursesList.length
			?
			<div className={styles.mainContent}>
				<div className={styles.panel}>
					<Searchbar handleSearch={onSearchClick} onSearchInputChange={onSearchInputChange}/>
					<Button buttonText={buttonText} handleClick={() => {}} />
				</div>
				<div>{getCoursesToRender()}</div>
			</div> 
			:
			<EmptyCourseList />
	);
};
