function add(num1: number, num2: number, bool: boolean, answer: string) {
    // 下記のような型チェックはtypescriptでは冗長になる（言語が型チェックしているため）
    // if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    //     throw new Error('Input type number!!')
    // }

    // 計算も文字列と判定されてしまうので変数に格納
    const result = num1 + num2
    if(bool){
        console.log(answer + result)
    }
    return num1 + num2
}


// 型定義は行わない
const number1 = 5; // jsやtsでは数値はデフォルトでfloatのため、5も5.0も変わらない
const number2 = 2.8
const putResult = true;
const answer = "The answer is "

add(number1, number2, putResult, answer)
// console.log(result)