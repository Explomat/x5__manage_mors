import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

class ButtonTab extends React.Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		if (this.props.onClick){
			this.props.onClick(this.props.payload, this.props.value);
		}
	}

	render(){
		const classes = cx({
			'button-tabs__tab': true,
			'button-tabs__tab--selected': this.props.selected
		}, this.props.className);
		return (
			<button onClick={this.handleClick} className={classes}>{this.props.value}</button>
		);
	}
}

ButtonTab.propTypes = {
	payload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClick: PropTypes.func,
	selected: PropTypes.bool,
	className: PropTypes.string
};

ButtonTab.defaultProps = {
	selected: false
};

export default ButtonTab;
