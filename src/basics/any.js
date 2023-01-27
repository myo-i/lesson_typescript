const information3 = {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"],
};
let anyArray;
anyArray = ["A", "B", "C", 2, 7, [2, "D"]];
for (const p of anyArray) {
    console.log(typeof p);
}
