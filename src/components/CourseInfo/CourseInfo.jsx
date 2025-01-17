import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Button } from '../../common';
import { formatCreationDate, getCourseDuration } from '../../helpers';
import { authorsSelector, coursesSelector } from '../../store/selectors';

import styles from './styles.module.css';

const CourseInfo = () => {
	const buttonText = 'Back';
	const { courseId } = useParams();
	const courses = useSelector(coursesSelector);
	const authors = useSelector(authorsSelector);

	const course = courses.find((course) => course.id === courseId);

	const getAuthorsList = () => {
		const authorNames = [];
		course.authors.forEach((id) => {
			authorNames.push(authors.find((author) => author.id === id).name);
		});

		return authorNames.map((author) => <li key={author}>{author}</li>);
	};

	return (
		<div className={styles.courseInfoWrapper} data-testid='courseInfo'>
			<h1>{course.title}</h1>
			<div className={styles.courseInfo}>
				<p className={styles.description}>{course.description}</p>
				<div>
					<p>
						<b>ID: </b>
						{courseId}
					</p>
					<p>
						<b>Duration: </b>
						{getCourseDuration(course.duration)}
					</p>
					<p>
						<b>Created: </b>
						{formatCreationDate(course.creationDate)}
					</p>
					<div>
						<b>Authors</b>
						<ul className={styles.authorsList}>{getAuthorsList()}</ul>
					</div>
				</div>
			</div>
			<div className={styles.backBtn}>
				<Link to='/courses'>
					<Button buttonText={buttonText} handleClick={() => {}} />
				</Link>
			</div>
		</div>
	);
};

export { CourseInfo };
