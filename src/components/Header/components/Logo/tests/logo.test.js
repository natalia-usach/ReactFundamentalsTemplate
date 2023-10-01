import React from 'react';

import { render } from '@testing-library/react';

import logo from './../../../../../assets/img/logo.png';
import { Logo } from './../Logo';

describe('Logo', () => {
	test('renders the Logo component', () => {
		const { getByAltText } = render(<Logo />);
		const logoElement = getByAltText('logo');

		expect(logoElement).toHaveAttribute('src', logo);
		expect(logoElement).toHaveClass('logo');
	});
});
