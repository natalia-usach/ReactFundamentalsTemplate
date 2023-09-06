import React, { useState } from 'react';

import styles from './styles.module.css';
import { Button, Searchbar } from '../../common';
import { CourseCard } from './components';

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
			return <CourseCard course={course} authors={authorNames} handleShowCourse={() => handleShowCourse(course.id)} key={course.id} />;
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

const EmptyCourseList = () => {
	const buttonText = "ADD NEW COURSE";
	const styles = {
		display: 'flex',
		justifycontent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	};

	return (
		<div data-testid="emptyContainer" style={styles}>
			<h1>Your List Is Empty</h1>
			<p>Please use "Add New Course" button to add your first course</p>
			<Button buttonText={buttonText} handleClick={() => {}} data-testid="addCourse" />
		</div>
	);
};
