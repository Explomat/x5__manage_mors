import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style/compose-label.styl';

const ComposeLabel = ({ label, className, labelClassName, prevIconClassName, postIconClassName, onIconClick }) => {
	const classes = cx('compose-label', className);
	const labelClasses = cx('compose-label__label', labelClassName);
	const prevIconClasses = cx('compose-label__prev-icon', prevIconClassName);
	const postIconClasses = cx('compose-label__post-icon', postIconClassName);
	return (
		<span className={classes}>
			<i onClick={onIconClick} className={prevIconClasses} />
			<span className={labelClasses}>{label}</span>
			<i onClick={onIconClick} className={postIconClasses} />
		</span>
	);
};

ComposeLabel.propsTypes = {
	onIconClick: PropTypes.func,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	prevIconClassName: PropTypes.string,
	postIconClassName: PropTypes.string
};

export default ComposeLabel;
