import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../../common';
import { formatCreationDate, getCourseDuration } from '../../../../helpers';

import styles from './styles.module.css';

export const CourseCard = ({ course, authorsList }) => {
	const showCourseBtnText = 'SHOW COURSE';
	const deleteCourseBtnText = 'DELETE';
	const updateCourseBtnText = 'UPDATE';

	const getAuthorNames = () => {
		const authorNames = [];

		course.authors.forEach((id) => {
			authorNames.push(authorsList.find((author) => author.id === id).name);
		});

		return authorNames.join(', ');
	};

	return (
		<div className={styles.cardContainer} data-testid='courseCard'>
			<div className={styles.cardText}>
				<h2>{course.title}</h2>
				<p>{course.description}</p>
			</div>
			<div className={styles.cardDetails}>
				<p>
					<b>Authors: </b>
					{getAuthorNames()}
				</p>
				<p>
					<b>Duration: </b>
					<span>{getCourseDuration(course.duration)}</span>
				</p>
				<p>
					<b>Created: </b>
					<span>{formatCreationDate(course.creationDate)}</span>
				</p>
				<div className={styles.buttonGroup}>
					<Link to={`/courses/${course.id}`}>
						<Button buttonText={showCourseBtnText} />
					</Link>
					<Button
						buttonText={deleteCourseBtnText}
						handleClick={() => {}}
						data-testid='deleteCourse'
					/>
					<Button
						buttonText={updateCourseBtnText}
						handleClick={() => {}}
						data-testid='updateCourse'
					/>
				</div>
			</div>
		</div>
	);
};
