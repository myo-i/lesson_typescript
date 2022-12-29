var button = document.querySelector("button");
// 末尾に感嘆符を付けることで確実に要素を取得させることができる。
// つまりnullを返さない。
// さらに下記は入力要素ということが分かっているのでどのタイプになるのかを知らせることができる。
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else {
        return +num1 + +num2;
    }
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});
