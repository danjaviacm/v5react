import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import numeral from 'numeral'

export default class VehicleServiceType extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = { }

	  	context.router
  	}

  	componentWillMount () {

  		Ux3Services.getVehiclePriceFromFasecolda( '1998', '34401002' )
  			.then(( data ) => {

                this.setState({ fasecoldaPrice: data.price })
                console.log( data )

            }).catch(( error ) => {
                trackJs.track( JSON.stringify( error ))
                console.log( error )
            })
  	}

  	continue ( e ) {
  		
  	}

  	render() {
	    return (
	    	<div id="step-vehicle-body" className="step step-vehicle-body">
		        <header>
		            <h1>¿Qué tipo de vehículo tienes?</h1>
		        </header>
		        <ul className="unstyled-list h-list centered-v-list">
		            <li>
		                <div className="btnuj btn-icon-content" ng-className="{'active':sameValue(vehicle_service_type, 'particular')}" ng-click="selectOption('particular')">
		                    <span ng-if="vehicle_body != 'MOTO'" className="icon"><i className="cmuj-car"></i></span>
		                    <span ng-if="vehicle_body == 'MOTO'" className="icon"><i className="cmuj-motorcycle"></i></span>
		                    <span className="text">Particular</span>
		                </div>
		            </li>
		            <li ng-if="vehicle_body != 'MOTO'">
		                <div className="btnuj btn-icon-content" ng-className="{'active':sameValue(vehicle_service_type, 'publico')}" ng-click="selectOption('publico')">
		                    <span className="icon"><i className="cmuj-taxi"></i></span>
		                    <span className="text">Público</span>
		                </div>
		            </li>
		            <li ng-if="vehicle_body != 'MOTO'">
		                <div className="btnuj btn-icon-content" ng-className="{'active':sameValue(vehicle_service_type, 'publico-especial')}" ng-click="selectOption('publico-especial')">
		                    <span className="icon"><i className="cmuj-taxi"></i></span>
		                    <span className="text">Público especial</span>
		                </div>
		            </li>
		        </ul>
		    </div>
	    )
  	}

}