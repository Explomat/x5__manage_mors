import constants from '../constants';

export default function halves(state = {}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_GET_DATA_SUCCESS: {
			return {
				...action.entities.halves
			};
		}

		default:
			return state;
	}
}

