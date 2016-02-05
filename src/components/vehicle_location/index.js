import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import numeral from 'numeral'
import store from 'store2'

export default class VehicleLocation extends Component {

	constructor ( props, context ) {
		
		super( props ) 

		this.state = {
			vehicleBrand: '',
			vehicleLine: '',
			vehicleModel: '',
			fasecoldaPrice: '',
			fasecolda_code: '',
			vehicle_location: '',
			showFasecolda: false,
			showError: false
		}

		context.router
	}

	componentWillMount () {

		store.has( 'UJDATA' ) ?
			this.setState( JSON.parse( store.get( 'UJDATA' ) ), () => this.fetchFasecolda() ) : this.context.router.push( '/consultar-placa' )
		
	}

	fetchFasecolda () {
		Ux3Services.getVehiclePriceFromFasecolda( this.state.vehicle_model, this.state.fasecolda_code )
			.then(( data ) => {

				this.setState({ fasecoldaPrice: data.price })

			}).catch(( error ) => {
				trackJs.track( JSON.stringify( error ))
				console.log( error )
			})
	}

	yes ( filter ) {

		this.setState({ 
			showFasecolda: true, 
			vehicle_location: filter, 
			vehicle_is_zero_km: 1 
		})
	}

	no ( filter ) {

		this.setState({ 
			showFasecolda: false, 
			vehicle_location: filter, 
			vehicle_is_zero_km: 0,
			vehicle_commercial_value: this.state.fasecoldaPrice 
		}, () => this.continue() )
	}

	formatCurrency ( e ) {

		let value = numeral( this.refs.price.value ).format( '0,0' )

		e.currentTarget.value = value

		if ( value.replace( /,/g, "" ).length < 6 ) 
			this.setState({ showError: true })
		else
			this.setState({ showError: false })
	}

	isActive ( value ) {
		return `btnuj btn-icon-content step-vehicle-zero-km__location ${ (( value === this.state.vehicle_location ) ? 'active': 'default' ) }`
	}

	continue ( e ) {

		e ? e.preventDefault() : null

		let price = ! this.refs.price ? this.state.fasecoldaPrice : this.refs.price.value.replace( /,/g, "" )
		
		if ( price.length < 6 )
			return

		let UJData = {}

		if ( store.has( 'UJDATA' ) ) {

			UJData = JSON.parse( store.get( 'UJDATA' ) ) 
			UJData.vehicle_is_zero_km = this.state.vehicle_is_zero_km
			UJData.vehicle_commercial_value = price

			store.set( 'UJDATA', JSON.stringify( UJData ) )
		}

		else
			this.context.router.push( '/consultar-placa' )

		// Next step
		this.context.router.push( '/tipo-servicio-vehiculo' )
	}

	render() {
		return (
			<div id="step-vehicle-zero-km" className="step step-vehicle-zero-km">
				<header>
					<h1>¿Cuál es la ubicación de tu { this.state.vehicle_brand } { this.state.vehicle_line }/{ this.state.vehicle_model }?</h1>
				</header>
				<ul className="unstyled-list h-list centered-v-list step-vehicle-zero-km__list">
					<li>
						<div className={ this.isActive( 'yes' ) } onClick={ this.yes.bind( this, 'yes' ) }>
							<span className="icon"><i className="cmuj-local"></i></span>
							<span className="text">En concesionario</span>
						</div>
					</li>
					<li>
						<div className={ this.isActive( 'no' ) } onClick={ this.no.bind( this, 'no' ) }>
							<span className="icon"><i className="cmuj-path"></i></span>
							<span className="text">En circulación</span>
						</div>
					</li>
				</ul>
				<br/>

				{ this.state.showFasecolda ? <div className="form-group step-vehicle-zero-km__fasecolda">
					<div className="row">
						<div className="col-xs-6 col-xs-offset-3">
							<div className="input-group">
								<div className="input-group-addon">$</div>
									<input id="vehicle_commercial_value" maxLength="15" ref="price" style={{ textAlign: 'center' }} defaultValue={ numeral( this.state.fasecoldaPrice ).format( '0,0' ) } className="form-control" type="text" ng-model="vehicle_commercial_value" onChange={ this.formatCurrency.bind( this ) } placeholder="Valor del vehículo en factura de compra..."/>
								</div>
							{ this.state.showError ? <span className="block-error">Debes ingresar un valor superior o igual a 100.000 Solo Números. <br/></span> : null }
							<span className="helpBlock small" style={{ color: '#f0f0f0' }}>Escribe el valor del vehículo que aparece en tu factura de compra.</span>
						</div>
					</div>
				</div> : null }

				{ this.state.showFasecolda ? <button ng-show="vehicle_is_zero_km == 1" className="btn btn-orange upper" onClick={ this.continue.bind( this ) }>Continuar</button> : null }
			</div>
		)
	}
}

VehicleLocation.contextTypes = {
	router: React.PropTypes.object.isRequired
}