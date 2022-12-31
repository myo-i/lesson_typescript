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
var cNumber = c(102, 231, "number");
console.log(cNumber);
var cNumber2 = c("917", "354", "number");
console.log(cNumber);
var cString = c("good ", "day", "text");
console.log(cString);
