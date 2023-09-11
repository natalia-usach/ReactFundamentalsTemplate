import React from 'react';

import PropTypes from 'prop-types';

import { Button } from '../Button';
import { Input } from '../Input';

import styles from './styles.module.css';

const Searchbar = ({ handleSearch, onSearchInputChange }) => {
	const buttonText = 'SEARCH';

	const onInputChange = (event) => {
		onSearchInputChange(event.target.value.trim().toLowerCase());
	};

	return (
		<div className={styles.searchBar}>
			<Input
				labelText=''
				placeholderText='input text'
				onChange={onInputChange}
			/>
			<Button buttonText={buttonText} handleClick={handleSearch} />
		</div>
	);
};

Searchbar.propTypes = {
	handleSearch: PropTypes.func,
	onSearchInputChange: PropTypes.func,
};

export { Searchbar };
