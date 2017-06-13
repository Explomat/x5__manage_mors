import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cx from 'classnames';
import './style/checkbox.styl';

class CheckBox extends Component {

	constructor(props){
		super(props);

		this.handleToggleChecked = this.handleToggleChecked.bind(this);
		this.state = {
			checked: 'checked' in props ? props.checked : props.defaultChecked
		};
	}

	componentWillReceiveProps(nextProps){
		if ('checked' in nextProps) {
			this.setState({
				checked: nextProps.checked
			});
		}
	}

	shouldComponentUpdate(...args) {
		return PureRenderMixin.shouldComponentUpdate.apply(this, args);
	}

	handleToggleChecked(e){
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();

		const { state, props } = this;
		if (props.disabled) {
			return;
		}

		const newState = !state.checked;
		if (!('checked' in props)) {
			this.setState({
				checked: newState
			});
		}

		props.onChange(newState, {
			target: {
				...props,
				checked: newState
			},
			stopPropagation() {
				e.stopPropagation();
			},
			preventDefault() {
				e.preventDefault();
			}
		});
	}

	render() {
		const { name, style, type, label, disabled, tabIndex, ...others } = this.props;
		const globalProps = Object.keys(others).reduce((prev, key) => {
			if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
				prev[key] = others[key];
			}
			return prev;
		}, {});

		const { checked } = this.state;

		const classes = cx({
			'md-checkbox': true
		}, this.props.className);

		const checkboxIconClasses = cx({
			'md-icon': true,
			'md-icon--disabled': disabled,
			'md-icon--checked': checked
		});
		return (
			<div style={style} className={classes} onClick={this.handleToggleChecked}>
				<div className='md-container'>
					<div className={checkboxIconClasses} />
					<input
						name={name}
						type={type}
						className='md-container__checkbox-input'
						checked={checked}
						tabIndex={tabIndex}
						{...globalProps}
					/>
				</div>
				<div className='md-label'>
					<span>{label}</span>
				</div>
			</div>
		);
	}
}

CheckBox.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	name: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	tabIndex: PropTypes.string
};

CheckBox.defaultProps = {
	className: '',
	style: {},
	type: 'checkbox',
	defaultChecked: false,
	onChange() {}
};

export default CheckBox;
