import constants from '../constants';

export default function months(state = {}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_GET_DATA_SUCCESS: {
			return {
				...action.entities.months
			};
		}

		default:
			return state;
	}
}

