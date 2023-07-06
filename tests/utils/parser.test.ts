import { MessageObject, MessageContent } from '../../src/utils/parser';
import { 
	Color,
	Theme,
	colors,
	styles,
	getColor,
} from '../../src/handlers/colorHandler';

describe('MessageObject', () => {
	it('should create a MessageObject with default values', () => {
		const messageObject = new MessageObject();
		// console.log(messageObject);
		expect(messageObject.Depth).toEqual(0);
		expect(messageObject.IndentCount).toEqual(2);
		expect(messageObject.IndentString).toEqual(' ');
		expect(messageObject.Theme.foreground).toEqual(colors.transparent);
		expect(messageObject.Theme.background).toEqual(colors.transparent);
		expect(messageObject.Theme.style).toEqual([]);
  	});

	it('should create a MessageObject with custom values', () => {
		const messageObject = new MessageObject({
			Depth: 1,
			IndentCount: 4,
			IndentString: '\t',
			Theme: new Theme('red', 'white', 'bold'),
		});
		expect(messageObject.Depth).toEqual(1);
		expect(messageObject.IndentCount).toEqual(4);
		expect(messageObject.IndentString).toEqual('\t');
		expect(messageObject.Theme.foreground).toEqual({R: 255, G: 0, B: 0});
		expect(messageObject.Theme.background).toEqual({R: 255, G: 255, B: 255});
		expect(messageObject.Theme.style[0]).toEqual(styles.bold);
	});
});