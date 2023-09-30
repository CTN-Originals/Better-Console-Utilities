import { MessageObject, MessageContent } from '../../src/utils/parser';
import { 
	Color,
	Theme,
	colors,
	styles,
	getColor,
	TypeThemes,
	defaultColorProfile,
} from '../../src/handlers/colorHandler';

describe('MessageObject', () => {
	it('should create a MessageObject with default values', () => {
		const messageObject = new MessageObject();
		// console.log(messageObject);
		expect(messageObject.Depth).toEqual(0);
		expect(messageObject.IndentCount).toEqual(2);
		expect(messageObject.IndentString).toEqual(' ');
		expect(messageObject.Theme.typeThemes.object.key.foreground).toEqual(defaultColorProfile.typeThemes.object.key.foreground);
		expect(messageObject.Theme.typeThemes.object.key.background).toEqual(colors.transparent);
		expect(messageObject.Theme.typeThemes.object.key.style).toEqual(defaultColorProfile.typeThemes.object.key.style);
  	});

	it('should create a MessageObject with custom values', () => {
		const messageObject = new MessageObject({
			Depth: 1,
			IndentCount: 4,
			IndentString: '\t',
			Theme: {
				name: 'test',
				default: new Theme('#000000'),
				typeThemes: new TypeThemes({
					object: {
						default: new Theme('#ffffff'),
						key: new Theme('#ff0000', '#ffffff', styles.bold),
						value: {typeOverride: true, theme: new Theme('#00ff00', '#ffffff', styles.inverse)},
						brackets: new Theme('#0000ff', '#ffffff', styles.underscore),
						punctuation: new Theme('#ffff00', '#ffffff', styles.blink),
					}
				})
			}
		});
		expect(messageObject.Depth).toEqual(1);
		expect(messageObject.IndentCount).toEqual(4);
		expect(messageObject.IndentString).toEqual('\t');
		expect(messageObject.Theme.typeThemes.object.key.foreground).toEqual({R: 255, G: 0, B: 0});
		expect(messageObject.Theme.typeThemes.object.key.background).toEqual({R: 255, G: 255, B: 255});
		expect(messageObject.Theme.typeThemes.object.key.style[0]).toEqual(styles.bold);
	});
});