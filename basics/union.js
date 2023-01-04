function c(input1, input2) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var cNumber = c(102, 231);
console.log(cNumber);
var cString = c("good ", "day");
console.log(cString);
