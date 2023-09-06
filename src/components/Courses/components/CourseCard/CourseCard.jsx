import React from 'react';
import styles from './styles.module.css';

import { getCourseDuration, formatCreationDate } from '../../../../helpers';
import { Button } from '../../../../common';

export const CourseCard = ({course, handleShowCourse, authorsList}) => {
	const showCourseBtnText = 'SHOW COURSE';
	const deleteCourseBtnText = 'DELETE';
	const updateCourseBtnText = 'UPDATE';

	return (
		<div className={styles.cardContainer} data-testid='courseCard'>
			<div className={styles.cardText}>
				<h2>{course.title}</h2>
				<p>{course.description}</p>
			</div>
			<div className={styles.cardDetails}>
				<p>
					<b>Authors: </b>
					{authorsList.join(', ')}
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
					<Button buttonText={showCourseBtnText} handleClick={handleShowCourse} />
					<Button buttonText={deleteCourseBtnText} handleClick={() => {}} data-testid="deleteCourse" />
					<Button buttonText={updateCourseBtnText} handleClick={() => {}} data-testid="updateCourse" />
				</div>
			</div>
		</div>
	);
};
