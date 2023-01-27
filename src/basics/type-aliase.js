const value = 123;
function c2(input1, input2, option) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number" || option === "number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const cNumberTA = c2(111, 123, "number");
console.log(cNumberTA);
const cNumber2TA = c2("917", "354", "number");
console.log(cNumber2TA);
const cStringTA = c2("good ", "day", "text");
console.log(cStringTA);
function user(user) {
    console.log('Hi, I am ' + user.name);
}
function returnOlder(user, checkAge) {
    return checkAge > user.age;
}
const info = { name: "Mike", age: 21 };
user(info);
const oldAge = returnOlder(info, 19);
console.log(oldAge);
