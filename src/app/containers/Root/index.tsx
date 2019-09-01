import * as React from 'react';
import {inject} from 'mobx-react';

import {STORE_COURSE, TodoFilter} from 'app/constants';
import {CourseStore} from 'app/stores';


@inject(STORE_COURSE)
export class Root extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools/>;
    }
  }

  static async getDerivedStateFromProps(props, state) {
    const courseStore = props[STORE_COURSE] as CourseStore;
    console.log(courseStore);
    await courseStore.initData();
  }

  render() {
    console.log('render root');
    return (
      <div className="container">
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
}
