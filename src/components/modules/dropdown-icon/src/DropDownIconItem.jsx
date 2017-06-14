import React from 'react';
import PropTypes from 'prop-types';

export default class DropDownIconItem extends React.Component {

	handleClick(e) {
		if (this.context.onToggle){
			this.context.onToggle();
		}
		if (this.props.onClick)			{
			this.props.onClick(e, this.props.payload, this.props.text);
		}
	}

	render() {
		const { text } = this.props;
		return (
			<li className='dropdown-icon__item' onClick={::this.handleClick}>
				<span>{text}</span>
			</li>
		);
	}
}

DropDownIconItem.PropTypes = {
	payload: PropTypes.string,
	text: PropTypes.string
};

DropDownIconItem.contextTypes = {
	onToggle: PropTypes.func
};
