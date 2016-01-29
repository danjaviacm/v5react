import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router'

// Other dependencies
import $ from 'jquery'

// Include Components
import Test from './test'

// Root component
export default class Root extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path='/' component={Test}>
          <IndexRoute component={Test} />
          <Route path='test' component={Test} />
          <Route path='*' component={Test} />
        </Route>
      </Router>
    );
  }
}

render( <Root/>, document.getElementById('content') )