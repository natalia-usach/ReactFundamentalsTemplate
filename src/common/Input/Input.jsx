import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Input = ({
	placeholderText,
	labelText,
	name,
	value,
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
			value={value}
		/>
	</label>
);

Input.propTypes = {
	placeholderText: PropTypes.string,
	labelText: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	'data-testid': PropTypes.string,
};

export { Input };
