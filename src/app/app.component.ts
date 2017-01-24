import { Component } from '@angular/core';

import { TodoDataService } from './todo-data.service';
import {Todo} from "./todo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  title = 'app works!';
  newTodo: Todo = new Todo();
  todoDataService: TodoDataService;

  constructor(todoDataService: TodoDataService) {
    this.todoDataService = todoDataService;
  }

  addTodo(): void {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo: Todo): void {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo): void {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos(): Todo[] {
    return this.todoDataService.getAllTodos();
  }

}
