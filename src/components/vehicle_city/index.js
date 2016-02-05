import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import InputCompletion from 'react-input-completion'
import cities from '../../services/Cities'
import _ from 'lodash'
import store from 'store2'

export default class VehicleCity extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		vehicleBrand: '',
            vehicleLine: '',
            vehicleModel: '',
            vehicle_city: '',
	  		selected: '',
            option: '',
            errorEmpty: false,
            errorInvalid: false
	  	}

	  	context.router
  	}

  	componentWillMount () {

  		store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
  	}

    isActive ( value ) {
        return `btnuj ${ (( value === this.state.vehicle_city ) ? 'active': 'default' ) }`
    }

    selectChoice ( filter ) {

        this.setState({ vehicle_city: filter }, () => this.continue() )
    }

    selectChoiceDropdown ( e ) {

        if ( e.target.value.length < 15 )
            return
        
        this.setState({ vehicle_city: e.target.value }, () => this.continue() )
    }

  	continue () {

        let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.vehicle_city = this.state.vehicle_city

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/tipo-identificacion' )
  	}

  	render() {

	    return (
	    	<div id="step-vehicle-city" className="step step-vehicle-city">
                <header>
                    <h1>¿En qué ciudad circula tu { this.state.vehicle_brand } { this.state.vehicle_line }/{ this.state.vehicle_model }?</h1>
                </header>
                <ul className="unstyled-list v-list step-vehicle-city__list">
                    <li>
                        <span className={ this.isActive( 'Bogotá, Bogota D.C., Colombia' ) } onClick={ this.selectChoice.bind( this, 'Bogotá, Bogota D.C., Colombia' ) }>
                            <span className="text">Bogotá</span>
                        </span>
                    </li>
                    <li>
                        <span className={ this.isActive( 'Medellín, Antioquia, Colombia' ) } onClick={ this.selectChoice.bind( this, 'Medellín, Antioquia, Colombia' ) }>
                            <span className="text">Medellín</span>
                        </span>
                    </li>
                    <li>
                        <span className={ this.isActive( 'Cali, Valle del Cauca, Colombia' ) } href="" onClick={ this.selectChoice.bind( this, 'Cali, Valle del Cauca, Colombia' ) }>
                            <span className="text">Cali</span>
                        </span>
                    </li>
                    <li>
                        <span className={ this.isActive( 'Barranquilla, Atlántico, Colombia' ) } href="" onClick={ this.selectChoice.bind( this, 'Barranquilla, Atlántico, Colombia' ) }>
                            <span className="text">Barranquilla</span>
                        </span>
                    </li>
                </ul>

                <h2>¿Otra?</h2>
                
                <div className="form-group step-vehicle-city__form">
                    <div className="row">
                         <div className="col-xs-6 col-xs-offset-3">

                            <InputCompletion options={ cities } name="cities_2" onValueChange={ this.selectChoiceDropdown.bind( this ) }>
                                <input type="text" id="city" placeholder="Escribe el nombre de la ciudad..." className="form-control form-control-small" />
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

VehicleCity.contextTypes = {
    router: React.PropTypes.object.isRequired
}