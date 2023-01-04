////////////////
// anyは非推奨 //
////////////////
var information3 = {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"]
};
// any型は避けたほうがいい
var anyArray;
anyArray = ["A", "B", "C", 2, 7, [2, "D"]];
// console.log(information3)
for (var _i = 0, anyArray_1 = anyArray; _i < anyArray_1.length; _i++) {
    var p = anyArray_1[_i];
    console.log(typeof p);
}
