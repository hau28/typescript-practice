import { useEffect } from "react";
import "./App.css";

function hello(
  personOrPeople: string[] | string = "random dude",
  date: Date,
  weather: "sunny" | "rainy" | "cloudy" = "sunny",
  callback: (n: number) => void = (n: number) => {
    console.log(n);
  }
): number {
  if (Array.isArray(personOrPeople)) {
    console.log(
      `Hello ${personOrPeople.join(
        " and "
      )}, today is ${date.toDateString()}. The weather is ${weather}.`
    );
  } else {
    console.log(`Hello ${personOrPeople}, today is ${date.toDateString()}`);
  }
  callback(5);
  return 1;
}

type Point = {
  x?: number;
  y?: number;
};

type Square = Point & {
  r?: number;
};

function printCoor(co: Point) {
  console.log("x: " + (co.x || 0));
  console.log("y: " + (co.y || 0));
}

function drawSquare({ x = 0, y = 0, r = 2 }: Square) {
  console.log(`Draw square (${x},${y},${r})`);
}

type Id = string | number;

function printId(id: Id) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

interface Fish {
  readonly type: string;
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

interface Duck extends Fish, Bird {}

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

function isFish(animal: any): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

type FunctionWithDesc = {
  desc: string;
  (arg: number): boolean;
};

function doSomething(fn: FunctionWithDesc) {
  console.log(fn.desc + " returned " + fn(4));
}

function firstElement(arr: any[]) {
  return arr[0]; // return value is any, but Ts infers it automaticly
}

// unnecessary
// function firstElement<Type>(arr: Type[]): Type {
//   return arr[0]; // return value is Type
// }

function longer<Type extends { length: number }>(a: Type, b: Type): Type {
  if (a.length > b.length) return a;
  return b;
}

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

function calc(fn: (a: number, b: number) => void) {
  return fn(5, 7);
}

function sumThreeNum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

type unvoidableFn = () => void;

const returnTrue: unvoidableFn = () => {
  return true;
};

type ReadonlyPerson = {
  readonly name: string;
  readonly age: number;
};

type Person = {
  name: string;
  age: number;
};

function makePersonReadonly(person: Person): ReadonlyPerson {
  return person;
}

function App() {
  useEffect(() => {
    hello(["Hau", "Linh"], new Date(), "cloudy");
    printCoor({ x: 3 });
    printId("123");
    const fish: Fish = {
      type: "fish",
      swim: () => {
        console.log("swiming");
      },
    };
    // fish.type = "not fish";
    move(fish);
    console.log(isFish(fish));
    const fnwithdesc: FunctionWithDesc = (num) => {
      return num % 2 === 0;
    };
    fnwithdesc.desc = "Is even number function";

    doSomething(fnwithdesc);
    console.log(longer("abcd", "yowtfman"));
    console.log(longer([1, 2, 3, 5], [7, 6, 8, 2, 3, 6, 4]));
    console.log(combine<string | number>([1, 4, 6, 7], ["how", "nice"]));
    console.log(
      calc((a) => {
        return a;
      })
    );
    console.log(sumThreeNum({ a: 1, b: 2, c: 3 }));
    console.log(returnTrue());
    drawSquare({ x: 5 });
    // console.log(longer(10,100));

    // const message = "hello";
    // message();
    // const user = {
    //   name: "hau",
    //   age: 21,
    // };
    // console.log(user.creditCardNumber);
    // const randomBool = Math.random < 0.5
  }, []);
  return (
    <div className="App">
      <h1>Typescript practice</h1>
    </div>
  );
}

export default App;
