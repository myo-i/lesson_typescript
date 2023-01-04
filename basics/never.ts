let input: unknown;
let inputName: string;

input = 5;
input = "Mike";


if (typeof input === "string"){
    inputName = input;
    console.log(inputName);
}

// neverは何も代入できないが、何にでも代入できる。
// voidはreturnまたは正常終了などで最後まで実行されるが、neverは処理が中断されるか無限ループを意味する。
function generateError(message: string, statusCode: number): never {
    throw { message: message, errorCode: statusCode};
}

generateError("Error!!!!", 500);

