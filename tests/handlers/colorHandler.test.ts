import * as colorHandler from '../../src/handlers/colorHandler';

describe('ColorHandler', () => {

	describe('Get Color', () => {
		it('color name should return a valid color', () => {
			const color: colorHandler.IColor = colorHandler.getColor('white');
			expect(color).toEqual({R: 255, G: 255, B: 255});
		});
		it('hex color should return a valid color', () => {
			const color: colorHandler.IColor = colorHandler.getColor('#FFFFFF');
			expect(color).toEqual({R: 255, G: 255, B: 255});
		});

		it('invalid input should return black', () => {
			const color: colorHandler.IColor = colorHandler.getColor('invalid color');
			expect(color).toEqual({R: 0, G: 0, B: 0});
		});

		it('should return the same color for the same input', () => {
			const color1: colorHandler.IColor = colorHandler.getColor('white');
			const color2: colorHandler.IColor = colorHandler.getColor('#FFFFFF');
			expect(color1).toEqual(color2);
		});
	});

	describe('Theme class', () => {
		it('should create a theme with default values', () => {
			const theme = new colorHandler.Theme();
			expect(theme.foreground).toEqual(colorHandler.getColor('white'));
			expect(theme.background).toEqual(null);
			expect(theme.style).toEqual([]);
		});

		it('should create a theme with custom values', () => {
			const theme = new colorHandler.Theme('red', 'white', 'bold');
			expect(theme.foreground).toEqual(colorHandler.getColor('red'));
			expect(theme.background).toEqual(colorHandler.getColor('white'));
			expect(theme.style).toEqual([colorHandler.styles.bold]);
		});

		it('should create a theme with custom values (array)', () => {
			const theme = new colorHandler.Theme('red', 'white', ['bold', 'underscore']);
			expect(theme.foreground).toEqual(colorHandler.getColor('red'));
			expect(theme.background).toEqual(colorHandler.getColor('white'));
			expect(theme.style).toEqual([colorHandler.styles.bold, colorHandler.styles.underscore]);
		});
	});

});