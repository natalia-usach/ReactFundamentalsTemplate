import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common';

export const EmptyCourseList = () => {
	const buttonText = 'ADD NEW COURSE';
	const styles = {
		display: 'flex',
		justifycontent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	};

	const navigate = useNavigate();

	return (
		<div data-testid='emptyContainer' style={styles}>
			<h1>Your List Is Empty</h1>
			<Button
				buttonText={buttonText}
				handleClick={() => navigate('/courses/add')}
				data-testid='addCourse'
			/>
		</div>
	);
};
