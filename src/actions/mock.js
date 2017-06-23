// import numberToWords from 'number-to-words';
// import filter from 'lodash/filter';
// import findIndex from 'lodash/findIndex';
// import uuid from '../utils/uuid';
// import indexOf from 'lodash/indexOf';

// function getRandomArbitrary(min, max) {
// 	return Math.floor(Math.random() * (max - min)) + min;
// }

const regions = [
	{
		'id': 1,
		'title': 'Регион Измайловский',
		'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Regions&region_id=1',
		'isEdit': true,
		'mor': {
			'id': 11,
			'name': 'MORdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd_11',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=11'
		}
	},
	{
		'id': 2,
		'title': 'Регион Нижний Новгород 1',
		'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Regions&region_id=2',
		'isEdit': true,
		'mor': {
			'id': 13,
			'name': 'MOR_13',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=13'
		},
		'subMor': {
			'id': 14,
			'name': 'SUB_MOR_14',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=14',
			'alternate_date': '14.06.2017',
			'alternate_creater_fullname': 'MOR_13'
		}
	},
	{
		'id': 3,
		'title': 'Регион Тюмень',
		'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Regions&region_id=3',
		'isEdit': false,
		'mor': {
			'id': 15,
			'name': 'MOR_15',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=15'
		},
		'subMor': {
			'id': 16,
			'name': 'SUB_MOR_16',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=16',
			'alternate_date': '14.06.2017',
			'alternate_creater_fullname': 'MOR_15'
		}
	},
	{
		'id': 4,
		'title': 'Регион Щелковский',
		'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Regions&region_id=4',
		'isEdit': false,
		'mor': {
			'id': 17,
			'name': 'MOR_17',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=17'
		},
		'subMor': {
			'id': 18,
			'name': 'SUB_MOR_18',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=18',
			'alternate_date': '14.06.2017',
			'alternate_creater_fullname': 'MOR_17'
		}
	},
	{
		'id': 5,
		'title': 'Регион Ярославский',
		'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Regions&region_id=5',
		'isEdit': false,
		'mor': {
			'id': 19,
			'name': 'MOR_19',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=19'
		},
		'subMor': {
			'id': 20,
			'name': 'SUB_MOR_20',
			'url': '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=20',
			'alternate_date': '14.06.2017',
			'alternate_creater_fullname': 'MOR_19'
		}
	}
];

const collaborators = {
	headerCols: [ { name: 'name', type: 'integer' } ],
	items: [
		{ id: '1', data: { fullname: '1' } },
		{ id: '2', data: { fullname: '2' } },
		{ id: '3', data: { fullname: '3' } },
		{ id: '4', data: { fullname: '4' } },
		{ id: '5', data: { fullname: '1' } },
		{ id: '6', data: { fullname: '2' } },
		{ id: '7', data: { fullname: '3' } },
		{ id: '8', data: { fullname: '4' } },
		{ id: '9', data: { fullname: '1' } },
		{ id: '10', data: { fullname: '2' } },
		{ id: '11', data: { fullname: '3' } },
		{ id: '12', data: { fullname: '4' } },
		{ id: '13', data: { fullname: '1' } },
		{ id: '14', data: { fullname: '2' } },
		{ id: '15', data: { fullname: '3' } }
	],
	page: 1,
	pagesCount: 2
};

export function getMockRegions(){
	return {
		regions,
		paging: {
			limit: 5,
			offset: 0,
			total: 64
		}
	};
}

export function getMockRegion(regionId){
	return {
		...regions.filter(r => r.id.toString() === regionId.toString())[0]
	};
}

export function getMockCollaborators(){
	return {
		...collaborators,
		items: [ ...collaborators.items ]
	};
}
