function c1(
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


const cNumberL = c1(102, 231, "number")
console.log(cNumberL)

const cNumberL2 = c1("917", "354", "number")
console.log(cNumberL2)

const cStringL = c1("good ", "day", "text")
console.log(cStringL)