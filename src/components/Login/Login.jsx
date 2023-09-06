import React from 'react';

import styles from './styles.module.css';
import { Button } from '../../common';

export const Login = () => {
	
	// write your code here
	const buttonText = 'LOGIN';

	const handleSubmit = () => {};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>

				{/* // reurse Input component for email field */}

				{/* // reurse Input component for password field */}

				{/* // reurse Button component for 'Login' button */}
				<Button buttonText={buttonText} handleClick={() => {}} />

			</form>
			<p>
				If you don't have an account you can&nbsp;
				{/* <a>register</a> */}
			</p>
		</div>
	);
};
