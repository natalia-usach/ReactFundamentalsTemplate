import React from 'react';

import PropTypes from 'prop-types';

import { Button, Input } from '../../../../common';

const CreateAuthor = ({
	onCreateAuthor,
	onChange,
	validationError,
	authorName,
}) => {
	const buttonText = 'CREATE AUTHOR';

	return (
		<div>
			<Input
				labelText='Author name'
				placeholderText='Input text'
				data-testid='createAuthorInput'
				onChange={onChange}
				value={authorName}
			/>
			<p style={{ color: 'red' }}>{validationError}</p>
			<Button
				buttonText={buttonText}
				handleClick={onCreateAuthor}
				data-testid='createAuthorButton'
			/>
		</div>
	);
};

CreateAuthor.propTypes = {
	onCreateAuthor: PropTypes.func,
	onChange: PropTypes.func,
	validationError: PropTypes.string,
	authorName: PropTypes.string,
};

export { CreateAuthor };
