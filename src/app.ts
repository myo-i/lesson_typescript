// validation
interface Validation {
    value: string | number;
    // ?を設定することでオプションとして扱うことができる
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(input: Validation) {
    let isValid = true;
    // 最小文字列に対してのvalidation
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.length >= input.minLength;
    }

    // 最大文字列に対してのvalidation
    if (input.maxLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.length <= input.maxLength;
    }

    // number型に対して
    if (input.min != null && typeof input.value === "number") {
        isValid = isValid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === "number") {
        isValid = isValid && input.value <= input.max;
    }
    return isValid;
}

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

// about <template id="project-list"> class 
class ProjectList {
    templateEl: HTMLTemplateElement;
    divIdApp: HTMLDivElement;
    // <section> はただのHYML要素
    element: HTMLElement;

    constructor(private type: "active" | "finished") {
        this.templateEl = document.getElementById("project-list") as HTMLTemplateElement;
        this.divIdApp = document.getElementById("app")! as HTMLDivElement;


        const templateElNode = document.importNode(this.templateEl.content, true);
        // <section> はただのHYML要素
        this.element = templateElNode.firstElementChild as HTMLElement;
        // 動的にidを取得
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();

    }

    private renderContent() {
        const listId = `${this.type}-projects-lists`;
        // 感嘆符でnullを除外
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = 
            this.type.toUpperCase() + " PROJECTS";
    }

    private attach() {
        // this.elementをdivIdAppが始まる直前に配置
        this.divIdApp.insertAdjacentElement("beforeend", this.element);
    }
}


// about <template id="project-input"> class
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

        const titleValidation: Validation = {
            value: enterdTitle,
            required: true
        };
        const descriptionValidation: Validation = {
            value: enterdDescription,
            required: true,
            minLength: 5
        };
        const peopleValidation: Validation = {
            value: +enterdPeople,
            required: true,
            min: 1,
            max: 5
        };

        if (
            // validate(titleValidation) &&
            // validate(descriptionValidation) &&
            // validate(peopleValidation)
            !validate(titleValidation) ||
            !validate(descriptionValidation) ||
            !validate(peopleValidation)
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
        // this.elementをdivIdAppが始まる直後に配置
        this.divIdApp.insertAdjacentElement("afterbegin", this.element);
    }
}

const projectInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");