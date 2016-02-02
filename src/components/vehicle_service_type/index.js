import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import numeral from 'numeral'

export default class VehicleServiceType extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		vehicle_body_validation: 'AUTOMOVIL',
	  		selected: ''
	  	}

	  	context.router
  	}

  	isActive ( value ) {
    	return 'btnuj btn-icon-content ' + (( value === this.state.selected ) ? 'active': 'default' )
  	}

  	componentWillMount () {

  		Ux3Services.getVehiclePriceFromFasecolda( '1998', '34401002' )
  			.then(( data ) => {

                this.setState({ fasecoldaPrice: data.price })
                console.log( data )

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	continue ( filter ) {

  		this.setState({ selected: filter })
  	}

  	render() {

	    return (
	    	<div id="step-vehicle-body" className="step step-vehicle-body">
		        <header>
		            <h1>¿Qué tipo de vehículo tienes?</h1>
		        </header>
		        <ul className="unstyled-list h-list centered-v-list step-vehicle-body__list">
		            
		            <li>
		                <div className={ this.isActive( 'particular' ) } onClick={ this.continue.bind( this, 'particular' ) }>
		                    { this.state.vehicle_body_validation != 'MOTO' ? <span className="icon"><i className="cmuj-car"></i></span> : null }
		                    { this.state.vehicle_body_validation == 'MOTO' ? <span ng-if="vehicle_body == 'MOTO'" className="icon"><i className="cmuj-motorcycle"></i></span> : null }
		                    <span className="text">Particular</span>
		                </div>
		            </li>

		            { this.state.vehicle_body_validation != 'MOTO' ? <li>
                        <div className={ this.isActive( 'publico' ) } onClick={ this.continue.bind( this, 'publico' ) }>
                            <span className="icon"><i className="cmuj-taxi"></i></span>
                            <span className="text">Público</span>
                        </div>
                    </li> : null }

                    { this.state.vehicle_body_validation != 'MOTO' ? <li>
                        <div className={ this.isActive( 'publico-especial' ) } onClick={ this.continue.bind( this, 'publico-especial' ) }>
                            <span className="icon"><i className="cmuj-taxi"></i></span>
                            <span className="text">Público especial</span>
                        </div>
                    </li> : null }
		        </ul>
		    </div>
	    )
  	}

}