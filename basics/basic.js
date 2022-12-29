function add(num1, num2) {
    // 下記のような型チェックはtypescriptでは冗長になる（言語が型チェックしているため）
    // if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    //     throw new Error('Input type number!!')
    // }
    return num1 + num2;
}
var number1 = 5;
var number2 = 2.8;
var result = add(number1, number2);
console.log(result);
