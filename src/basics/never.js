let input;
let inputName;
input = 5;
input = "Mike";
if (typeof input === "string") {
    inputName = input;
    console.log(inputName);
}
function generateError(message, statusCode) {
    throw { message: message, errorCode: statusCode };
}
generateError("Error!!!!", 500);
