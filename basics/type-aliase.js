// type-aliase初期化例
var value = 123;
function c(input1, input2, option) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number" || option === "number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var cNumber = c(111, 123, "number");
console.log(cNumber);
var cNumber2 = c("917", "354", "number");
console.log(cNumber);
var cString = c("good ", "day", "text");
console.log(cString);
function user(user) {
    console.log('Hi, I am ' + user.name);
}
function returnOlder(user, checkAge) {
    return checkAge > user.age;
}
var info = { name: "Mike", age: 21 };
user(info);
var oldAge = returnOlder(info, 19);
console.log(oldAge);
