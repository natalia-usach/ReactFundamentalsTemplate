import React from 'react';
import { useParams, Link } from "react-router-dom";

import { formatCreationDate, getCourseDuration } from '../../helpers';

import styles from './styles.module.css';
import { Button } from '../../common';

export const CourseInfo = ({coursesList, authorsList}) => {
	// Module 2: use 'react-router-dom' 'Link' component for button 'Back'
	const buttonText = 'BACK';
	const { courseId } = useParams();

	const course = coursesList.find(course => course.id === courseId);

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
						<ul className={styles.authorsList}>
							{getAuthorsList()}
						</ul>
					</div>
				</div>
			</div>
			<div className={styles.backBtn}>
				<Link to="/courses"><Button buttonText={buttonText} handleClick={() => {}} /></Link>
			</div>
		</div>
	);
};
