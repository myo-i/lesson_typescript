function Logger(constructor: Function) {
    console.log("Logging....");
    console.log(constructor);
}

// デコレーターはクラスが定義されたときに実行される
// そのためこのプログラムで最初に出力されるのはLogging...となる
// クラスでコンストラクタを作成しなくても出力される
@Logger
class Person {
    name = "Max";

    constructor() {
        console.log("Person Object.....")
    }
}

const person = new Person();

console.log(person);