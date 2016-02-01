import React, { Component } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'

export default class VehicleModel extends Component {

  	constructor ( props, context ) {

	  	super( props )

	  	this.state = {
	  		models: []
	  	}
  	}

  	componentWillMount () {

		this.fetchModels()  
  	}

  	fetchModels () {

  		let popular_brands = []
  		let alphabeticalList = []

  		Ux3Services.getModelsByBrand( 'AUTOMOVIL', 'ACURA' )
	  		.then(( data ) => {

                this.setState({ models: data })

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	render() {
	    return (
	    	<div id="step-vehicle-model" className="step step-vehicle-model">
		        
		        <header>
		            <h1>¿Cuál es el modelo de tu vehículo?</h1>
		        </header>
		        
		        <div className="upper" style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '10px', display: 'inline-block', padding: '7px 17px', marginTop: '-20px', marginBottom: '15px' }}>
		            <h2><i className="vehicle_className cmuj-car"></i> ACURA</h2>
		        </div>

		        <div align="center" className="squares">
		            
		            { this.state.models.map( ( year, key ) => { 
		            	return <div className="square" key={ key } ng-click="selectOption(model.year)">
			                { year.year }
			            </div> 
			        })}

		        </div>
		        
		        { /* <table align="center" className="tableuj">
		            <tr ng-repeat="block in models">
		                <td ng-repeat="year in block"><div ng-className="{'active': sameValue(vehicle_model, year.year)}" ng-click="selectOption(year.year)">{{ year.year }}</div></td>
		            </tr>
		        </table> */ }
	    	</div>
	    )
  	}

}