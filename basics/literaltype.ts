function c(
    input1: number | string, 
    input2: number | string, 
    option: "number" | "text") {
    let result
    if(typeof input1 === "number" && typeof input2 === "number" || option === "number"){
        result = +input1 + +input2
    } else {
        result = input1.toString() + input2.toString()
    }
    return result
}


const cNumber = c(102, 231, "number")
console.log(cNumber)

const cNumber2 = c("917", "354", "number")
console.log(cNumber)

const cString = c("good ", "day", "text")
console.log(cString)