import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, Redirect } from 'react-router'

// Other dependencies
import $ from 'jquery'

// Include Components
import Test from './test'
import QueryRegistration from './query_registration'
import VehicleType from './tipo_vehiculo'
import VehicleBrand from './vehicle_brand'
import VehicleModel from './vehicle_model'
import VehicleLine from './vehicle_line'
import VehicleReference from './vehicle_reference'
import VehicleCompleteReference from './vehicle_complete_reference'
import VehicleLocation from './vehicle_location'
import VehicleServiceType from './vehicle_service_type'
import VehicleCity from './vehicle_city'
import IdentificationType from './identification_type'
import Identification from './identification'
import CompleteName from './complete_name'
import Sex from './sex'
import Birth from './birth'
import Email from './email'
import ContactNumbers from './contact_numbers'
import CurrentSituation from './current_situation'
import WhenNeedPolicy from './when_need_policy'
import PromoCode from './promocode'
import Footer from './footer'
import App from './app'

// Root component
export default class Root extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}
	}

	render() {
		return (
			<Router history={hashHistory}>
				<Redirect from="/" to="/consultar-placa" />
				<Route path='/' component={App}>
					<IndexRoute component={QueryRegistration} />
					<Route path='/consultar-placa' component={QueryRegistration} />
					<Route path='/tipo-vehiculo' component={VehicleType} />
					<Route path='/marca-vehiculo' component={VehicleBrand} />
					<Route path='/modelo-vehiculo' component={VehicleModel} />
					<Route path='/linea-vehiculo' component={VehicleLine} />
					<Route path='/referencia-vehiculo' component={VehicleReference} />
					<Route path='/referencia-completa-vehiculo' component={VehicleCompleteReference} />
					<Route path='/ubicacion-vehiculo' component={VehicleLocation} />
					<Route path='/tipo-servicio-vehiculo' component={VehicleServiceType} />
					<Route path='/ciudad-vehiculo' component={VehicleCity} />
					<Route path='/tipo-identificacion' component={IdentificationType} />
					<Route path='/identificacion' component={Identification} />
					<Route path='/nombre-completo' component={CompleteName} />
					<Route path='/sexo' component={Sex} />
					<Route path='/fecha-de-nacimiento' component={Birth} />
					<Route path='/correo-electronico' component={Email} />
					<Route path='/numeros-de-contacto' component={ContactNumbers} />
					<Route path='/situacion-actual' component={CurrentSituation} />
					<Route path='/cuando-necesitas-tu-poliza' component={WhenNeedPolicy} />
					<Route path='/codigo-promocional' component={PromoCode} />
					<Route path='*' component={Test} />
				</Route>
			</Router>
		);
	}
}