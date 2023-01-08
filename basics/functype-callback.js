function addFunc(num1, num2, cb) {
    const result = num1 + num2;
    cb(result);
}
function printNumber(n1) {
    console.log(n1);
}
addFunc(3, 4, (result) => {
    console.log(result);
});
addFunc(12, 9, printNumber);
function returnAddFunc(num1, num2, cb) {
    const result = num1 + num2;
    return cb(result);
}
const by5 = returnAddFunc(10, 20, (result) => {
    return result * 5;
});
console.log(by5);
