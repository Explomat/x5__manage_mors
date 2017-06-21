import React from 'react';
import PropTypes from 'prop-types';

const NotFoundContainer = ({ error, location }) => (
	<h3>{error} <code>{location.pathname}</code></h3>
);

NotFoundContainer.propTypes = {
	error: PropTypes.string
};

NotFoundContainer.defaultProps = {
	error: 'Страница не найдена'
};

export default NotFoundContainer;
