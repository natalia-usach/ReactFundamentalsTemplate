import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { capitalize } from '../../helpers';
import { login } from '../../services';

import styles from './styles.module.css';

export const Login = () => {
	const buttonText = 'LOGIN';
	const formNames = ['email', 'password'];
	const placeholder = 'Input text';

	const navigate = useNavigate();
	const [validationErrors, setValidationErrors] = useState({});
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [responseError, setResponseError] = useState(null);

	const onInputChange = (event) => {
		if (event.target.value.trim()) {
			const newUser = Object.assign({}, userData);
			newUser[event.target.name] = event.target.value.trim();
			setUserData(newUser);
		}
	};

	const loginUser = async () => {
		const { successful, result, user, errors } = await login(userData);

		if (successful) {
			window.localStorage.setItem('token', result);
			window.localStorage.setItem('user', user.name);
			navigate('/courses');
		} else {
			setResponseError(errors ? errors[0] : result);
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
			loginUser();
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
				<h1>Login</h1>
				{renderInputs()}
				<Button buttonText={buttonText} handleClick={() => {}} />
			</form>
			<div className={styles.invalid}>{responseError}</div>
			<p>
				If you don't have an account you can&nbsp;
				<Link to='/registration'>registration</Link>
			</p>
		</div>
	);
};
