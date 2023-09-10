import React from 'react';

import styles from './styles.module.css';

export const Input = ({
	placeholderText,
	labelText,
	name,
	onChange,
	'data-testid': dataTestId,
}) => (
	<label>
		{labelText}
		<input
			className={styles.input}
			onChange={onChange}
			placeholder={placeholderText}
			data-testid={dataTestId}
			name={name}
		/>
	</label>
);
