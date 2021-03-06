import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Header } from 'app/components/Header';
import { TodoList } from 'app/components/TodoList';
import { Footer } from 'app/components/Footer';
import { TodoStore, RouterStore } from 'app/stores';
import {
  STORE_TODO,
  STORE_ROUTER,
  TODO_FILTER_LOCATION_HASH,
  TodoFilter
} from 'app/constants';

type TParams =  { id: string };

export interface CourseProps extends RouteComponentProps<TParams> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STORE_TODO]: TodoStore;
}

export interface CourseState {
  filter: TodoFilter;
  id: string;
}

@inject(STORE_TODO, STORE_ROUTER)
@observer
export class Course extends React.Component<CourseProps, CourseState> {
  constructor(props: CourseProps, context: any) {
    super(props, context);
    const id = props.match.params.id;
    this.state = {
      filter: TodoFilter.ALL,
      id: id
    };
  }

  componentWillMount() {
    this.checkLocationChange();
  }

  componentWillReceiveProps(nextProps: CourseProps, nextContext: any) {
    this.checkLocationChange();
  }

  checkLocationChange() {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const filter = Object.keys(TODO_FILTER_LOCATION_HASH)
      .map((key) => Number(key) as TodoFilter)
      .find(
        (filter) => TODO_FILTER_LOCATION_HASH[filter] === router.location.hash
      );
    this.setState({ filter });
  }

  private handleFilter = (filter: TodoFilter) => {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const currentHash = router.location.hash;
    const nextHash = TODO_FILTER_LOCATION_HASH[filter];
    if (currentHash !== nextHash) {
      router.replace(nextHash);
    }
  };

  getFilteredTodo(filter: TodoFilter) {
    const todoStore = this.props[STORE_TODO] as TodoStore;
    switch (filter) {
      case TodoFilter.ACTIVE:
        return todoStore.activeTodos;
      case TodoFilter.COMPLETED:
        return todoStore.completedTodos;
      default:
        return todoStore.todos;
    }
  }

  render() {
    const todoStore = this.props[STORE_TODO] as TodoStore;
    const { children, match } = this.props;
    const { filter } = this.state;
    const filteredTodos = this.getFilteredTodo(filter);

    const footer = todoStore.todos.length && (
      <Footer
        filter={filter}
        activeCount={todoStore.activeTodos.length}
        completedCount={todoStore.completedTodos.length}
        onClearCompleted={todoStore.clearCompleted}
        onChangeFilter={this.handleFilter}
      />
    );

    const router = this.props[STORE_ROUTER] as RouterStore;
    console.log(router);

    return (
      <div className={style.normal}>
        {match.params.id}
      </div>
    );
  }
}
