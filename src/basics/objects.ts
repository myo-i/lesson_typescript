
// const person: objectと記述する代わりにconst person: {}と記述する。
const person: {
    name: string
    // age: 24のように定数も指定できる
    age: number
} = {
// const person = {
    name: "Mike",
    age: 24
};

console.log(person)