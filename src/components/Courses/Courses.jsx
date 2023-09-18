import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Button, Searchbar } from '../../common';
import { CourseCard, EmptyCourseList } from './components';

import styles from './styles.module.css';

const Courses = ({ coursesList, authorsList }) => {
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
		setCoursesToRender(
			coursesList.filter(({ title, id }) => {
				return (
					title.toLowerCase().includes(searchTxt) ||
					id.toLowerCase().includes(searchTxt)
				);
			}) || []
		);
	};

	const getCoursesToRender = () => {
		return coursesToRender.map((course) => {
			return (
				<CourseCard course={course} authorsList={authorsList} key={course.id} />
			);
		});
	};

	const onSearchClick = () => {
		setFilteredCourses();
	};

	useEffect(() => {
		setCoursesToRender(coursesList);
	}, [coursesList]);

	return coursesList.length ? (
		<div className={styles.mainContent}>
			<Outlet />

			<div className={styles.panel}>
				<Searchbar
					handleSearch={onSearchClick}
					onSearchInputChange={onSearchInputChange}
				/>
				<Link to='/courses/add'>
					<Button buttonText={buttonText} />
				</Link>
			</div>
			<div>{getCoursesToRender()}</div>
		</div>
	) : (
		<EmptyCourseList />
	);
};

Courses.propTypes = {
	coursesList: PropTypes.array,
	authorsList: PropTypes.array,
};

export { Courses };
