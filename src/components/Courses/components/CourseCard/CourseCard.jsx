import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Button } from '../../../../common';
import { formatCreationDate, getCourseDuration } from '../../../../helpers';
import { authorsSelector, userRoleSelector } from '../../../../store/selectors';
import { deleteCourseThunk } from '../../../../store/thunks/coursesThunk';

import styles from './styles.module.css';

const CourseCard = ({ course }) => {
	const showCourseBtnText = 'SHOW COURSE';
	const deleteCourseBtnText = 'DELETE';
	const updateCourseBtnText = 'UPDATE';

	const dispatch = useDispatch();
	const authorsList = useSelector(authorsSelector);
	const role = useSelector(userRoleSelector);

	const getAuthorNames = () => {
		const authorNames = [];

		course.authors.forEach((id) => {
			authorNames.push(authorsList.find((author) => author.id === id).name);
		});

		return authorNames.join(', ');
	};

	const onDeleteCourse = (id) => {
		dispatch(deleteCourseThunk(id));
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
					{role === 'admin' ? (
						<>
							<Button
								buttonText={deleteCourseBtnText}
								handleClick={() => onDeleteCourse(course.id)}
								data-testid='deleteCourse'
							/>
							<Link to={`/courses/update/${course.id}`}>
								<Button
									buttonText={updateCourseBtnText}
									handleClick={() => {}}
									data-testid='updateCourse'
								/>
							</Link>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	course: PropTypes.object,
};

export { CourseCard };
