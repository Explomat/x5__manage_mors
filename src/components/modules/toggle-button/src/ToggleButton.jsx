import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style/toggle-button.styl';

class ToggleButton extends React.Component {

	handleToggle(){
		if (this.props.onChange){
			this.props.onChange(!this.props.checked);
		}
	}

	render() {
		const { id, checked } = this.props;
		const classes = cx('toggle-button', this.props.className);
		return (
			<div className={classes}>
				<input
					onChange={::this.handleToggle}
					type='checkbox' className='toggle-button__input'
					id={id}
					checked={checked}
				/>
				<label className='toggle-button__checkbox' htmlFor={id} />
			</div>
		);
	}
}

ToggleButton.propsTypes = {
	id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string
};

ToggleButton.defaultProps = {
	checked: false
};

export default ToggleButton;
