import { combineReducers } from 'redux';
import app from './app';
import { routerReducer as router } from 'react-router-redux';
import assessment from './assessment';
import categories from './categories';
import categoryData from './categoryData';
import halves from './halves';
import months from './months';
import pas from './pas';
import tasks from './tasks';
import tests from './tests';


const rootReducer = combineReducers({
	router,
	app,
	assessment,
	categories,
	categoryData,
	halves,
	months,
	pas,
	tasks,
	tests
});
export default rootReducer;

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
