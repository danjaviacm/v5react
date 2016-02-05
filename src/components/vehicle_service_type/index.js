import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import store from 'store2'

export default class VehicleServiceType extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		vehicle_body_validation: '',
            vehicle_service_type: ''
	  	}

	  	context.router
  	}

    componentWillMount () {
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

  	isActive ( value ) {
    	return `btnuj btn-icon-content ${ (( value === this.state.vehicle_service_type ) ? 'active': 'default' ) }`
  	}

    selectChoice ( filter ) {
        this.setState({ vehicle_service_type: filter }, () => this.continue() )
    }

  	continue () {

  		let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.vehicle_service_type = this.state.vehicle_service_type

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/ciudad-vehiculo' )
  	}

  	render() {

	    return (
	    	<div id="step-vehicle-body" className="step step-vehicle-body">
		        <header>
		            <h1>¿Qué tipo de vehículo tienes?</h1>
		        </header>
		        <ul className="unstyled-list h-list centered-v-list step-vehicle-body__list">
		            
		            <li>
		                <div className={ this.isActive( 'particular' ) } onClick={ this.selectChoice.bind( this, 'particular' ) }>
		                    { this.state.vehicle_body_validation != 'MOTO' ? <span className="icon"><i className="cmuj-car"></i></span> : null }
		                    { this.state.vehicle_body_validation == 'MOTO' ? <span ng-if="vehicle_body == 'MOTO'" className="icon"><i className="cmuj-motorcycle"></i></span> : null }
		                    <span className="text">Particular</span>
		                </div>
		            </li>

		            { this.state.vehicle_body_validation != 'MOTO' ? <li>
                        <div className={ this.isActive( 'publico' ) } onClick={ this.selectChoice.bind( this, 'publico' ) }>
                            <span className="icon"><i className="cmuj-taxi"></i></span>
                            <span className="text">Público</span>
                        </div>
                    </li> : null }

                    { this.state.vehicle_body_validation != 'MOTO' ? <li>
                        <div className={ this.isActive( 'publico-especial' ) } onClick={ this.selectChoice.bind( this, 'publico-especial' ) }>
                            <span className="icon"><i className="cmuj-taxi"></i></span>
                            <span className="text">Público especial</span>
                        </div>
                    </li> : null }
		        </ul>
		    </div>
	    )
  	}
}

VehicleServiceType.contextTypes = {
    router: React.PropTypes.object.isRequired
}