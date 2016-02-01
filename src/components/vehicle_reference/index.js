import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class VehicleReference extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		references: []
	  	}
  	}

  	componentWillMount () {

  		Ux3Services.getReferencesByLine( 'AUTOMOVIL', 'ACURA', '1998', 'TL' )
  			.then(( data ) => {

                this.setState({ references: data })
                console.log( data )

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	render() {
	    return (
	    	<div id="step-vehicle-reference" className="step step-vehicle-reference">
		        <header>
		            <h1>¿Cuál es la referencia de tu vehículo?</h1>
		        </header>

		        <ul className="unstyled-list v-list step-vehicle-reference__list">
		            
		            { this.state.references.map( ( reference, key ) => {
		            	return <li ng-repeat="reference in references" className="step-vehicle-reference__item" key={ key }>
			                <span className="btnuj">
			                    <span className="text">{ reference.name }</span>
			                </span>
			            </li>
		            })}

		        </ul>
		    </div>
	    )
  	}

}