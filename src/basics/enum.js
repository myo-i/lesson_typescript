var Weather;
(function (Weather) {
    Weather[Weather["SUNNY"] = 0] = "SUNNY";
    Weather[Weather["CLOUDY"] = 1] = "CLOUDY";
    Weather[Weather["RAINY"] = 2] = "RAINY";
})(Weather || (Weather = {}));
const information2 = {
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
var As;
(function (As) {
    As[As["NUMBER"] = 0] = "NUMBER";
    As[As["TEXT"] = 1] = "TEXT";
})(As || (As = {}));
function cE(input1, input2, option) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number" || option === As.NUMBER) {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const cENumber = cE(102, 231, As.NUMBER);
console.log(cENumber);
const cENumber2 = cE("917", "354", As.NUMBER);
console.log(cENumber2);
const cEString = cE("good ", "day", As.TEXT);
console.log(cEString);
