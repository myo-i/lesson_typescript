const button = document.querySelector("button")!;

// 末尾に感嘆符を付けることで確実に要素を取得させることができる。
// つまりnullを返さない。
// さらに下記は入力要素ということが分かっているのでどのタイプになるのかを知らせることができる。
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;


function add(num1: number, num2: number) {
   if (typeof num1 === "number" && typeof num2 === "number") {
     return num1 + num2;
   }  else {
     return +num1 + +num2;
   }
}

button.addEventListener("click", function() {
   console.log(add(+input1.value, +input2.value));
});
