import React from 'react';
import PropTypes from 'prop-types';

export const BlankLink = ({ children, hash, ...props }) => {
	const handleClick = (e) => {
		if (!hash){
			e.preventDefault();
			return;
		}

		if (e.button !== 0){
			e.preventDefault();
		}
		if (e.ctrlKey){
			e.preventDefault();
			window.open(hash);
		}
	};

	return (
		<a onClick={handleClick} href={hash || '#'} {...props}>
			{children}
		</a>
	);
};

BlankLink.propTypes = {
	children: PropTypes.element,
	hash: PropTypes.string
};
