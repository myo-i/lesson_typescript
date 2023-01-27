let input3: unknown;
let inputName3: string;

input3 = 5;
input3 = "Mike";



// 下記のコードはany型であればコンパイルが通るが、unknown型にするとエラーが発生する。
// anyはあらゆる型を意味するものだが、
// unknownは「何が入るかわからないけど特定の型ではある」みたいなイメージで全ての型を許容しているわけではない。
// 型がわかっている場合はunion型などを使う。
// unknown型はあんまり使わない方がいい。
// inputName = input;


if (typeof input === "string"){
    inputName = input;
    console.log(inputName);
}

