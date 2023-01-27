// Drag & Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

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
type Listener<T> = (items: T[]) => void;

class State<T> {
    // protectedはクラス外からアクセスできないが、継承していればアクセスできる
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// state management
// 依存関係としてはProjectInput->ProjectState<-ProjectList
// 処理順としてはProjectInputで入力した値をProjectStateのprojectsに保持
// tit
class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    // これでただ1つのインスタンスを返すことができる
    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState();
        return this.instance;
    }


    // ProjectInputでsubmitのイベントが発生したときに呼び出される
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(), 
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

//Component base class
// 継承のためのクラスなのでabstractを付ける（インスタンスを生成できなくなる）
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    divIdApp: T;
    element: U;


    constructor(
        templateId: string, 
        divElementId: string, 
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateEl = document.getElementById(templateId) as HTMLTemplateElement;
        this.divIdApp = document.getElementById(divElementId)! as T;

        const templateElNode = document.importNode(this.templateEl.content, true);
        this.element = templateElNode.firstElementChild as U;
        if(newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart)
    }

    private attach(insertAtBeginning: boolean) {
        // this.elementをdivIdAppが始まる直前に配置
        this.divIdApp.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin': 'beforeend', 
            this.element
            );
    }

    abstract configure(): void;
    abstract renderContent(): void;
} 

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        console.log(event)
    }

    dragEndHandler(event: DragEvent): void {
        
    }

    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + " assigned";
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

// about <template id="project-list"> class 
class ProjectList extends Component<HTMLDivElement, HTMLElement>{
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    configure() {
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
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        // 感嘆符でnullを除外
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = 
            this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const item of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, item);
        }
    }
}


// about <template id="project-input"> class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    eleIdTitle: HTMLInputElement;
    eleIdDescription: HTMLInputElement;
    eleIdPeople: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");

        // ここに以下の処理を書かないと上記3つのプロパティでエラーが起きる
        this.eleIdTitle = this.element.querySelector("#title") as HTMLInputElement;
        this.eleIdDescription = this.element.querySelector("#description") as HTMLInputElement;
        this.eleIdPeople = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {
        
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

}

const projectInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");