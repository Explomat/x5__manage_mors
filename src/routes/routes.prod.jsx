import React from 'react'
import { Route } from 'react-router-dom'
import App from './containers/App'
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
	<Switch>
		<Route exact path='/' component={App} />
		<Route path='/view_doc.html?mode=:mode/' component={Test} />
	</Switch>;
