var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (_) {
        var hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
        }
    };
}
// デコレーターはクラスが定義されたときに実行される
// そのためこのプログラムで最初に出力されるのはLogging...となる
// クラスでコンストラクタを作成しなくても出力される
// @Logger("LOGGING PERSON CLASS")
var Person = /** @class */ (function () {
    function Person() {
        this.name = "Max";
        console.log("Person Object.....");
    }
    Person = __decorate([
        WithTemplate("<h1>Person Project</h1>", "app")
    ], Person);
    return Person;
}());
var person = new Person();
console.log(person);
