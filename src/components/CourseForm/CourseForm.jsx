import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { capitalize, getCourseDuration } from '../../helpers';
import { getFormattedDate } from '../../helpers/getFormattedDate';
import { authorsSelector } from '../../store/selectors';
import { saveAuthor } from '../../store/slices/authorsSlice';
import { saveCourse } from '../../store/slices/coursesSlice';
import { AuthorItem, CreateAuthor } from './components';

import styles from './styles.module.css';

const CourseForm = () => {
	const saveCourseBtn = 'SAVE COURSE';

	const authorsList = useSelector(authorsSelector);
	const dispatch = useDispatch();
	const [title, setTitle] = useState({ name: 'title', value: '', error: '' });
	const [description, setDescription] = useState({
		name: 'description',
		value: '',
		error: '',
	});
	const [duration, setDuration] = useState({
		name: 'duration',
		value: '',
		error: '',
	});
	const [authorName, setAuthorName] = useState({
		name: 'authorName',
		value: '',
		error: '',
	});
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

	const onTitleChange = (event) => {
		setTitle({ ...title, value: event.target.value.trim() });
	};

	const onDescriptionChange = (event) => {
		setDescription({ ...description, value: event.target.value.trim() });
	};

	const onDurationInputChange = (event) => {
		const filteredValue = event.target.value.replace(/\D/g, '');
		setDuration({ ...duration, value: filteredValue });
	};

	const onAuthorChange = (event) => {
		setAuthorName({ ...authorName, value: event.target.value.trim() });
	};

	const addValidationErrorToState = (name, msg) => {
		switch (name) {
			case 'title':
				setTitle({ ...title, error: msg });
				break;
			case 'description':
				setDescription({ ...description, error: msg });
				break;
			case 'duration':
				setDuration({ ...duration, error: msg });
				break;
			default:
				return;
		}
	};

	const getValidationErrors = () => {
		const errors = {};
		[title, description, duration].forEach(({ name, value }) => {
			if (!value) {
				errors[name] = `${capitalize(name)} is required.`;
			} else if (name !== 'duration' && value && value.length < 2) {
				errors[name] = `${capitalize(
					name
				)} should be at least 2 characters long.`;
			} else if (name === 'duration' && value === '0') {
				errors[name] = `Duration should be bigger than 0.`;
			} else {
				errors[name] = '';
			}
		});

		return errors;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = getValidationErrors();

		if (Object.values(errors).every((error) => error === '')) {
			dispatch(saveCourse(getAllFormDataToSend()));
			navigate('/courses');
		} else {
			for (const key in errors) {
				addValidationErrorToState(key, errors[key]);
			}
		}
	};

	const onCreateAuthorClick = (event) => {
		event.preventDefault();
		if (authorName.value.length < 2) {
			setAuthorName({
				...authorName,
				error: 'Author name should be at least 2 characters long.',
			});
		} else {
			const newAuthor = { id: `${Date.now()}`, name: authorName.value };
			dispatch(saveAuthor(newAuthor));
			setAllCourseAuthors([...allCourseAuthors, newAuthor]);
			setAuthorName({ ...authorName, value: '', error: '' });
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
			title: title.value,
			description: description.value,
			creationDate: getFormattedDate(new Date()),
			duration: +duration.value,
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
					value={title.value}
					data-testid='titleInput'
					onChange={onTitleChange}
				/>
				<p className={styles.invalid}>{title.error}</p>
			</div>

			<div>
				<label>
					Description
					<br></br>
					<textarea
						data-testid='descriptionTextArea'
						name='description'
						value={description.value}
						onChange={onDescriptionChange}
					/>
				</label>
				<p className={styles.invalid}>{description.error}</p>
			</div>
			<div>
				<p>
					<strong>Duration: </strong>
				</p>
				<Input
					labelText='Duration'
					placeholderText='Input text'
					name='duration'
					value={duration.value}
					onChange={onDurationInputChange}
					data-testid='durationInput'
				/>
				<p>{getCourseDuration(duration.value)}</p>
				<p className={styles.invalid}>{duration.error}</p>
			</div>
			<div className={styles.authorsContainer}>
				<div className={styles.createAuthor}>
					<strong>Authors</strong>
					<CreateAuthor
						onCreateAuthor={onCreateAuthorClick}
						onChange={onAuthorChange}
						authorName={authorName.value}
						validationError={authorName.error}
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

export { CourseForm };
