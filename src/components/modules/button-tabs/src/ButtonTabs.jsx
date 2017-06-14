import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './style/button-tabs.styl';

const ButtonTabs = ({ className, children }) => {
	const classes = cx('button-tabs', className);
	return (
		<div className={classes}>
			{children}
		</div>
	);
};

ButtonTabs.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

export default ButtonTabs;
