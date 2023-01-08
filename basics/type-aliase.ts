type TypeCombinable = number | string;
type TypeOption = "number" | "text";

// type-aliase初期化例
const value: TypeCombinable = 123;

function c2(
    input1: TypeCombinable, 
    input2: TypeCombinable, 
    option: TypeOption) {
    let result
    if(typeof input1 === "number" && typeof input2 === "number" || option === "number"){
        result = +input1 + +input2
    } else {
        result = input1.toString() + input2.toString()
    }
    return result
}


const cNumberTA = c2(111, 123, "number")
console.log(cNumberTA)

const cNumber2TA = c2("917", "354", "number")
console.log(cNumber2TA)

const cStringTA = c2("good ", "day", "text")
console.log(cStringTA)

// type-aliaseは上記のようなunionのみにとどまらない
// function user(user: { name: string; age: number }) {
//   console.log('Hi, I am ' + user.name);
// }
   
// function returnOlder(user: { name: string; age: number }, checkAge: number) {
//   return checkAge > user.age;
// }

// 上記のコードを下記のように書き直すことができる
type User = { name: string; age: number };
 
function user(user: User) {
  console.log('Hi, I am ' + user.name);
}
 
function returnOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}

const info: User = {name:"Mike", age: 21};
user(info);
const oldAge = returnOlder(info, 19)
console.log(oldAge)