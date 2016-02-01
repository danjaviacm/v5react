import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class VehicleLine extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		lines: []
	  	}
  	}

  	componentWillMount () {

  		Ux3Services.getLinesByModel( 'AUTOMOVIL', 'ACURA', '1998' )
  			.then(( data ) => {

                this.setState({ lines: data })
                console.log( data )

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	render() {
	    return (
	    	<div id="step-vehicle-line" className="step step-vehicle-line">
		        
		        <header>
		            <h1>¿Cuál es la línea de tu vehículo?</h1>
		        </header>

		        <ul className="unstyled-list v-list step-vehicle-line__list">

		            { this.state.lines.map( ( line, key ) => {
		            	return <li key={ key }>
			                <span className="btnuj">
			                    <span className="text">{ line.name }</span>
			                </span>
			            </li>
		            })}

		        </ul>
		    </div>
	    )
  	}

}