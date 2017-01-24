import {Injectable} from "@angular/core";
import {Todo} from "./todo";
import {ToastyService, ToastyConfig, ToastOptions} from "ng2-toasty/index";

@Injectable()
export class TodoDataService {

  // placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // placeholder for todo's
  todos: Todo[] = [];

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = "top-right";
    this.toastyConfig.limit = 5;
  }

  // simulattes /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // simulate get /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // simulate post /todos
  addTodo(todo: Todo): void {
    if (todo.title != null) {
      todo.id = ++this.lastId;
      this.todos.push(todo);

      this.showToasty("Todo successfully added!", true);
    } else {
      this.showToasty("Cannot be empty!", false);
    }
  }

  // simulate put /todos/:id
  updateTodoById(id: number, value: Object = {}): void {
    let todo = this.getTodoById(id);
    if (todo) {
      Object.assign(todo, value);

      this.showToasty("Todo successfully changed!", true);
    } else {
      this.showToasty("Todo not successfully changed!", false);
    }

  }

  // simulate delete /todos/:id
  deleteTodoById(id: number): void {
    let firstLength: number = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    let lastLength: number = this.todos.length;

    if (lastLength < firstLength) {
      this.showToasty("Todo successfully removed!", true);
    } else {
      this.showToasty("Todo not successfully removed!", false);
    }
  }

  // togle todo complete
  toggleTodoComplete(todo: Todo): void{
    this.updateTodoById(todo.id, {complete: !todo.complete});
  }

  showToasty(message: string, isSuccess: boolean): void {
    let toastOptions: ToastOptions = {
      title: "Todos with Angular 2",
      msg: message,
      showClose: true,
      timeout: 3000
    };

    if (isSuccess) {
      this.toastyService.success(toastOptions);
    } else {
      this.toastyService.error(toastOptions);
    }
  }
}
