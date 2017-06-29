import regionsConstants from '../constants/regionsConstants';

export default function regions(state = {
	regions: [],
	search: '',
	page: 0,
	total: 1,
	isFetching: true,
	isFetchingScroll: false
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

		case regionsConstants.REGIONS_GET_DATA_ON_SCROLL:
			return {
				...state,
				isFetchingScroll: true
			};
		case regionsConstants.REGIONS_GET_DATA_ON_SCROLL_SUCCESS: {
			return {
				...state,
				...action.result,
				regions: state.regions.concat(action.result.regions),
				isFetchingScroll: false
			};
		}

		case regionsConstants.REGIONS_SET_SEARCH_VALUE: {
			return {
				...state,
				search: action.value
			};
		}

		default:
			return state;
	}
}
