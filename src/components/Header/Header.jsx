import React from 'react';

import styles from './styles.module.css';
import { Button } from '../../common';
import { Logo } from './components';
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
	const isAuthorized = !!window.localStorage.getItem('token');
	const userName = window.localStorage.getItem('user');
	const buttonText = isAuthorized ? 'LOGOUT' : 'LOGIN';
	const navigate = useNavigate();
	const {pathname} = useLocation();

	const onBtnClick = () => {
		navigate('/login');
		if (isAuthorized) {
			window.localStorage.removeItem('token');
			window.localStorage.removeItem('user');
		}
	};

	const renderUserContainer = () => {
		if (pathname === '/login' || pathname === '/registration') {
			return;
		} else {
			return (
				<div className={styles.userContainer}>
					<p className={styles.userName}>{userName}</p>
					<Button buttonText={buttonText} handleClick={onBtnClick} />
				</div>
			);
		}
	};

	return (
		<div className={styles.headerContainer}>
			<Logo />
			{renderUserContainer()}
		</div>
	);
};
