import {observable, computed, action, toJS} from 'mobx';
import {act} from 'react-dom/test-utils';

export class CourseStore {
  constructor() {
    this.courses = [];
    // this.todos = fixtures;
  }

  @observable public courses: Array<any>;

  @action
  initData = async () => {
    if (this.courses.length === 0) {
      await this.syncData();
    }
  };

  @action
  syncData = async () => {
    console.log('sync courses data');
    const response = await fetch(`/data/courses.json`);
    this.courses = await response.json();
    console.log(toJS(this.courses));
    // this.setState({ data: json });

  };

  /*@computed
  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  @computed
  get completedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  @action
  addTodo = (item: Partial<TodoModel>): void => {
    this.todos.push(new TodoModel(item.text, item.completed));
  };

  @action
  editTodo = (id: number, data: Partial<TodoModel>): void => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        if (typeof data.completed == 'boolean') {
          todo.completed = data.completed;
        }
        if (typeof data.text == 'string') {
          todo.text = data.text;
        }
      }
      return todo;
    });
  };

  @action
  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  @action
  completeAll = (): void => {
    this.todos = this.todos.map((todo) => ({ ...todo, completed: true }));
  };

  @action
  clearCompleted = (): void => {
    this.todos = this.todos.filter((todo) => !todo.completed);
  };*/
}

export default CourseStore;
