function addFunc(num1: number, num2: number, cb: (cbNum: number) => void) {
    const result = num1 + num2;
    cb(result);

    // コールバック関数は返り値があることを想定していなくてもvoidを返すようになっているため
    // 何も返さない関数をreturnしてもコンパイルエラーが発生しない。
    // return  cb(result);

}

function printNumber(n1: number) {
    console.log(n1);
}

// 無名関数を用いる場合
addFunc(3, 4, (result) => {
    console.log(result);
})
// 無名関数を用いない場合
addFunc(12, 9, printNumber)


// addFunc(3, 4, (result) => {
//     console.log(result * 2);
// })



//////  addFuncに返り値を持たせる場合 //////

// cbの返り値をさらにreturnAddFuncが返すという形にしないとreturnAddFuncは何も返さない
// cbに返り値があったとしても、returnAddFuncに返り値がなければこの関数は何も返さない
// この書き方で返り値があるとちょっと複雑な気がする...
function returnAddFunc(num1: number, num2: number, cb: (cbNum: number) => number) {
    const result = num1 + num2;
    return cb(result);
}


const by5 = returnAddFunc(10, 20, (result) => {
    return result * 5;
})


console.log(by5);