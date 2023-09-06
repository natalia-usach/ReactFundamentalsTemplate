import React from 'react';

import styles from './styles.module.css';
import { Button } from '../../common';
import { Logo } from './components';

export const Header = () => {
	
	// write your cose here
	const isAuthorized = false;
	const buttonText = isAuthorized ? 'LOGOUT' : 'LOGIN';

	return (
		<div className={styles.headerContainer}>
			<Logo />
			<div className={styles.userContainer}>
				<p className={styles.userName}>Boris</p>
				<Button buttonText={buttonText} handleClick={() => {}} />
			</div>
		</div>
	);
};
