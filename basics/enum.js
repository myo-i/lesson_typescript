// enumを用いない場合
// const SUNNY = "Sunny";
// const CLOUDY = "Clody";
// const RAINY = "Rainy";
// enumは値を代入することもできる
// enum Weather {
//     SUNNY = 0,
//     CLOUDY = 1,
//     RAINY = 2
// }
var Weather;
(function (Weather) {
    Weather[Weather["SUNNY"] = 0] = "SUNNY";
    Weather[Weather["CLOUDY"] = 1] = "CLOUDY";
    Weather[Weather["RAINY"] = 2] = "RAINY";
})(Weather || (Weather = {}));
var information2 = {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"],
    weather: Weather.SUNNY
};
console.log(information2);
if (information2.weather === Weather.SUNNY) {
    console.log("Good weather");
}
// literaltypeで書いたコードをenumで実装してみる
var As;
(function (As) {
    As[As["NUMBER"] = 0] = "NUMBER";
    As[As["TEXT"] = 1] = "TEXT";
})(As || (As = {}));
// function c(
//     input1: number | string, 
//     input2: number | string, 
//     option: "number" | "text") {
//     let result
//     if(typeof input1 === "number" && typeof input2 === "number" || option === "number"){
//         result = +input1 + +input2
//     } else {
//         result = input1.toString() + input2.toString()
//     }
//     return result
// }
function cE(input1, input2, option) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number" || option === As.NUMBER) {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var cENumber = cE(102, 231, As.NUMBER);
console.log(cENumber);
var cENumber2 = cE("917", "354", As.NUMBER);
console.log(cENumber);
var cEString = cE("good ", "day", As.TEXT);
console.log(cEString);
