import constants from '../constants';

export default function categories(state = {}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_GET_DATA_SUCCESS: {
			return {
				...action.entities.categories
			};
		}

		default:
			return state;
	}
}