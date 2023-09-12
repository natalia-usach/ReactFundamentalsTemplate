import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Button, Input } from '../../common';
import { capitalize, getCourseDuration } from '../../helpers';
import { getFormattedDate } from '../../helpers/getFormattedDate';
import { AuthorItem, CreateAuthor } from './components';

import styles from './styles.module.css';

const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
	const saveCourseBtn = 'SAVE COURSE';
	const textInputNames = ['title', 'description'];
	const [validationErrors, setValidationErrors] = useState({});
	const [authorNameError, setAuthorNameError] = useState('');
	const [durationValue, setDurationValue] = useState('');
	const [courseData, setCourseData] = useState({
		title: '',
		description: '',
		creationDate: null,
		duration: null,
		authors: [],
	});
	const [authorName, setAuthorName] = useState('');
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [allCourseAuthors, setAllCourseAuthors] = useState(authorsList);

	const navigate = useNavigate();

	const addAuthor = (event, id) => {
		event.preventDefault();
		const targetAuthor = allCourseAuthors.find((author) => author.id === id);
		setAllCourseAuthors([
			...allCourseAuthors.filter((author) => author.id !== id),
		]);
		setCourseAuthors([...courseAuthors, targetAuthor]);
	};

	const deleteAuthor = (event, id) => {
		event.preventDefault();
		const targetAuthor = courseAuthors.find((author) => author.id === id);
		setAllCourseAuthors([...allCourseAuthors, targetAuthor]);
		setCourseAuthors([...courseAuthors.filter((author) => author.id !== id)]);
	};

	const onCancel = (event) => {
		event.preventDefault();
		setAllCourseAuthors(authorsList);
		setCourseAuthors([]);
		navigate('/courses');
	};

	const onTextInputChange = (event) => {
		if (event.target.value.trim()) {
			const newCourse = Object.assign({}, courseData);
			newCourse[event.target.name] = event.target.value.trim();
			setCourseData(newCourse);
		}
	};

	const onDurationInputChange = (event) => {
		const filteredValue = event.target.value.replace(/\D/g, '');
		setDurationValue(filteredValue);
	};

	const getValidationErrors = (event) => {
		const newErrors = Object.assign({}, validationErrors);
		textInputNames.forEach((formName) => {
			if (!event.target[formName] || !event.target[formName].value.trim()) {
				newErrors[formName] = `${capitalize(formName)} is required.`;
			} else if (event.target[formName].value.trim().length < 2) {
				newErrors[formName] = `${capitalize(
					formName
				)} should be at least 2 characters long.`;
			} else {
				delete newErrors[formName];
			}
		});

		if (!durationValue) {
			newErrors['duration'] = `Duration is required.`;
		} else if (durationValue === '0') {
			newErrors['duration'] = `Duration should be bigger than 0.`;
		} else {
			delete newErrors['duration'];
		}

		return newErrors;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const formValidationErrors = getValidationErrors(event);

		if (!Object.keys(formValidationErrors).length && !authorNameError) {
			createCourse(getAllFormDataToSend());
			navigate('/courses');
		} else {
			setValidationErrors(formValidationErrors);
		}
	};

	const onAuthorChange = (event) => {
		setAuthorName(event.target.value);
	};

	const onCreateAuthorClick = (event) => {
		event.preventDefault();
		if (authorName.trim().length < 2) {
			setAuthorNameError('Author name should be at least 2 characters long.');
		} else {
			const newAuthor = { id: `${Date.now()}`, name: authorName.trim() };
			createAuthor(newAuthor);
			setAllCourseAuthors([...allCourseAuthors, newAuthor]);
			setAuthorName('');
			setAuthorNameError('');
		}
	};

	const getCourseAuthors = () => {
		return (
			<div data-testid='selectedAuthor'>
				{courseAuthors.length ? (
					courseAuthors.map((author) => (
						<AuthorItem
							key={author.id}
							name={author.name}
							forCourse={true}
							onDeleteAuthor={(event) => deleteAuthor(event, author.id)}
						/>
					))
				) : (
					<p className={styles.notification}>List is empty</p>
				)}
			</div>
		);
	};

	const getAllFormDataToSend = () => {
		return {
			id: `${Date.now()}`,
			title: courseData.title,
			description: courseData.description,
			creationDate: getFormattedDate(new Date()),
			duration: +durationValue,
			authors: courseAuthors.map((author) => author.id),
		};
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Input
					labelText='Title'
					placeholderText='Input text'
					name='title'
					data-testid='titleInput'
					onChange={onTextInputChange}
				/>
				<p className={styles.invalid}>{validationErrors['title']}</p>
			</div>

			<div>
				<label>
					Description
					<br></br>
					<textarea
						data-testid='descriptionTextArea'
						name='description'
						onChange={onTextInputChange}
					/>
				</label>
				<p className={styles.invalid}>{validationErrors['description']}</p>
			</div>
			<div>
				<p>
					<strong>Duration: </strong>
				</p>
				<Input
					labelText='Duration'
					placeholderText='Input text'
					name='duration'
					value={durationValue}
					onChange={onDurationInputChange}
					data-testid='durationInput'
				/>
				<p>{getCourseDuration(durationValue)}</p>
				<p className={styles.invalid}>{validationErrors['duration']}</p>
			</div>
			<div className={styles.authorsContainer}>
				<div className={styles.createAuthor}>
					<strong>Authors</strong>
					<CreateAuthor
						onCreateAuthor={onCreateAuthorClick}
						onChange={onAuthorChange}
						authorName={authorName}
						validationError={authorNameError}
					/>
				</div>

				<div className={styles.courseAuthors}>
					<strong>Course authors</strong>
					{getCourseAuthors()}
				</div>
			</div>
			<div className={styles.authorsList}>
				<strong>Authors list</strong>
				<br></br>
				{allCourseAuthors.map((author) => (
					<AuthorItem
						key={author.id}
						name={author.name}
						onAddAuthor={(event) => addAuthor(event, author.id)}
						forCourse={false}
					/>
				))}
			</div>
			<div className={styles.buttons}>
				<Button buttonText='Cancel' handleClick={(e) => onCancel(e)} />
				<Button buttonText={saveCourseBtn} data-testid='createCourseButton' />
			</div>
		</form>
	);
};

CourseForm.propTypes = {
	authorsList: PropTypes.array,
	createCourse: PropTypes.func,
	createAuthor: PropTypes.func,
};

export { CourseForm };
