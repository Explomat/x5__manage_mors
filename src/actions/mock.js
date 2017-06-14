// import numberToWords from 'number-to-words';
// import filter from 'lodash/filter';
// import findIndex from 'lodash/findIndex';
// import uuid from '../utils/uuid';
// import indexOf from 'lodash/indexOf';

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/* const calculatedFields = {
	// Total weight of individual indicators - Общий вес индивидуальных показателей
	'twoii': true,
	// Percent complete - Процент выполнения
	'pc': true,
	// Position in rating - ПОЗИЦИЯ В РЕЙТИНГЕ
	'pir': false,
	// Accuracy rating - СООТВЕТСТВИЕ РЕЙТИНГУ
	'ar': false,
	// Bonus percent - % премии
	'bp': true
};*/

function Task(_obj){
	const obj = _obj || {};
	const id = getRandomArbitrary(0, 1000000);
	return {
		id,
		name: obj.name || 'Задача ' + id,
		unit: obj.unit || '1',
		weight: obj.weight || '2',
		min: obj.min || '3',
		targ: obj.targ || '4',
		max: obj.max || '5',
		fact: obj.fact || '6',
		percent: obj.percent || '22',
		comment: obj.comment || 'Комментарий',
		isEdit: obj.isEdit === undefined ? true : obj.isEdit
	};
}

const assessment = {
	assId: getRandomArbitrary(1, 5),
	paId: getRandomArbitrary(1, 6),
	halves: [
		{
			id: 0,
			title: 'Half 0',
			startDate: new Date(),
			endDate: new Date(),
			categories: [
				{
					id: 0,
					title: 'Category 0',
					startDate: new Date(),
					endDate: new Date(),
					bossFullname: '\'ФИО руководителя\'',
					viewType: 0,
					data: {
						id: 0,
						viewType: 0,
						pas: [
							{
								id: 0,
								isEdit: true,
								title: 'Квартал 0',
								tasksHeader: {
									name: 'Наименование',
									unit: 'Ед. измерения',
									weight: 'Вес %',
									min: 'MIN',
									percent: '% выполнения'
								},
								tasks: [Task(), Task(), Task(), Task()],
								calcs: [
									{
										id: 0,
										name: '% выполнения',
										value: 0
									},
									{
										id: 1,
										name: 'Суммарный вес индивидуальных показателей',
										value: 25
									}
								]
							},
							{
								id: 1,
								isEdit: true,
								title: 'Квартал 1',
								tasksHeader: {
									name: 'Наименование',
									unit: 'Ед. измерения',
									weight: 'Вес %',
									min: 'MIN',
									percent: '% выполнения'
								},
								tasks: [ Task() ],
								calcs: [
									{
										id: 0,
										name: '% выполнения',
										value: 10
									},
									{
										id: 1,
										name: 'Суммарный вес индивидуальных показателей',
										value: 45
									}
								]
							}
						]
					}
				},
				{
					id: 1,
					title: 'Category 1',
					startDate: new Date(),
					endDate: new Date(),
					bossFullname: '\'ФИО руководителя\'',
					viewType: 1,
					data: {
						id: 1,
						viewType: 1,
						pas: [
							{
								id: getRandomArbitrary(0, 1000),
								isEdit: true,
								tasksHeader: {
									name: 'Наименование',
									unit: 'Ед. измерения',
									weight: 'Вес %',
									min: 'MIN',
									targ: 'targ',
									max: 'MAX',
									fact: 'ФАКТ',
									percent: '% выполнения',
									comment: 'Комментарий'
								},
								tasks: [ Task() ],
								calcs: [
									{
										id: 0,
										name: '% выполнения',
										value: 30
									},
									{
										id: 1,
										name: 'Суммарный вес индивидуальных показателей',
										value: 55
									}
								]
							}
						]
					}
				},
				{
					id: 2,
					title: 'Category 2',
					startDate: new Date(),
					endDate: new Date(),
					bossFullname: '\'ФИО руководителя\'',
					viewType: 2,
					data: {
						id: 2,
						viewType: 2,
						pas: [
							{
								id: getRandomArbitrary(0, 1000),
								isEdit: true,
								tasksHeader: {
									name: 'Наименование',
									unit: 'Ед. измерения',
									weight: 'Вес %',
									min: 'MIN',
									targ: 'targ',
									max: 'MAX',
									fact: 'ФАКТ',
									percent: '% выполнения',
									comment: 'Комментарий'
								},
								tasks: [ Task() ],
								calcs: [
									{
										id: 0,
										name: '% выполнения',
										value: 15
									},
									{
										id: 1,
										name: 'Суммарный вес индивидуальных показателей',
										value: 43
									}
								]
							}
						],
						
						tests: [
							{
								id: 'хуйнаны',
								name: 'Анализ числовой информации',
								score: '0',
								state: 'Не пройден',
								message: '',
								isAssignTest: false,
								isPassTest: false
							}
						],
							
						months: [
							{
								id: 0,
								title: 'Месяц 0',
								
								pas: [
									{
										id: getRandomArbitrary(0, 1000),
										isEdit: false,
										tasksHeader: {
											name: 'Наименование',
											unit: 'Ед. измерения',
											weight: 'Вес %',
											min: 'MIN',
											percent: '% выполнения'
										},
										tasks: [Task(), Task({ isEdit: false })],
										calcs: [
											{
												id: 0,
												name: '% выполнения',
												value: 16
											},
											{
												id: 1,
												name: 'Суммарный вес индивидуальных показателей',
												value: 75
											}
										]
									}
								]
								
							},
							{
								id: 1,
								isEdit: false,
								title: 'Месяц 1',
								pas: [
									{
										id: getRandomArbitrary(0, 1000),
										isEdit: false,
										tasksHeader: {
											name: 'Наименование',
											unit: 'Ед. измерения',
											weight: 'Вес %',
											min: 'MIN',
											percent: '% выполнения'
										},
										tasks: [ Task() ],
										calcs: [
											{
												id: 0,
												name: '% выполнения',
												value: 70
											},
											{
												id: 1,
												name: 'Суммарный вес индивидуальных показателей',
												value: 15
											}
										]
									}
								]
							}
						]
					}
					
				}
			]
		}
	]
};

export function getMockAssessment(){
	return assessment;
}