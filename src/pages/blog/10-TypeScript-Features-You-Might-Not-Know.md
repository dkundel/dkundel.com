---
title: '10 TypeScript Features You Might Not Know'
publishDate: '2017-06-18 19:00:00'
image: '/blog/typescript-header.png'
imageAlt: 'Decorative header image with title of the post.'
# imageWidth: 1200
# imageHeight: 630
desc: 'TypeScript constantly evolves with monthly updates to the langauge. This is a list of 10 of my favorite recent additions to the language and its tooling that you might have missed.'
author: 'Dominik Kundel'
layout: '@layouts/BlogLayout.astro'
tags: [typescript, tsc]
---

Recently [TypeScript](http://www.typescriptlang.org/) is increasingly gaining popularity and companies like [Slack are praising their move to TypeScript](https://slack.engineering/typescript-at-slack-a81307fa288d). But with TypeScript shipping monthly updates to the language and its tools even a regular TypeScript developer might lose track of what is being added.

Here is a list of 10 of my favorite recent additions to the language since version 2.0:

### 1. `tsc --init`

This is a great feature if you want to start off a new TypeScript project. If you run in a folder:

```bash
tsc --init
```

TypeScript will automatically create a `tsconfig.json` in your directory. The neat thing is that it automatically populates it will all available options (some of them commented out) and a description of the respective option. This is especially useful if you are new to TypeScript and want to get an overview of all options.

If you just want an overview of all available options you can also try out this command:

```bash
tsc --help --all
```

### 2. `extends` in `tsconfig.json`

Have you found yourself in the situation where you needed two separate `tsconfig.json` files for example for tests but most of the options were shared? With the `extends` option we can specify a configuration file that we want to base our current file on.

As an example lets say we typically compile our code with a target of `esnext`:

```json tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "strict": true
  }
}
```

But we want to create a separate version that is `es5` compatible. We can extend from the new config from the existing one:

```json tsconfig-es5.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "target": "es5",
    "outDir": "./es5"
  }
}
```

If we now run the compiler with this file it will take the flags from the `tsconfig.json` and override the `target` with `es5` and add the `outDir` option. You can specify a certain config file in the TypeScript compiler with the `-p` option:

```bash
tsc -p tsconfig-es5.json
```

### 3. `type` vs `interface`

Typically you type objects in two different ways in TypeScript. Either by using `type` or by using `interface`:

```ts
type MyObjectUsingType = {
  foo: string;
  bar: number;
};

const option1: MyObjectUsingType = {
  foo: 'hello',
  bar: 42,
};

interface MyObjectUsingInterface {
  foo: string;
  bar: number;
}

const option2: MyObjectUsingInterface = {
  foo: 'hello',
  bar: 42,
};
```

On the first glimpse there is not really a difference except of some minor syntax differences. However, `interface` has a few benefits. Namely that we can both `extend` as well as `implement` it:

```ts
interface DrivedFromInterface extends MyObjectUsingInterface {
  bla: boolean;
}

class MyClass implements MyObjectUsingInterface {
  foo: string = 'some string';
  bar: number = 43;
}
```

Addtionally you will be able to redefine an interface multiple times which means you will be able to add addtional parameters at different parts in your code.

### 4. `keyof`

This is one of my favorite recent additions that was added version `2.1`. Let's say we have a type of an interface `Configuration`:

```ts
interface Configuration {
  baseUrl: string;
  ttl: number;
}
```

We want to write a `set` method that retrieves a key and a value. With `keyof` we can create "dynamically" a type that represents all possible keys of `Configuration`:

```ts
type ConfigurationOption = keyof Configuration;
```

Now we can write a function that is typed and automatically ensures that both `key` and `value` have the correct types:

```ts
function set<T extends ConfigurationOption>(key: T, value: Configuration[T]) {
  console.log(`Setting: ${key} to ${value}`);
}

set('baseUrl', 'https://moin.world');
set('ttl', 42);
set('baseUrl', true); // Invalid! Compiler catches this.
```

Now we have a function that will not only check that we are passing in a valid value for `key` but also that the type of `value` is the right one for the respective option.

### 5. Mapped Types

Now that we know about the power of `keyof` let me show you one more awesome thing related to this. This is not limited to types generated with `keyof` though.

Let's say we have our types from earlier:

```ts
interface Configuration {
  baseUrl: string;
  ttl: number;
}

type ConfigurationOption = keyof Configuration;
```

We want to create a new type of a map that tracks when the respective value has last been updated. We basically need a new type that maps for every key of the `Configuration` interface to a `Date` object. We can do this with mapped types really easily:

```ts
type ConfigurationLastUpdated = { [O in ConfigurationOption]: Date };

const updated: ConfigurationLastUpdated = {
  baseUrl: new Date(),
  ttl: new Date(),
};
```

We can do the same with any other union-type as well:

```ts
type Color = 'red' | 'blue' | 'green';

type ColorToRgb = { [C in Color]?: string };

const rgbMap: ColorToRgb = {
  red: '#ff0000',
};
```

### 6. Mixin classes

Mixin classes are an addition that came in TypeScript version `2.2` in February 2017. It's a way for you to extend classes in a dynamical fashion. Let's say we have a set of 2D classes:

```ts
class Point {
  x: number = 0;
  y: number = 0;
}

class Line {
  x: number = 0;
  y: number = 0;
  length: number = 0;
}
```

Now we want to have an easy way to turn these classes into classes ready for the third dimension. This is what we can use mixin classes for. Before we can write one we first need to add a quick helper type though:

```ts
type Constructor<T> = new (...args: any[]) => T;
```

With this type given we can create a function that receives a `Constructor` as a base and returns an anonymous class that extends from this base class and adds a `z` property:

```ts
function ThirdDimension<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    z: number = 0;
    constructor(...args: any[]) {
      super(...args);
    }
  };
}
```

Given this function we can then easily create new classes based on our existing ones in a dynamic fashion:

```ts
const Point3D = ThirdDimension(Point);

const p = new Point3D();
p.z = -1;
```

### 7. `object` vs `Object`

`Object` has been around as a type for quite a while but in `2.2` TypeScript introduced a new type `object`. The difference in spelling is minimal but they represent completely different groups of objects.

`Object` is basically anything that is not `undefined` or `null`. On the contrary `object` represents anything that isn't a primitive type (`string`, `number`, `boolean`, etc.) plus `undefined`.

The reason why this type exists is that there is a set of functions like `Object.create` that get an `object` as argument. With the introduction of `object` as a type we can now properly type these function calls and catch mistakes early.

```ts
const foo: Object = 'foo';
const bar: object = 'bar'; // ==> This is invalid
const bla: object = new Date();
```

### 8. Transpiling `async`/`await` to ES5/ES3

If you are a fan of [`async`/`await`](https://www.twilio.com/blog/2015/10/asyncawait-the-hero-javascript-deserved.html) but were bummed out that you had to support ES5 or even ES3 as your target, you will love this. TypeScript is able to transpile `async`/`await` to both ES5 and ES3 as long as you have a `Promise` polyfill.

Simply add the respective libs to the `lib` property in the `tsconfig.json` and adjust the `target` to your preferred target:

```json tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es3",
    "lib": ["dom", "es2015", "es2015.promise"]
  }
}
```

From that moment on you can use `async`/`await` simply in your code:

```ts
async function hello(): Promise<string> {
  const x = await Promise.resolve('foo');

  return x;
}

hello().then((x: string) => {
  console.log(x);
});
```

### 9. String valued enums

This is a feature that has been long in the making. In fact some of the [issues date back to 2014](https://github.com/Microsoft/TypeScript/issues/1206) and earlier. Now in TypeScript version `2.4` we are finally getting them: string valued enums 🎊

Using them is super straight forward:

```ts
enum Color {
  Red = '#ff0000',
  Green = '#00ff00',
  Blue = '#0000ff',
}

const myFavoriteColor = Color.Green;
let chosenColor = Color.Red;
```

In this case `myFavoriteColor` will be of the value `'#00ff00'` during runtime and it has the type of `Color.Green` since it's a constant. For the `chosenColor`, TypeScript will automatically walk one step up and assign it the type `Color` since it could change over time. The value assignned during runtime will be `'#ff0000'` as expected.

The important part is that for string valued enums you will need an initializer while numeric ones can be inferred. However, this allows you to also mix the two:

```ts
enum ErrorCodes {
  NotFound = 404,
  MethodNotAllowed,
  Unknown = 'unknown',
}

console.log(ErrorCodes.NotFound === 404);
console.log(ErrorCodes.MethodNotAllowed === 404);
console.log(ErrorCodes.Unknown === 'unknown');
```

In this case we specify a numeric value for `ErrorCodes.NotFound` of `404` and because `ErrorCodes.MethodNotAllowed` follows in the listing, it will automatically be assigned `405`. `ErrorCodes.Unknown`, however, is assigned to a string value of `'unknown'`. This is only possible due to the strict enforcing of having an initializer for string values.

### 10. `allowJs`, `checkJs`, `// @ts-check`

These three options are very exciting if you are new to TypeScript or if you have existing JavaScript.

If you pass the `--allowJs` flag to the TypeScript compiler or if you enable it in the `tsconfig.json` file, TypeScript will automatically pick up your JavaScript files to compile them. This means you can use this feature for example to transpile your ES2015 code to ES5 without the use of a tool like Babel.

TypeScript won't perform any type checks on these files unless you pass the `--checkJs` flag that was introduced in TypeScript version `2.3`. If you want to enable this only for specific files you can simply add a comment to the top of your file:

```js
// @ts-check

console.log('I will be type checked');
```

Similarly you can disable it on selected files using `// @ts-nocheck` of for a specific line by adding above the line `// @ts-ignore`.

These features also work in combination with the respective editor integrations like in VS Code. It's super useful if you want to move your code base over to TypeScript but you can't change the actual files to TypeScript yet for whatever reason.

### Summary

This is just a small overview of a few features that are currently in TypeScript (or are coming this month) that I'm excited about. But there is much more planned, including [Variadic types](https://github.com/Microsoft/TypeScript/issues/5453), [ambient decorators](https://github.com/Microsoft/TypeScript/issues/2900) (decorators that are only there during compile time) but don't affect runtime and much more. A great overview of what's planned is the [Roadmap in the TypeScript wiki](https://github.com/Microsoft/TypeScript/wiki/Roadmap).

I would love to hear what your experience with TypeScript is, why you do or do not like it and what your favorite TypeScript feature is. Simply shoot me a message on Twitter [@dkundel](https://twitter.com/dkundel).
