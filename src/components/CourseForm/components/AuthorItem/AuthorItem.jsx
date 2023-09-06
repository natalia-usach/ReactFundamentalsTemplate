import React from 'react';

import styles from './styles.module.css';
import { Button } from '../../../../common';

export const AuthorItem = () => {
	const buttonText = 'ADD AUTHOR';

	return (
		<div className={styles.authorItem} data-testid='authorItem'>
			<span>Boris Smith</span>

			// reuse Button component for 'Add author' button with data-testid="addAuthor" attribute
			<Button buttonText={buttonText} handleClick={() => {}} data-testid="addAuthor" />
		</div>
	);
}
