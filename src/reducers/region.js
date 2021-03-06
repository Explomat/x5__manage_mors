import regionsConstants from '../constants/regionsConstants';
import morsConstants from '../constants/morsConstants';
import subMorsConstants from '../constants/subMorsConstants';
import moment from 'moment';
moment.locale('ru');

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

		case regionsConstants.REGIONS_SAVE_REGION: {
			return {
				...state,
				isFetching: true
			};
		}
		case regionsConstants.REGIONS_SAVE_REGION_SUCCESS: {
			return {
				...state,
				isFetching: false
			};
		}


		case regionsConstants.REGIONS_REMOVE_REGION_FROM_STORE: {
			return initialState;
		}

		case regionsConstants.REGIONS_SET_ALTERNATE_DATE: {
			return {
				...state,
				subMor: {
					...state.subMor,
					alternate_date: action.date
				}
			};
		}

		case morsConstants.MORS_SAVE: {
			const mor = action.selectedItems[0];
			return {
				...state,
				mor: mor ? {
					id: mor.id,
					name: mor.data.fullname
				} : null
			};
		}

		case subMorsConstants.SUB_MORS_SAVE: {
			const subMor = action.selectedItems[0];
			return {
				...state,
				subMor: subMor ? {
					id: subMor.id,
					name: subMor.data.fullname,
					alternate_date: moment().format()
				} : null
			};
		}

		default:
			return state;
	}
}
