// auto bind
function autobind(
    _target: any, 
    _methodName: string, 
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


// main Project
class ProjectInput {
    templateEl: HTMLTemplateElement;
    divIdApp: HTMLDivElement;
    element: HTMLFormElement;
    eleIdTitle: HTMLInputElement;
    eleIdDescription: HTMLInputElement;
    eleIdPeople: HTMLInputElement;

    constructor() {
        // as ~~ でnullを許容せず、この型を持つことを保証している。「")!」 でも可
        this.templateEl = document.getElementById("project-input") as HTMLTemplateElement;
        // キャスティングする方法もある
        // this.HTMLElement = <HTMLElement>document.getElementById("project-input");
        this.divIdApp = document.getElementById("app") as HTMLDivElement;


        const templateElNode = document.importNode(this.templateEl.content, true);
        this.element = templateElNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        // フォームに入力した値を保持
        this.eleIdTitle = this.element.querySelector("#title") as HTMLInputElement;
        this.eleIdDescription = this.element.querySelector("#description") as HTMLInputElement;
        this.eleIdPeople = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.attach();
    }

    // フォームに入力した値をタプルとして返す
    private gatherUserInput(): [string, string, number] | undefined{
        const enterdTitle = this.eleIdTitle.value;
        const enterdDescription = this.eleIdDescription.value;
        const enterdPeople = this.eleIdPeople.value;

        if (
            // 後にリファクタ
            enterdTitle.trim().length == 0 ||
            enterdDescription.trim().length == 0 ||
            enterdPeople.trim().length == 0 
        ){
            alert("Invaid input!!");
            return;
        } else {
            return [enterdTitle, enterdDescription, +enterdPeople];
        }
    }

    private clearInputs() {
        this.eleIdTitle.value = "";
        this.eleIdDescription.value = "";
        this.eleIdPeople.value = "";
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        // gatherUserInputでフォームに入力した値をコンソールに表示
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }

    private configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    private attach() {
        this.divIdApp.insertAdjacentElement("afterbegin", this.element);
    }
}

const projectInput = new ProjectInput();