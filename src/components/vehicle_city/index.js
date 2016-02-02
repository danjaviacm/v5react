import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import InputCompletion from 'react-input-completion'
import cities from '../../services/Cities'
import _ from 'lodash'

export default class VehicleCity extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		vehicleBrand: 'ACURA',
            vehicleLine: 'LT',
            vehicleModel: '1998',
	  		selected: '',
            option: '',
            errorEmpty: false,
            errorInvalid: false
	  	}

	  	context.router
  	}

  	isActive ( value ) {
    	return `btnuj btn-icon-content ${ (( value === this.state.selected ) ? 'active': 'default' ) }`
  	}

    selectOption ( option ) {

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

  	continue ( filter ) {

  		this.setState({ selected: filter })
  	}

  	render() {

	    return (
	    	<div id="step-vehicle-city" className="step step-vehicle-city">
                <header>
                    <h1>¿En qué ciudad circula tu { this.state.vehicleBrand } { this.state.vehicleLine }/{ this.state.vehicleModel }?</h1>
                </header>
                <ul className="unstyled-list v-list step-vehicle-city__list">
                    <li>
                        <span className="btnuj" ng-click="selectOption('Bogotá, Bogota D.C., Colombia')">
                            <span className="text">Bogotá</span>
                        </span>
                    </li>
                    <li>
                        <span className="btnuj" ng-click="selectOption('Medellín, Antioquia, Colombia')">
                            <span className="text">Medellín</span>
                        </span>
                    </li>
                    <li>
                        <span className="btnuj" href="" ng-click="selectOption('Cali, Valle del Cauca, Colombia')">
                            <span className="text">Cali</span>
                        </span>
                    </li>
                    <li>
                        <span className="btnuj" href="" ng-click="selectOption('Barranquilla, Atlántico, Colombia')">
                            <span className="text">Barranquilla</span>
                        </span>
                    </li>
                </ul>

                <h2>¿Otra?</h2>
                
                <div className="form-group step-vehicle-city__form">
                    <div className="row">
                         <div className="col-xs-6 col-xs-offset-3">

                            <InputCompletion options={ cities } name="cities_2">
                                <input type="text" id="city" placeholder="Escribe el nombre de la ciudad..." className="form-control form-control-small"/>
                            </InputCompletion>

                            { this.state.errorEmpty ? <div className="block-error block-error-0">Debes ingresar la ciudad de circulación del vehiculo. <i
                                className="fa fa-exclamation-circle"></i><br/></div> : null }
                            { this.state.errorInvalid ? <div className="block-error block-error-valid">Debes ingresar una ciudad valida, por ejemplo (Bogotá, Bogota D.C., Colombia). <i
                                className="fa fa-exclamation-circle"></i><br/></div> : null }
                        </div>
                    </div>
                    <span className="help-block small" style={{ color: '#f0f0f0' }}>Escribe las tres primeras letras donde circula tu auto y elige la opción.</span>
                </div>
            </div>
	    )
  	}

}