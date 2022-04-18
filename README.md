# Three-card-poker-judger

- [Introduction](#introduction)

- [How to run the program](#how-to-run-the-program)

- [Design and overview](#design-and-overview)

- [Some Limitations](#some-limitations)

- [Running for development (Optional)](#development)

<!-- toc -->

## Introduction

This project evaluates the result of a three card poker game. The input of the program is a collection of players and their cards in this format:

```
3
0 2c As 4d
1 Kd 5h 6c
2 Jc Jd 9s
```

We can see on the first line a number representing the number of players. Then, on each line we have an id followed by three cards with a rank and a suit.

The program evaluates the best hand and returns the id of the winning player (player with the best hand). The program also handles all tie situations where players have similar results and breaks the ties based on the requirements provided with the assignment.

## How to run the program

This is a TypeScript project so all the code is transpiled into Javascript in the `dist` folder. So all the code inside `dist` is a result of TypeScript transpilation.
The source code that I wrote can be found inside `src` folder.
When we run the project we actually run the transpiled JavaScript not the TypeScript files directly. Therefore, to run the program you only
need to change the directory in the terminal to the `dist` folder where I already placed the test files that were provided with the assignment.
So in Short if you are in the root directory of the project where you can see `dist` and `src` and other project configuration files, run the following:

**IMPORTANT:** Before proceeding with the steps, please make sure you have `NodeJs` installed on your machine. it can be easily installed from the official website found here [found here](https://nodejs.org/en/).

```bash
cd ./dist
```

Then run the command:

```bash
./run_tests "node index.js"
```

If you need to add more tests to the project you can copy and paste them inside `dist/tests` folder and re-run the command above.
That's it for testing! Thank you!

## Design and overview

The project was written using TypeScript and utilized Object-Oriented Programming (OOP) feature to create robust and cohesive classes.
Under the `src/model` folder, you can find rich models for card, player, and hand object that was utilized to achieve the goal of the project.
These models encapsulate the behavior of the objects they represent.
Under the `src/services`, you can find the main evaluator class `PokerEvaluator.ts` that carries out the final evaluation process along
with some additional interfaces. `src/utils` folder has some helper functions that were used in the project. Finally, `index.ts` file at
the root of the project is where everything is connected together to deliver the final result.

## Some Limitations

- The project assumes that the cards `A` for ace `K` for king `Q` for queen and `J` for jack are always passed as uppercase. The program was not tested for the lower case with these cards and passing an invalid format might cause an error.
- if the format of the input is wrong other than the capitalization of the cards mentioned the program will throw a custom error message.
- The program assumes clean input in terms of number of instances the cards passed. For example, there is only one jack of clubs in a 52 card deck and we cannot have two instances of jack of clubs with two different players. However, the program will run and evaluate correctly but it will not be a realistic situation.

<h2 id="development">Running for development (Optional)</h2>

To run the project for development please do the following:

- you **DO NOT** need to do this for testing the output but in case you wanted to check the project in development please follow along.
- make sure you have nodejs installed
- install yarn with `npm i -g yarn`
- go to the root of the project and run `yarn` to install Typescript and other dev dependencies
- run `yarn watch` to watch for TypeScript changes and transpile the result to `dist`.
- in another terminal run `yarn dev` to run the transpiled JavaScript every time a change happens in the code.
- That's it! Check out `package.json` for more scripts and options.
