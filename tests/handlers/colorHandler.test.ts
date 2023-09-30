import {
	Color,
	Theme,
	colors,
	styles,
	getColor,
} from '../../src/handlers/colorHandler';

describe('ColorHandler', () => {
	describe('Get Color', () => {
		it('hex color should return a valid color', () => {
			const color: Color = getColor('#FFFFFF');
			expect(color).toEqual({R: 255, G: 255, B: 255});
		});
		it('color name should return a valid color', () => {
			const color: Color = getColor('white');
			expect(color).toEqual({R: 255, G: 255, B: 255});
		});

		it('invalid input should return black', () => {
			const color: Color = getColor('invalid color');
			expect(color).toEqual(colors.transparent);
		});

		it('should return the same color for the same input', () => {
			const color1: Color = getColor('white');
			const color2: Color = getColor('#FFFFFF');
			expect(color1).toEqual(color2);
		});
	});

	describe('Theme', () => {
		describe('constructor', () => {
			it('should create a theme with default values', () => {
				const theme = new Theme();
				expect(theme.foreground).toEqual(getColor('transparent'));
				expect(theme.background).toEqual(getColor('transparent'));
				expect(theme.style).toEqual([]);
			});
			
			it('should create a theme with custom values', () => {
				const theme = new Theme('red', 'white', 'bold');
				expect(theme.foreground).toEqual(getColor('red'));
				expect(theme.background).toEqual(getColor('white'));
				expect(theme.style).toEqual([styles.bold]);
			});
			
			it('should create a theme with custom values (array)', () => {
				const theme = new Theme('red', 'white', ['bold', 'underscore']);
				expect(theme.foreground).toEqual(getColor('red'));
				expect(theme.background).toEqual(getColor('white'));
				expect(theme.style).toEqual([styles.bold, styles.underscore]);
			});
			
			it('should create a theme with custom values (null)', () => {
				const theme = new Theme(null, null, null);
				expect(theme.foreground).toEqual(getColor('transparent'));
				expect(theme.background).toEqual(getColor('transparent'));
				expect(theme.style).toEqual([]);
			});
		});
		
		describe('addStyle', () => {
			it('should add a style to the style array', () => {
				const theme = new Theme();
				theme.addStyle('bold');
				expect(theme.style).toEqual([styles.bold]);
			});
			
			it('should add multiple styles to the style array', () => {
				const theme = new Theme();
				theme.addStyle('bold', 'underscore');
				expect(theme.style).toEqual([styles.bold, styles.underscore]);
			});
		});
		
		describe('removeStyle', () => {
			it('should remove a style from the style array', () => {
				const theme = new Theme(null, null, ['bold']);
				theme.removeStyle('bold');
				expect(theme.style).toEqual([]);
			});
			
			it('should remove multiple styles from the style array', () => {
				const theme = new Theme(null, null, ['bold', 'underscore']);
				theme.removeStyle('bold', 'underscore');
				expect(theme.style).toEqual([]);
			});
			
			it('should not remove a style that is not in the style array', () => {
				const theme = new Theme(null, null, ['bold']);
				theme.removeStyle('italic');
				expect(theme.style).toEqual([styles.bold]);
			});
		});
		
		describe('set style', () => {
			it('should set the style array', () => {
				const theme = new Theme();
				theme.style = ['bold'];
				expect(theme.style).toEqual([styles.bold]);
			});
			
			it('should set the style array (string)', () => {
				const theme = new Theme();
				theme.style = 'bold';
				expect(theme.style).toEqual([styles.bold]);
			});
			
			it('should not set an invalid style', () => {
				const theme = new Theme(null, null, ['invalid']);
				expect(theme.style).toEqual([]);
			});
		});
	});
});