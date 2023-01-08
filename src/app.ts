class ProjectInput {
    templateEl: HTMLTemplateElement;
    divIdApp: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        // as ~~ でnullを許容せず、この型を持つことを保証している。「")!」 でも可
        this.templateEl = document.getElementById("project-input") as HTMLTemplateElement;
        // キャスティングする方法もある
        // this.HTMLElement = <HTMLElement>document.getElementById("project-input");
        this.divIdApp = document.getElementById("app") as HTMLDivElement;


        const templateElNode = document.importNode(this.templateEl.content, true);
        this.element = templateElNode.firstElementChild as HTMLFormElement
        this.attach();
    }

    private attach() {
        this.divIdApp.insertAdjacentElement("afterbegin", this.element);
    }
}

const projectInput = new ProjectInput();