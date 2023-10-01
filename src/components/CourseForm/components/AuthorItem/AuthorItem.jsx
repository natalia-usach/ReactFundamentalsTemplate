import React from 'react';

import PropTypes from 'prop-types';

import { Button } from '../../../../common';

import styles from './styles.module.css';

const AuthorItem = ({ name, onAddAuthor, onDeleteAuthor, forCourse }) => {
	return (
		<div className={styles.authorItem} data-testid='authorItem'>
			<span>{name}</span>
			<div>
				{!forCourse ? (
					<Button
						buttonText='+'
						handleClick={onAddAuthor}
						data-testid='addAuthor'
					/>
				) : (
					<Button buttonText='Delete' handleClick={onDeleteAuthor} />
				)}
			</div>
		</div>
	);
};

AuthorItem.propTypes = {
	name: PropTypes.string,
	onAddAuthor: PropTypes.func,
	onDeleteAuthor: PropTypes.func,
	forCourse: PropTypes.bool,
};

export { AuthorItem };
