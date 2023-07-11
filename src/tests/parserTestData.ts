import { ICollectionToStringOptions } from '../../src/utils/parser'
import { 
	Theme,
	Color,
	getColor,
	getColorCodePrefix,
} from '../handlers/colorHandler';

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

const color = new Color('#000080').seturate(0.1);

export const nestObject: { [key: string]: any } = {
	// name: `${getColorCodePrefix(color, false)}First object test ${color.asHex}`,
	name: `First object test`,
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
					name: 'rocket league',
					genre: 'skill based',
					years: 8,
				}
			},
		],
	},
	list: [
		'first',
		'ctn',
		'second',
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