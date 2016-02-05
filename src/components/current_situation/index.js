import React, { Component } from 'react'
import _ from 'lodash'
import store from 'store2'

export default class CurrentSituation extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		current_situation: ''
	  	}
  	}

    componentWillMount () {
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

    isActive ( value ) {
        return `btnuj ${ (( value === this.state.current_situation ) ? 'active': 'default' ) }`
    }

    selectChoice ( filter ) {
        this.setState({ current_situation: filter }, () => this.continue() )
    }

  	continue () {

  		let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.current_situation = this.state.current_situation

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/cuando-necesitas-tu-poliza' )
  	}

  	render() {
	    return (
	    	<div id="step-current-situation" className="step step-current-situation">
		        <header>
		            <h1>¿Cuál describe mejor tu situación actual?</h1>
		        </header>
		        <ul className="unstyled-list v-list step-current-situation__list">
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'buying_car_loan' ) } onClick={ this.selectChoice.bind( this, 'buying_car_loan' ) }>
		                    <span className="text">Estoy comprando vehículo con un préstamo</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'buying_car_without_loan' ) } onClick={ this.selectChoice.bind( this, 'buying_car_without_loan' ) }>
		                    <span className="text">Estoy comprando vehículo sin préstamo</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'insurance_expired_expire_soon' ) } onClick={ this.selectChoice.bind( this, 'insurance_expired_expire_soon' ) }>
		                    <span className="text">Mi seguro venció o vencerá pronto</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'my_vehicle_is_not_insured' ) } onClick={ this.selectChoice.bind( this, 'my_vehicle_is_not_insured' ) }>
		                    <span className="text">Mi vehículo no está asegurado y deseo conocer opciones</span>
		                </span>
		            </li>
		            <li className="step-current-situation__item">
		                <span className={ this.isActive( 'curiosity_quote' ) } onClick={ this.selectChoice.bind( this, 'curiosity_quote' ) }>
		                    <span className="text">Sólo cotizo por curiosidad</span>
		                </span>
		            </li>
		        </ul>
		    </div>
	    )
  	}
}

CurrentSituation.contextTypes = {
    router: React.PropTypes.object.isRequired
}