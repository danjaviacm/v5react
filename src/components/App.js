import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, Redirect } from 'react-router'

// Other dependencies
import $ from 'jquery'

// Include Components
import Test from './test'
import QueryRegistration from './query_registration'

// Root component
export default class Root extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Redirect from="/" to="/consultar-placa" />
        <Route path='/' component={QueryRegistration}>
          <IndexRoute component={Test} />
          <Route path='/consultar-placa' component={QueryRegistration} />
          <Route path='*' component={Test} />
        </Route>
      </Router>
    );
  }
}

render( <Root/>, document.getElementById('content') )