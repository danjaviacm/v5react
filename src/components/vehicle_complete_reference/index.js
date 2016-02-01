import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class VehicleCompleteReference extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		completeReferences: []
	  	}
  	}

  	componentWillMount () {

  		Ux3Services.getCompleteReferences( 'AUTOMOVIL', 'ACURA', '1998', 'TL', '2.5L' )
  			.then(( data ) => {

                this.setState({ completeReferences: data })
                console.log( data )

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
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