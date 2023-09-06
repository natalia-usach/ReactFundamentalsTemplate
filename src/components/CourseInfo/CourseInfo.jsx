import React from 'react';

import { formatCreationDate, getCourseDuration } from '../../helpers';

import styles from './styles.module.css';
import { Button } from '../../common';

export const CourseInfo = ({coursesList, authorsList, onBack, showCourseId}) => {
	// Module 2: use 'react-router-dom' 'Link' component for button 'Back'
	const buttonText = 'BACK';
	const course = coursesList.find(course => course.id === showCourseId);

	const getAuthorsList = () => {
		const authorNames = [];
		course.authors.forEach(id => {
			authorNames.push(authorsList.find(author => author.id === id).name);
		});

		return authorNames.map(author => <li key={author}>{author}</li>);
	}

	return (
		<div className={styles.courseInfoWrapper} data-testid='courseInfo'>
			<h1>{course.title}</h1>
			<div className={styles.courseInfo}>
				<p className={styles.description}>{course.description}</p>
				<div>
					<p>
						<b>ID: </b>
						{showCourseId}
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
						<ul className={styles.authorsList}>
							{getAuthorsList()}
						</ul>
					</div>
				</div>
			</div>
			<div className={styles.backBtn}>
				<Button buttonText={buttonText} handleClick={onBack} />
			</div>
		</div>
	);
};
