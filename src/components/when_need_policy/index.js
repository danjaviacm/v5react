import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class WhenNeedPolicy extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		when_need_policy: '',
	  		vechicle_brand: 'ACURA',
			vehicle_line: 'TL',
			vehicle_model: '1998'
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
        return `btnuj ${ (( value === this.state.when_need_policy ) ? 'active': 'default' ) }`
    }

  	continue ( filter ) {

  		this.setState({ when_need_policy: filter })
  	}

  	render() {
	    return (
	    	<div id="step-when-need-policy" className="step step-when-need-policy">
		        <header>
		            <h1>¿Cuándo necesitarías la póliza para tu { this.state.vechicle_brand } { this.state.vehicle_line }/{ this.state.vehicle_model }?</h1>
		        </header>
		        <ul className="unstyled-list v-list step-when-need-policy__list">
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'inmediately' ) } onClick={ this.continue.bind( this, 'inmediately' ) }>
		                    <span className="text">Inmediatamente</span>
		                </span>
		            </li>
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'in_a_week_or_less' ) } onClick={ this.continue.bind( this, 'in_a_week_or_less' ) }>
		                    <span className="text">En una semana o menos</span>
		                </span>
		            </li>
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'between_one_and_two_weeks' ) } onClick={ this.continue.bind( this, 'between_one_and_two_weeks' ) }>
		                    <span className="text">Entre 1 y 2 semanas</span>
		                </span>
		            </li>
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'in_a_month_or_more' ) } onClick={ this.continue.bind( this, 'in_a_month_or_more' ) }>
		                    <span className="text">En un mes o más</span>
		                </span>
		            </li>
		        </ul>
		    </div>
	    )
  	}

}