import React, { Component } from 'react'

export default class ComponentName extends Component {
  
  	constructor ( props, context ) {

	    super( props )

	    this.state = {}
  	}

  	render() {
	    return (
	      	<div id="step-vehicle-body" className="step step-vehicle-body">

		        <header>
		            <h1>¿Cuál es el tipo de tu vehículo?</h1>
		        </header>
		    
		        <ul className="unstyled-list h-list centered-v-list">
		            <li>
		                <div className="btnuj btn-icon-content" ng-className="{'active':sameValue(vehicle_body, 'AUTOMOVIL')}" ng-click="selectOption('AUTOMOVIL')">
		                    <span className="icon"><i className="cmuj-car"></i></span>
		                    <span className="text">Automóvil</span>
		                </div>
		            </li>
		            <li>
		                <div className="btnuj btn-icon-content active" ng-className="{'active':sameValue(vehicle_body, 'CAMIONETA')}" ng-click="selectOption('CAMIONETA')">
		                    <span className="icon"><i className="cmuj-van"></i></span>
		                    <span className="text">Camioneta</span>
		                </div>
		            </li>
		            <li>
		                <div className="btnuj btn-icon-content" ng-className="{'active':sameValue(vehicle_body, 'MOTO')}" ng-click="selectOption('MOTO')">
		                    <span className="icon"><i className="cmuj-motorcycle"></i></span>
		                    <span className="text">Moto</span>
		                </div>
		            </li>
		            <li>
		                <div className="btnuj btn-icon-content" ng-className="{'active':sameValue(vehicle_body, 'PESADO')}" ng-click="selectOption('PESADO')">
		                    <span className="icon"><i className="cmuj-truck"></i></span>
		                    <span className="text">Pesado</span>
		                </div>
		            </li>
		            <li>
		                <div className="btnuj btn-icon-content" ng-className="{'active':sameValue(vehicle_body, 'BUS')}" ng-click="selectOption('BUS')">
		                    <span className="icon"><i className="cmuj-bus"></i></span>
		                    <span className="text">Bus</span>
		                </div>
		            </li>
		        </ul>
		    </div>
	    )
  	}

}