import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { Button, Searchbar } from '../../common';
import { coursesSelector } from '../../store/selectors';
import { CourseCard, EmptyCourseList } from './components';

import styles from './styles.module.css';

const Courses = () => {
	const buttonText = 'ADD NEW COURSE';

	const allCourses = useSelector(coursesSelector);
	const [searchTxt, setSearchTxt] = useState('');
	const [coursesToRender, setCoursesToRender] = useState(allCourses);

	const onSearchInputChange = (value) => {
		if (!value) {
			setCoursesToRender(allCourses);
		}

		setSearchTxt(value);
	};

	const setFilteredCourses = () => {
		setCoursesToRender(
			allCourses.filter(({ title, id }) => {
				return (
					title.toLowerCase().includes(searchTxt) ||
					id.toLowerCase().includes(searchTxt)
				);
			}) || []
		);
	};

	const getCoursesToRender = () => {
		return coursesToRender.map((course) => {
			return <CourseCard course={course} key={course.id} />;
		});
	};

	const onSearchClick = () => {
		setFilteredCourses();
	};

	useEffect(() => {
		setCoursesToRender(allCourses);
	}, [allCourses]);

	return allCourses.length ? (
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

export { Courses };
