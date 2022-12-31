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
