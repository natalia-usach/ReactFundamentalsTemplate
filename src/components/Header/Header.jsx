import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../common';
import { userNameSelector } from '../../store/selectors';
import { removeUserData } from '../../store/slices/userSlice';
import { Logo } from './components';

import styles from './styles.module.css';

export const Header = () => {
	const isAuthorized = !!localStorage.getItem('token');
	const buttonText = isAuthorized ? 'LOGOUT' : 'LOGIN';

	const navigate = useNavigate();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const userName = useSelector(userNameSelector);

	const onBtnClick = () => {
		navigate('/login');
		if (isAuthorized) {
			dispatch(removeUserData());
			window.localStorage.removeItem('token');
		}
	};

	const renderUserContainer = () => {
		if (
			pathname === '/login' ||
			pathname === '/registration' ||
			!window.localStorage.getItem('token')
		) {
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
