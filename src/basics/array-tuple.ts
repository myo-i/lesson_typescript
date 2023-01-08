const information: {
    name: string;
    age: number;
    colors: string[];
    movie: [number, string];
}= {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"]
}

// 型を宣言しない場合は2つ目はエラーにならない
// information.movie.push["World"]
// information.movie[1] = 10

console.log("1:"+information.movie)
information.movie = [3, "Bye"]
console.log("2:"+information.movie)

for (const color of information.colors) {
    console.log(color)
}

console.log(information)