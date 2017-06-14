import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App';
import Test from '../containers/Test';
// import UserPage from './containers/UserPage'
// import RepoPage from './containers/RepoPage'

// export default
//     <Route path="/" component={App}>
//         <Route path="/:login/:name"
//             component={RepoPage} />
//         <Route path="/:login"
//             component={UserPage} />
//     </Route>

export default
	<div>
		<Route exact path='/' component={App} />
		<Route path='/test' component={Test} />
	</div>;
