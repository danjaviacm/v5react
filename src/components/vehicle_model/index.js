import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import store from 'store2'

export default class VehicleModel extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {
			models: [],
			vehicle_body: '',
			vehicle_brand: '',
			vehicle_model: ''
		}
	}

	componentWillMount () {

		store.has( 'UJDATA' ) ? 
			this.setState( JSON.parse( store.get( 'UJDATA' ) ), () => this.fetchModels() ) : this.context.router.push( '/consultar-placa' )
	}

	fetchModels () {

		Ux3Services.getModelsByBrand( this.state.vehicle_body, this.state.vehicle_brand )
			.then(( data ) => {

				this.setState({ models: data })

			}).catch(( error ) => {
				trackJs.track( JSON.stringify( error ))
				console.log( error )
			})
	}

	isActive ( value ) {
		return `square ${ (( value === this.state.vehicle_model ) ? 'active': 'default' ) }`
	}

	selectChoice ( filter ) {
		this.setState({ vehicle_model: filter }, () => this.continue() )
	}

	continue () {

		let UJData = {}

		if ( store.has( 'UJDATA' ) ) {

			UJData = JSON.parse( store.get( 'UJDATA' ) ) 
			UJData.vehicle_model = this.state.vehicle_model

			store.set( 'UJDATA', JSON.stringify( UJData ) )
		}

		else
			this.context.router.push( '/consultar-placa' )

		// Next step
		this.context.router.push( '/linea-vehiculo' )

	}

	render() {
		return (
			<div id="step-vehicle-model" className="step step-vehicle-model">
				
				<header>
					<h1>¿Cuál es el modelo de tu vehículo?</h1>
				</header>
				
				<div className="upper" style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '10px', display: 'inline-block', padding: '7px 17px', marginTop: '-20px', marginBottom: '15px' }}>
					<h2><i className="vehicle_className cmuj-car"></i> { this.state.vehicle_brand }</h2>
				</div>

				<div align="center" className="squares">
					
					{ this.state.models.map( ( year, key ) => { 
						return <div className={ this.isActive( year.year ) } key={ key } onClick={ this.selectChoice.bind( this, year.year ) }>
							{ year.year }
						</div> 
					})}

				</div>
				
				{ /* <table align="center" className="tableuj">
					<tr ng-repeat="block in models">
						<td ng-repeat="year in block"><div ng-className="{'active': sameValue(vehicle_model, year.year)}" ng-click="selectOption(year.year)">{{ year.year }}</div></td>
					</tr>
				</table> */ }
			</div>
		)
	}
}

VehicleModel.contextTypes = {
	router: React.PropTypes.object.isRequired
}