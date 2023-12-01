import { ICollectionToStringOptions } from '../../src/utils/parser'
import { 
	Theme,
	Color,
} from '../handlers/colorHandler';

export const simpleObject: { [key: string]: any } = {
	name: 'Hello World',
	active: true,
	count: 8,
	status: 'good',
	list: [
		'first',
		'second',
		'ctn',
		12345,
	],
};

export const simpleArray: any[] = [
	'first',
	'second',
	'third',
	12345,
	{
		name: 'Hello World',
		active: true,
		count: 8,
	}
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
		bio: 'I am a person who likes to write code and play games. \nI have a dog named "Doggo" who is a good boy. \nI am currently working on a website for my community.',
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
		'second',
		'ctn',
		12345,
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