const jsbutton = document.querySelector("button");
const jsinput1 = document.getElementById("num1");
const jsinput2 = document.getElementById("num2");


function jsadd(num1, num2) {
   if (typeof num1 === "number" && typeof num2 === "number") {
     return num1 + num2;
   }  else {
     return +num1 + +num2;
   }
}

jsbutton.addEventListener("click", function() {
   console.log(jsadd(jsinput1.value, jsinput2.value));
});
