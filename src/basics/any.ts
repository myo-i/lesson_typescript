////////////////
// anyは非推奨 //
////////////////


const information3= {
    name: "Bob",
    age: 12,
    colors: ["blue", "red"],
    movie: [1, "Hello"],
}


// any型は避けたほうがいい
let anyArray: any[]
anyArray = ["A", "B", "C", 2, 7, [2, "D"]]


// console.log(information3)

for (const p of anyArray) {
    console.log(typeof p)
}