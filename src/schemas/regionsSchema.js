import { schema } from 'normalizr';

// const task = new schema.Entity('tasks');
// const pa = new schema.Entity('pas', { tasks: [ task ] });
// const month = new schema.Entity('months', { pas: [ pa ] });
// const test = new schema.Entity('tests');
// const categoriesData = new schema.Entity('categoryData',
// 	{
// 		pas: [ pa ],
// 		months: [ month ],
// 		tests: [ test ]
// 	}
// );
// const category = new schema.Entity('categories', { data: categoriesData });
// const half = new schema.Entity('halves', { categories: [ category ] });
//
// const assessment = new schema.Object({
// 	halves: [ half ]
// });
//
// export default assessment;

const mor = new schema.Entity('mor');
const subMor = new schema.Entity('subMor');

const regions = new schema.Entity('regions', {
	mor: mor,
    subMor: subMor
});

export default regions;
