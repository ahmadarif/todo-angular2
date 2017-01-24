export class Todo {

  id: number;
  title: string;
  complete: boolean = false;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }

}
