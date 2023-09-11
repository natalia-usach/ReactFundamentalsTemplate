import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Button = ({ buttonText, handleClick, 'data-testid': dataTestId }) => (
	<button
		className={styles.button}
		onClick={handleClick}
		data-testid={dataTestId}
	>
		{buttonText}
	</button>
);

Button.propTypes = {
	buttonText: PropTypes.string,
	handleClick: PropTypes.func,
	'data-testid': PropTypes.string,
};

export { Button };
