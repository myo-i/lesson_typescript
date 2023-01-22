enum ProjectStatus {
    Active,
    Finished
}

// Project's custom type
class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus
        ) {}
}

// Listener
// 多分、Project[]を引数とした返り値voidの関数
type Listener = (items: Project[]) => void;

// state management
// 依存関係としてはProjectInput->ProjectState<-ProjectList
// 処理順としてはProjectInputで入力した値をProjectStateのprojectsに保持
// tit
class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {

    }

    // これでただ1つのインスタンスを返すことができる
    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    // ProjectInputでsubmitのイベントが発生したときに呼び出される
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random.toString(), 
            title, 
            description, 
            numOfPeople, 
            ProjectStatus.Active
            );
        this.projects.push(newProject);
        console.log("propro"+this.projects)

        // listenersにはaddListenerの引数に渡されている関数が丸ごと入っている
        // projectsには入力した数だけ[title, description, people]の情報が入っている
        // つまり
        // listeners = [addListenerのarg, addListenerのarg, addListenerのarg]
        // projects = [[title: a, description: aa, people:1], 
        //             [title: b, description: bb, people:2],
        //             [title: c, description: cc, people:3]]
        // 最初のforでlisteners[0]とprojects[0]が渡される
        // 
        for (const listenerFn of this.listeners) {
            console.log("aaa"+listenerFn);
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();
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
    assignedProjects: Project[] = [];

    constructor(private type: "active" | "finished") {
        console.log("Instance ProjectList")
        this.templateEl = document.getElementById("project-list") as HTMLTemplateElement;
        this.divIdApp = document.getElementById("app")! as HTMLDivElement;
        this.assignedProjects = [];


        const templateElNode = document.importNode(this.templateEl.content, true);
        // <section> はただのHYML要素
        this.element = templateElNode.firstElementChild as HTMLElement;
        // 動的にidを取得
        this.element.id = `${this.type}-projects`;

        // ProjectStateのlistenersに引数の関数丸ごと追加している
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })

        this.attach();
        this.renderContent();

    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-lists`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const item of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = item.title;
            listEl.appendChild(listItem);
            // lecture129の時点でlistElがどんどん蓄積されて同じものが表示されている
        }
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
        console.log("Instance ProjectInput")

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
            console.log("userInput"+userInput)
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            // console.log(title, desc, people);
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