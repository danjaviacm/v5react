import React, { Component } from 'react'
import _ from 'lodash'
import store from 'store2'


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
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

    isActive ( value ) {
        return `btnuj ${ (( value === this.state.when_need_policy ) ? 'active': 'default' ) }`
    }

    selectChoice ( filter ) {
        this.setState({ when_need_policy: filter }, () => this.continue() )
    }

  	continue () {

  		let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.when_need_policy = this.state.when_need_policy

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/codigo-promocional' )
  	}

  	render() {
	    return (
	    	<div id="step-when-need-policy" className="step step-when-need-policy">
		        <header>
		            <h1>¿Cuándo necesitarías la póliza para tu { this.state.vechicle_brand } { this.state.vehicle_line }/{ this.state.vehicle_model }?</h1>
		        </header>
		        <ul className="unstyled-list v-list step-when-need-policy__list">
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'inmediately' ) } onClick={ this.selectChoice.bind( this, 'inmediately' ) }>
		                    <span className="text">Inmediatamente</span>
		                </span>
		            </li>
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'in_a_week_or_less' ) } onClick={ this.selectChoice.bind( this, 'in_a_week_or_less' ) }>
		                    <span className="text">En una semana o menos</span>
		                </span>
		            </li>
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'between_one_and_two_weeks' ) } onClick={ this.selectChoice.bind( this, 'between_one_and_two_weeks' ) }>
		                    <span className="text">Entre 1 y 2 semanas</span>
		                </span>
		            </li>
		            <li className="step-when-need-policy__item">
		                <span className={ this.isActive( 'in_a_month_or_more' ) } onClick={ this.selectChoice.bind( this, 'in_a_month_or_more' ) }>
		                    <span className="text">En un mes o más</span>
		                </span>
		            </li>
		        </ul>
		    </div>
	    )
  	}
}

WhenNeedPolicy.contextTypes = {
    router: React.PropTypes.object.isRequired
}