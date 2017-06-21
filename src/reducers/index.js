import { combineReducers } from 'redux';
import app from './app';
import regions from './regions';
import region from './region';
//import pas from './pas';

export default combineReducers({
	app,
	regions,
	region
});

/*export default function reducer(state = {}, action) {
	return {
		app: app(state.app, action),
		assessment: assessment(state.assessment, action),
		categories: categories(state.categories, action),
		categoryData: categoryData(state.categoryData, action),
		halves: halves(state.halves, action),
		months: months(state.months, action),
		pas: pas(state.pas, action),
		tasks: tasks(state.tasks, action),
		tests: tests(state.tests, action)
	};
}*/
