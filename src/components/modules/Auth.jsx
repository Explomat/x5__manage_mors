import React from 'react';
import PropTypes from 'prop-types';

class Auth extends React.Component {

	_isDenied(name){
		const componentsDenied = this.props.componentsDenied;
		return componentsDenied.indexOf(name) !== -1;
	}

	render() {
		const children = this.props.children;
		if (!Array.isArray(children)) {
			return this._isDenied(children.type.name || children.type.displayName) ? null : children;
		}
		return null;
	}
}

Auth.propTypes = {
	componentsDenied: PropTypes.array,
	children: PropTypes.element
};

Auth.defaultProps = {
	componentsDenied: []
};

export default Auth;
