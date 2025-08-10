class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";
  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

class TodoList {

  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  _validateIdx(index) {
    if (index <= this.todos.length - 1) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  add(todo) {
    if (Object.getPrototypeOf(todo) !== Todo.prototype) {
      throw new TypeError('can only add Todo objects')
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0]
  }

  last() {
    return this.todos[this.todos.length - 1]
  }

  itemAt(index) {
    this._validateIdx(index)
    return this.todos[index];
  }

  markDoneAt(index) {
    this._validateIdx(index)
    this.todos[index].markDone();
  }

  markUndoneAt(index) {
    this._validateIdx(index)
    this.todos[index].markUndone();
    
  }

  isDone() {
    return this.todos.every((todo) => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIdx(index)
    this.todos.splice(index, 1)
  }
  displayList() {
    console.log(`---- ${this.title} ----`);
    this.todos.forEach((todo) => {
      console.log(todo.toString());
    })
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let filtered = [];
    this.forEach((todo) => {
      if (callback(todo)) {
        filtered.push(todo)
      }
    })
    return filtered;
  }
}



let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

let doneTodos = list.filter(todo => todo.isDone());
console.log(doneTodos);

