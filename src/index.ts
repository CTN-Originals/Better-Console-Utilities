// import * as color from './handlers/colorHandler';
import * as handler from './handlers';
import * as test from './test';

export * from './handlers';

test.test();

exports = {
	ConsoleInstance: handler.betterConsole.ConsoleInstance,
}
// console.log(color.tags.fg.red + 'Hello world!');

const cons = new handler.betterConsole.ConsoleInstance('');

//* Wait 10 minutes before exiting
setTimeout(() => {}, 1000 * 60 * 10); // 10 minutes

// console.log('hello world');
// console.log('hello world2');
// console.log('x = [fg=red]' + cons.settings.indent + '[bg=white] y = ' + cons.settings.indentString);
// console.group('Object cons: ');
// cons.log(JSON.parse(JSON.stringify(cons)));
// console.groupEnd();