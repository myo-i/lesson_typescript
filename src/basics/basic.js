function add1(num1, num2, bool, answer) {
    const result = num1 + num2;
    if (bool) {
        console.log(answer + result);
    }
    return num1 + num2;
}
const number1 = 5;
const number2 = 2.8;
const putResult = true;
const answer = "The answer is ";
add1(number1, number2, putResult, answer);
