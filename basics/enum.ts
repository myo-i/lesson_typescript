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

enum Weather {
    SUNNY,
    CLOUDY,
    RAINY
}

const information2= {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"],
    weather: Weather.SUNNY
}


console.log(information2)

if (information2.weather === Weather.SUNNY){
    console.log("Good weather");
}