import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, Redirect } from 'react-router'

// Other dependencies
import $ from 'jquery'

// Include Components
import Test from './test'
import QueryRegistration from './query_registration'
import Footer from './footer'
import App from './app'

// Root component
export default class Root extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Redirect from="/" to="/consultar-placa" />
				<Route path='/' component={App}>
					<IndexRoute component={Test} />
					<Route path='/consultar-placa' component={QueryRegistration} />
					<Route path='/some' component={Footer} />
					<Route path='*' component={Test} />
				</Route>
			</Router>
		);
	}
}