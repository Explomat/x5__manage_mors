import constants from '../constants';

export default function categoryData(state = {}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_GET_DATA_SUCCESS: {
			return {
				...action.entities.categoryData
			};
		}

		default:
			return state;
	}
}