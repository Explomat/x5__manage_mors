import regionsConstants from '../constants/regionsConstants';

export default function regions(state = {
	regions: [],
	isFetching: true
}, action) {
	switch (action.type) {
		case regionsConstants.REGIONS_GET_DATA:
			return {
				...state,
				isFetching: true
			};
		case regionsConstants.REGIONS_GET_DATA_SUCCESS: {
			return {
				...state,
				...action.result,
				isFetching: false
			};
		}

		default:
			return state;
	}
}
