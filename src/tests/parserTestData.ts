import { ICollectionToStringOptions } from '../utils/parser'

export const simpleObject: { [key: string]: any } = {
	name: 'Hello World',
	active: true,
	count: 8,
	status: 'good',
};

export const simpleArray: string[] = [
	'first',
	'second',
	'third'
];

export const nestObject: { [key: string]: any } = {
	name: 'First object test',
	enabled: true,
	suffix: '_stuff',
	obj: {
		name: 'John Doe',
		age: '20',
		work: 'developer',
		hobbies: [
			{
				name: 'programming',
				active: true,
				years: 5
			},
			{
				name: 'gaming',
				years: 10,
				favorite: true,
				games: {
					name: 'osu',
					genre: 'rhythm',
					years: 7,
				}
			},
		],
	},
	list: [
		'first',
		'second',
		'third'
	],
	emptyObj: {},
	emptyList: [],
};

export const DefaultCollectionToStringOptions: ICollectionToStringOptions = {
	indent: 1,
	indentString: '  ',
	currentIndent: 0,
	brackets: true, //TODO
	color: true, //TODO
	autoColor: true, //TODO
}