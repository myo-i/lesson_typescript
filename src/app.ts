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

        this.eleIdTitle = this.element.querySelector("#title") as HTMLInputElement;
        this.eleIdDescription = this.element.querySelector("#description") as HTMLInputElement;
        this.eleIdPeople = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.eleIdTitle.value);
    }

    private configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    private attach() {
        this.divIdApp.insertAdjacentElement("afterbegin", this.element);
    }
}

const projectInput = new ProjectInput();