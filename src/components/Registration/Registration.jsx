import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { capitalize } from '../../helpers';
import { createUser } from '../../services';

import styles from './styles.module.css';

export const Registration = () => {
	const buttonText = 'REGISTRATION';
	const formNames = ['name', 'email', 'password'];
	const placeholder = 'Input text';

	const navigate = useNavigate();
	const [validationErrors, setValidationErrors] = useState({});
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [responseError, setResponseError] = useState(null);

	const onInputChange = (event) => {
		if (event.target.value.trim()) {
			const newUser = Object.assign({}, user);
			newUser[event.target.name] = event.target.value.trim();
			setUser(newUser);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newErrors = Object.assign({}, validationErrors);
		formNames.forEach((formName) => {
			if (!event.target[formName].value.trim()) {
				newErrors[formName] = `${capitalize(formName)} is required.`;
			} else {
				delete newErrors[formName];
			}
		});
		setValidationErrors(newErrors);

		if (!Object.keys(newErrors).length) {
			const { errors } = await createUser(user);

			errors ? setResponseError([...errors]) : navigate('/login');
		}
	};

	const renderInputs = () => {
		return formNames.map((name) => {
			return (
				<div key={name}>
					<Input
						labelText={capitalize(name)}
						name={name}
						placeholderText={placeholder}
						onChange={onInputChange}
					/>
					<p className={styles.invalid}>{validationErrors[name]}</p>
				</div>
			);
		});
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Registration</h1>
				{renderInputs()}
				<Button buttonText={buttonText} handleClick={() => {}} />
			</form>
			<div className={styles.invalid}>{responseError}</div>
			<p>
				If you have an account you can&nbsp;
				<Link to='/login'>login</Link>
			</p>
		</div>
	);
};
