import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class CurrentSituation extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		current_situation: ''
	  	}
  	}

  	componentWillMount () {

  		Ux3Services.getLinesByModel( 'AUTOMOVIL', 'ACURA', '1998' )
  			.then(( data ) => {

                this.setState({ lines: data })

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

    isActive ( value ) {
        return `btnuj ${ (( value === this.state.current_situation ) ? 'active': 'default' ) }`
    }

  	continue ( filter ) {

  		this.setState({ current_situation: filter })
  	}

  	render() {
	    return (
	    	<div id="step-current-situation" className="step step-current-situation">
		        <header>
		            <h1>¿Cuál describe mejor tu situación actual?</h1>
		        </header>
		        <ul className="unstyled-list v-list step-current-situation__list">
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'buying_car_loan' ) } onClick={ this.continue.bind( this, 'buying_car_loan' ) }>
		                    <span className="text">Estoy comprando vehículo con un préstamo</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'buying_car_without_loan' ) } onClick={ this.continue.bind( this, 'buying_car_without_loan' ) }>
		                    <span className="text">Estoy comprando vehículo sin préstamo</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'insurance_expired_expire_soon' ) } onClick={ this.continue.bind( this, 'insurance_expired_expire_soon' ) }>
		                    <span className="text">Mi seguro venció o vencerá pronto</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'my_vehicle_is_not_insured' ) } onClick={ this.continue.bind( this, 'my_vehicle_is_not_insured' ) }>
		                    <span className="text">Mi vehículo no está asegurado y deseo conocer opciones</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'curiosity_quote' ) } onClick={ this.continue.bind( this, 'curiosity_quote' ) }>
		                    <span className="text">Sólo cotizo por curiosidad</span>
		                </span>
		            </li>
		        </ul>
		    </div>
	    )
  	}

}