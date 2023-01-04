function c(input1: number | string, input2: number | string) {
    let result
    if(typeof input1 === "number" && typeof input2 === "number"){
        result = input1 + input2
    } else {
        result = input1.toString() + input2.toString()
    }
    return result
}


const cNumber = c(102, 231)
console.log(cNumber)

const cString = c("good ", "day")
console.log(cString)