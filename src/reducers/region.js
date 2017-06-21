import regionsConstants from '../constants/regionsConstants';

const initialState = {
	'id': null,
	'title': '',
	'url': '',
	'mor': null,
	'subMor': null,
	isFetching: true
};

export default function regions(state = initialState, action) {
	switch (action.type) {
		case regionsConstants.REGIONS_GET_REGION:
			return {
				...state,
				isFetching: true
			};
		case regionsConstants.REGIONS_GET_REGION_SUCCESS: {
			return {
				...state,
				...action.result,
				isFetching: false
			};
		}
		case regionsConstants.REGIONS_REMOVE_REGION_FROM_STORE: {
			return initialState;
		}

		default:
			return state;
	}
}
