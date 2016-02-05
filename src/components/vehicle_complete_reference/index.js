import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import store from 'store2'

export default class VehicleCompleteReference extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		completeReferences: [],
	  		vehicle_body: '',
	  		vehicle_brand: '',
	  		vehicle_model: '',
	  		vehicle_line: '',
	  		vehicle_reference: '',
	  		fasecolda_code: ''
	  	}
  	}

  	componentWillMount () {

  		let UJData = store.has( 'UJDATA' ) ? JSON.parse( store.get( 'UJDATA' ) ) : {}

  		UJData.vehicle_body && UJData.vehicle_brand ? 
  			this.setState({ 
	  			vehicle_body: UJData.vehicle_body, 
	  			vehicle_brand: UJData.vehicle_brand,
	  			vehicle_model: UJData.vehicle_model,
	  			vehicle_line: UJData.vehicle_line,
	  			vehicle_reference: UJData.vehicle_reference,
	  			fasecolda_code: UJData.fasecolda_code || ''
	  		}, () => this.fetchCompleteReference() ) : null
  		
  	}

  	fetchCompleteReference () {

  		Ux3Services.getCompleteReferences( this.state.vehicle_body, this.state.vehicle_brand, this.state.vehicle_model, this.state.vehicle_line, this.state.vehicle_reference )
  			.then(( data ) => {

                this.setState({ completeReferences: data })

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	isActive ( value ) {
        return `btnuj ${ (( value === this.state.fasecolda_code ) ? 'active': 'default' ) }`
    }

    selectChoice ( filter ) {
        this.setState({ fasecolda_code: filter }, () => this.continue() )
    }

    continue () {

        let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.fasecolda_code = this.state.fasecolda_code

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else {

            UJData.fasecolda_code = this.state.fasecolda_code

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        this.context.router.push( '/ubicacion-vehiculo' )

    }

  	render() {
	    return (
	    	<div id="step-vehicle-complete-reference" className="step step-vehicle-complete-reference">
		        <header>
		            <h1>Referencia completa</h1>
		        </header>

		        <ul className="unstyled-list v-list step-vehicle-complete-reference__list">
		            
		            { this.state.completeReferences.map( ( reference, key ) => {
		            	return <li className="step-vehicle-complete-reference__item" key={ key }>
			                <span className={ this.isActive( reference.code ) } onClick={ this.selectChoice.bind( this, reference.code ) }>
			                    <span className="text">{ reference.name }</span>
			                </span>
			            </li>
		            })}

		        </ul>
		    </div>
	    )
  	}

}

VehicleCompleteReference.contextTypes = {
    router: React.PropTypes.object.isRequired
}