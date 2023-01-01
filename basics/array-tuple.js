var information = {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"]
};
// 型を宣言しない場合は2つ目はエラーにならない
// information.movie.push["World"]
// information.movie[1] = 10
console.log("1:" + information.movie);
information.movie = [3, "Bye"];
console.log("2:" + information.movie);
for (var _i = 0, _a = information.colors; _i < _a.length; _i++) {
    var color = _a[_i];
    console.log(color);
}
console.log(information);
