import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import App from './containers/App';
// import Regions from './containers/Regions';
//import Region from './containers/Region';
// import Mors from './containers/Mors';
// import Mor from './containers/Mor';
import NotFound from './containers/NotFound';


/**
 * Interpolate a string which holds variables (i.e :userId) and replace all occurrences
 * by the values held in the `params` object.
 *
 * Given the string `/profile/:userId` and the params { userI	d: 'thomas' }
 * it returns `/profile/thomas`.
 */
function interpolateParams(string, params = {}) {
	return string.replace(/:([a-zA-Z]+)/g, (match, token1) => `${params[token1]}`);
}

/**
 * Conditionally render a component for a base route and all of its sub routes.
 * If any sub route is valid, we render the same base component, otherwise a 404.
 */
const RouteWithSubRoutes = (initialProps) => (
	<Route path={initialProps.path} render={(props) => {
		const validRoutes = [initialProps.path, ...initialProps.subRoutes]
								.map(route => interpolateParams(route, props.match.params));

		return validRoutes.includes(props.location.pathname)
			? <initialProps.baseComponent {...props} />
			: <NotFound location={props.location}/>;
	}}
	/>
);

export default
	<Switch>
		<Redirect exact from='/' to='/regions' />
		<RouteWithSubRoutes
			path='/'
			baseComponent={App}
			subRoutes={[
				'/regions',
				'/regions/:regionId',
				'/mors'
			]}
		/>
	</Switch>;
