import constants from '../constants';

/*function _test(state = {
	
}, action){
	switch (action.type) {
		case constants.ASSESSMENT_ACTIVATE_TEST_SUCCESS: {
			return {
				...state,
				isAssignTest: true
			};
		}

		default:
			return state;
	}
}*/

export default function tests(state = {}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_GET_DATA_SUCCESS: {
			return {
				...action.entities.tests
			};
		}
		
		case constants.ASSESSMENT_ACTIVATE_TEST_SUCCESS: {
			const { test } = action;
			return {
				...state,
				[test.id]: test
			};
		}

		default:
			return state;
	}
}

