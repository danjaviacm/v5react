import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import store from 'store2'

export default class VehicleLine extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		lines: [],
	  		vehicle_body: '',
	  		vehicle_brand: '',
	  		vehicle_model: '',
	  		vehicle_line: ''
	  	}
  	}

  	componentWillMount () {

  		if ( store.has( 'UJDATA' ) )
            this.setState( JSON.parse( store.get( 'UJDATA' ) ), () => this.fetchLines() )
        else
            this.context.router.push( '/consultar-placa' )

  	}

  	fetchLines () {

  		Ux3Services.getLinesByModel( this.state.vehicle_body, this.state.vehicle_brand, this.state.vehicle_model )
  			.then(( data ) => {

                this.setState({ lines: data })

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	isActive ( value ) {
        return `btnuj ${ (( value === this.state.vehicle_line ) ? 'active': 'default' ) }`
    }

    selectChoice ( filter ) {
        this.setState({ vehicle_line: filter }, () => this.continue() )
    }

    continue () {

        let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.vehicle_line = this.state.vehicle_line

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/referencia-vehiculo' )

    }

  	render() {
	    return (
	    	<div id="step-vehicle-line" className="step step-vehicle-line">
		        
		        <header>
		            <h1>¿Cuál es la línea de tu vehículo?</h1>
		        </header>

		        <ul className="unstyled-list v-list step-vehicle-line__list">

		            { this.state.lines.map( ( line, key ) => {
		            	return <li className="step-vehicle-line__item" key={ key }>
			                <span className={ this.isActive( line.name ) } onClick={ this.selectChoice.bind( this, line.name ) }>
			                    <span className="text">{ line.name }</span>
			                </span>
			            </li>
		            })}

		        </ul>
		    </div>
	    )
  	}
}

VehicleLine.contextTypes = {
    router: React.PropTypes.object.isRequired
}