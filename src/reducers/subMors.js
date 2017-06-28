import subMorsConstants from '../constants/subMorsConstants';

const initialState = {
	headerCols: [],
	items: [],
	selectedItems: [],
	pagesCount: 1,
	page: 0,
	isFetching: true
};

export default function regions(state = initialState, action) {
	switch (action.type) {
		case subMorsConstants.SUB_MORS_GET_DATA:
			return {
				...state,
				isFetching: true
			};
		case subMorsConstants.SUB_MORS_GET_DATA_SUCCESS: {
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
