export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
  
    constructor() {
      super('project-input', 'app', true, 'user-input');
  
      this.titleInputElement = this.element.querySelector(
        '#title'
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        '#description'
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        '#people'
      ) as HTMLInputElement;
  
      this.renderContent();
      this.configure();
    }
  
    renderContent() {}
  
    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }
  
    private gatherInput(): [string, string, number] | void {
      const titleValue = this.titleInputElement.value;
      const descriptionValue = this.descriptionInputElement.value;
      const peopleValue = this.peopleInputElement.value;
  
      const titleValidator: Validatable = {
        value: titleValue,
        required: true,
      };
      const descriptorValidator: Validatable = {
        value: descriptionValue,
        required: true,
        minLength: 5,
      };
      const peopleValidator: Validatable = {
        value: peopleValue,
        required: true,
        min: 1,
        max: 5,
      };
  
      if (
        validate(titleValidator) &&
        validate(descriptorValidator) &&
        validate(peopleValidator)
      ) {
        return [titleValue, descriptionValue, +peopleValue];
      } else {
        alert('Invalid inputs!');
      }
    }
  
    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }
  
    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherInput();
      if (Array.isArray(userInput)) {
        //Need to explicitly tell Typescript this is an array, hence the 'if' check.
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  }