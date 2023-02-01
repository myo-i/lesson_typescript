function Logger(logString: string){
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = p.name;
        }
    }
}

// デコレーターはクラスが定義されたときに実行される
// そのためこのプログラムで最初に出力されるのはLogging...となる
// クラスでコンストラクタを作成しなくても出力される
// @Logger("LOGGING PERSON CLASS")
@WithTemplate("<h1>Person Project</h1>", "app")
class Person {
    name = "Max";

    constructor() {
        console.log("Person Object.....");
    }
}

const person = new Person();

console.log(person);