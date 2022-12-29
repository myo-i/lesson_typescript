function add(num1, num2, bool, answer) {
    // 下記のような型チェックはtypescriptでは冗長になる（言語が型チェックしているため）
    // if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    //     throw new Error('Input type number!!')
    // }
    // 計算も文字列と判定されてしまうので変数に格納
    var result = num1 + num2;
    if (bool) {
        console.log(answer + result);
    }
    return num1 + num2;
}
var number1 = 5; // jsやtsでは数値はデフォルトでfloatのため、5も5.0も変わらない
var number2 = 2.8;
var putResult = true;
var answer = "The answer is ";
add(number1, number2, putResult, answer);
// console.log(result)
