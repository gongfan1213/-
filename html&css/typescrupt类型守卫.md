在 TypeScript 里，类型守卫是一种在运行时检查来确保某个变量属于特定类型的机制。它能够缩小类型范围，让 TypeScript 编译器在特定代码块里明确变量的具体类型，从而提升类型安全性和代码的可维护性。以下为你详细介绍几种常见的类型守卫及其使用方法。

### 1. `typeof` 类型守卫
`typeof` 是 JavaScript 中的一个操作符，在 TypeScript 里可以作为类型守卫使用，用于判断基本数据类型，如 `number`、`string`、`boolean`、`object`、`function` 等。

```typescript
function printValue(value: string | number) {
    if (typeof value === 'string') {
        // 在这个代码块中，TypeScript 知道 value 是 string 类型
        console.log(value.toUpperCase()); 
    } else {
        // 这里 value 是 number 类型
        console.log(value.toFixed(2)); 
    }
}

printValue('hello'); 
printValue(123); 
```
在上述代码中，`typeof value === 'string'` 就是一个类型守卫，当这个条件为 `true` 时，TypeScript 编译器会将 `value` 的类型缩小为 `string`，因此可以安全地调用 `toUpperCase` 方法；当条件为 `false` 时，`value` 的类型就被确定为 `number`，可以调用 `toFixed` 方法。

### 2. `instanceof` 类型守卫
`instanceof` 操作符用于检查一个对象是否是某个类或构造函数的实例，在 TypeScript 中可作为类型守卫来缩小对象的类型范围。

```typescript
class Animal {
    speak() {
        console.log('Animal makes a sound');
    }
}

class Dog extends Animal {
    bark() {
        console.log('Dog barks');
    }
}

function interactWithAnimal(animal: Animal) {
    if (animal instanceof Dog) {
        // 在这个代码块中，animal 被缩小为 Dog 类型
        animal.bark(); 
    } else {
        animal.speak(); 
    }
}

const myDog = new Dog();
const myAnimal = new Animal();
interactWithAnimal(myDog); 
interactWithAnimal(myAnimal); 
```
在上述例子中，`animal instanceof Dog` 作为类型守卫，当条件为 `true` 时，`animal` 的类型被缩小为 `Dog`，可以调用 `bark` 方法；当条件为 `false` 时，`animal` 就是 `Animal` 类型，调用 `speak` 方法。

### 3. `in` 类型守卫
`in` 操作符用于检查一个对象是否具有某个属性，在 TypeScript 中可以作为类型守卫来区分不同类型的对象。

```typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function getPet(pet: Bird | Fish) {
    if ('fly' in pet) {
        // 在这个代码块中，pet 被缩小为 Bird 类型
        pet.fly(); 
    } else {
        // 这里 pet 是 Fish 类型
        pet.swim(); 
    }
}

const myBird: Bird = {
    fly() { console.log('Flying...'); },
    layEggs() { console.log('Laying eggs...'); }
};
const myFish: Fish = {
    swim() { console.log('Swimming...'); },
    layEggs() { console.log('Laying eggs...'); }
};

getPet(myBird); 
getPet(myFish); 
```
在这个例子中，`'fly' in pet` 作为类型守卫，当这个条件为 `true` 时，`pet` 的类型被缩小为 `Bird`，可以调用 `fly` 方法；当条件为 `false` 时，`pet` 的类型就是 `Fish`，可以调用 `swim` 方法。

### 4. 用户自定义类型守卫
除了上述内置的类型守卫，还可以创建自定义的类型守卫函数，通过返回一个布尔值来判断某个变量是否属于特定类型。

```typescript
interface Square {
    kind: 'square';
    size: number;
}

interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}

type Shape = Square | Rectangle;

function isSquare(shape: Shape): shape is Square {
    return shape.kind === 'square';
}

function getArea(shape: Shape) {
    if (isSquare(shape)) {
        // 在这个代码块中，shape 被缩小为 Square 类型
        return shape.size * shape.size; 
    } else {
        // 这里 shape 是 Rectangle 类型
        return shape.width * shape.height; 
    }
}

const square: Square = { kind: 'square', size: 5 };
const rectangle: Rectangle = { kind: 'rectangle', width: 3, height: 4 };

console.log(getArea(square)); 
console.log(getArea(rectangle)); 
```
在上述代码中，`isSquare` 是一个自定义的类型守卫函数，返回类型 `shape is Square` 是一个类型谓词，它告诉 TypeScript 编译器，如果 `isSquare` 函数返回 `true`，那么 `shape` 的类型就是 `Square`。这样在调用 `isSquare(shape)` 为 `true` 的代码块中，`shape` 的类型就被缩小为 `Square`。 