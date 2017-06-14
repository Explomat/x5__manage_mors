import constants from '../constants';

export default function assessment(state = {
	assId: null,
	halves: [],
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_GET_DATA:
			return {
				...state,
				isFetching: true
			};
		case constants.ASSESSMENT_GET_DATA_SUCCESS: {
			return {
				...action.result,
				isFetching: false
			};
		}

		default:
			return state;
	}
}

