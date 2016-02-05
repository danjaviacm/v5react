import React, { Component } from 'react'
import store from 'store2'

export default class VehicleType extends Component {
  
  	constructor ( props, context ) {

	    super( props )

	    this.state = {
	    	vehicle_body: '' 
	    }
  	}

  	componentWillMount () {

  		store.has( 'UJDATA' ) ? 
  			this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : store.set( 'UJDATA', JSON.stringify({ vehicle_has_registration: 0, vehicle_registration: 'SINPLA' }) )

  	}

    isActive ( value ) {
        return `btnuj btn-icon-content ${ (( value === this.state.vehicle_body ) ? 'active': 'default' ) }`
    }

    selectChoise ( filter ) {
    	
    	this.setState({ vehicle_body: filter }, () => this.continue() )

    }

    continue () {

    	let UJData = {}

    	if ( store.has( 'UJDATA' ) ) {

    		UJData = JSON.parse( store.get( 'UJDATA' ) ) 
    		UJData.vehicle_body = this.state.vehicle_body

    		store.set( 'UJDATA', JSON.stringify( UJData ) )
    	}

    	else {

    		UJData.vehicle_body = this.state.vehicle_body

    		store.set( 'UJDATA', JSON.stringify( UJData ) )
    	}

    	this.context.router.push( '/marca-vehiculo' )

    }

  	render() {
	    return (
	      	<div id="step-vehicle-body" className="step step-vehicle-body">

		        <header>
		            <h1>¿Cuál es el tipo de tu vehículo?</h1>
		        </header>
		    
		        <ul className="unstyled-list h-list centered-v-list step-vehicle-body__list">
		            <li className="step-vehicle-body__item">
		                <div className={ this.isActive( 'AUTOMOVIL' ) } onClick={ this.selectChoise.bind( this, 'AUTOMOVIL' ) }>
		                    <span className="icon"><i className="cmuj-car"></i></span>
		                    <span className="text">Automóvil</span>
		                </div>
		            </li>
		            <li className="step-vehicle-body__item">
		                <div className={ this.isActive( 'CAMIONETA' ) } onClick={ this.selectChoise.bind( this, 'CAMIONETA' ) }>
		                    <span className="icon"><i className="cmuj-van"></i></span>
		                    <span className="text">Camioneta</span>
		                </div>
		            </li>
		            <li className="step-vehicle-body__item">
		                <div className={ this.isActive( 'MOTO' ) } onClick={ this.selectChoise.bind( this, 'MOTO' ) }>
		                    <span className="icon"><i className="cmuj-motorcycle"></i></span>
		                    <span className="text">Moto</span>
		                </div>
		            </li>
		            <li className="step-vehicle-body__item">
		                <div className={ this.isActive( 'PESADO' ) } onClick={ this.selectChoise.bind( this, 'PESADO' ) }>
		                    <span className="icon"><i className="cmuj-truck"></i></span>
		                    <span className="text">Pesado</span>
		                </div>
		            </li>
		            <li className="step-vehicle-body__item">
		                <div className={ this.isActive( 'BUS' ) } onClick={ this.selectChoise.bind( this, 'BUS' ) }>
		                    <span className="icon"><i className="cmuj-bus"></i></span>
		                    <span className="text">Bus</span>
		                </div>
		            </li>
		        </ul>
		    </div>
	    )
  	}
}

VehicleType.contextTypes = {
    router: React.PropTypes.object.isRequired
}