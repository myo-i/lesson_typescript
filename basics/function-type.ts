function add(num1: number, num2: number) {
    return num1 + num2;
}

let functionType: (a: number, b: number) => number;

functionType = add;

console.log(functionType(2,6));