import React from 'react';

import styles from './styles.module.css';
import { Input } from '../Input';
import { Button } from '../Button';

export const Searchbar = ({ handleSearch, onSearchInputChange }) => {
    const buttonText = 'SEARCH';

    const onInputChange = (event) => {
        onSearchInputChange(event.target.value.trim().toLowerCase());
    };

    return (
        <div className={styles.searchBar}>
            <Input labelText="" placeholderText="input text" onChange={onInputChange} />
            <Button buttonText={buttonText} handleClick={handleSearch} />
        </div>
    );
};