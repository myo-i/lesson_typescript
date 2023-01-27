function add2(num1: number, num2: number) {
    return num1 + num2;
}

let functionType: (a: number, b: number) => number;

functionType = add2;

console.log(functionType(2,6));