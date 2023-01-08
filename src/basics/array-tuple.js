const information = {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"]
};
console.log("1:" + information.movie);
information.movie = [3, "Bye"];
console.log("2:" + information.movie);
for (const color of information.colors) {
    console.log(color);
}
console.log(information);
