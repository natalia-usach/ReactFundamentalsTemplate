import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common';
import { userRoleSelector } from '../../../../store/selectors';

export const EmptyCourseList = () => {
	const buttonText = 'ADD NEW COURSE';
	const nonAdminMessage =
		"You don't have permissions to create a course. Please log in as ADMIN";

	const styles = {
		display: 'flex',
		justifycontent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	};

	const navigate = useNavigate();
	const role = useSelector(userRoleSelector);

	return (
		<div data-testid='emptyContainer' style={styles}>
			<h1>Your List Is Empty</h1>
			{role === 'admin' ? (
				<Button
					buttonText={buttonText}
					handleClick={() => navigate('/courses/add')}
					data-testid='addCourse'
				/>
			) : (
				<p>{nonAdminMessage}</p>
			)}
		</div>
	);
};
