import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import store from 'store2'

export default class VehicleReference extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		references: [],
	  		vehicle_body: '',
	  		vehicle_brand: '',
	  		vehicle_model: '',
	  		vehicle_line: '',
	  		vehicle_reference: ''
	  	}
  	}

  	componentWillMount () {

        store.has( 'UJDATA' ) ?
            this.setState( JSON.parse( store.get( 'UJDATA' ) ), () => this.fetchReferences() ) : this.context.router.push( '/consultar-placa' )
  		
  	}

  	fetchReferences () {
  		Ux3Services.getReferencesByLine( this.state.vehicle_body, this.state.vehicle_brand, this.state.vehicle_model, this.state.vehicle_line )
  			.then(( data ) => {

                this.setState({ references: data })

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	isActive ( value ) {
        return `btnuj ${ (( value === this.state.vehicle_reference ) ? 'active': 'default' ) }`
    }

    selectChoice ( filter ) {
        this.setState({ vehicle_reference: filter }, () => this.continue() )
    }

    continue () {

        let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.vehicle_reference = this.state.vehicle_reference

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/referencia-completa-vehiculo' )

    }

  	render() {
	    return (
	    	<div id="step-vehicle-reference" className="step step-vehicle-reference">
		        <header>
		            <h1>¿Cuál es la referencia de tu vehículo?</h1>
		        </header>

		        <ul className="unstyled-list v-list step-vehicle-reference__list">
		            
		            { this.state.references.map( ( reference, key ) => {
		            	return <li className="step-vehicle-reference__item" key={ key }>
			                <span className={ this.isActive( reference.name ) } onClick={ this.selectChoice.bind( this, reference.name ) }>
			                    <span className="text">{ reference.name }</span>
			                </span>
			            </li>
		            })}

		        </ul>
		    </div>
	    )
  	}
}

VehicleReference.contextTypes = {
    router: React.PropTypes.object.isRequired
}