# Better-Console-Utilities
This node.js module provides a better way of handling the build-in console for node.js and also adds custom colors with auto colorization and custom color tags.

## How to install
You can install this module through npm:
```bash
$ npm install better-console-utilities
```

## How to use
```javascript
var betterConsole = require("better-console-utilities");
```
This is all you need to do to use this module. The module is now loaded into a variable and you can access all of the functions and variables within it.

#### Creating a new console
```javascript
var myConsole = new betterConsole.ConsoleInstance();
```
This creates a new console object.

#### Using the console
>```javascript
>var myConsole = new betterConsole.ConsoleInstance();
>myConsole.log("Hello World!");
>```
> Hello World!

---

>```javascript
>var myConsole = new betterConsole.ConsoleInstance();
>myConsole.log({hello: "world", foo: "bar"});
>``` 
>```
>{
>  hello: world, 
>  foo: bar
>}
>```
This prints the object in a JSON format. This also works with arrays.

---

### More Coming Soon
...