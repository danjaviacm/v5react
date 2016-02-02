import React, { Component, PropTypes } from 'react'
import request from 'reqwest'
import Ux3Services from '../../services/Ux3Services'
import _ from 'lodash'
import numeral from 'numeral'

export default class VehicleLocation extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
	  		vehicleBrand: 'ACURA',
	  		vehicleLine: 'TL',
	  		vehicleModel: '1998',
	  		fasecoldaPrice: '',
	  		showFasecolda: false,
	  		showError: false
	  	}

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

  	yes ( e ) {

  		e.preventDefault()

  		this.setState({ showFasecolda: true })
  	}

  	no ( e ) {

  		e.preventDefault()

  		this.setState({ showFasecolda: false })
  	}

  	formatCurrency ( e ) {

  		let value = numeral( this.refs.price.value ).format( '0,0' )

  		e.currentTarget.value = value

  		if ( value.replace( /,/g, "" ).length < 7 ) 
  			this.setState({ showError: true })
  		else
  			this.setState({ showError: false })
  	}

  	continue ( e ) {

  		e.preventDefault()

  		let price = this.refs.price.value

  		if ( price.replace( /,/g, "" ).length < 7 ) return

  		console.log( 'continue' )
  	}

  	render() {
	    return (
	    	<div id="step-vehicle-zero-km" className="step step-vehicle-zero-km">
		        <header>
		            <h1>¿Cuál es la ubicación de tu { this.state.vehicleBrand } { this.state.vahicleLine }/{ this.state.vehicleModel }?</h1>
		        </header>
		        <ul className="unstyled-list h-list centered-v-list step-vehicle-zero-km__list">
		            <li>
		                <div className="btnuj btn-icon-content step-vehicle-zero-km__location" onClick={ this.yes.bind( this ) }>
		                    <span className="icon"><i className="cmuj-local"></i></span>
		                    <span className="text">En concesionario</span>
		                </div>
		            </li>
		            <li>
		                <div className="btnuj btn-icon-content step-vehicle-zero-km__location" onClick={ this.no.bind( this ) }>
		                    <span className="icon"><i className="cmuj-path"></i></span>
		                    <span className="text">En circulación</span>
		                </div>
		            </li>
		        </ul>
		        <br/>

		        { this.state.showFasecolda ? <div className="form-group step-vehicle-zero-km__fasecolda">
		            <div className="row">
		                <div className="col-xs-6 col-xs-offset-3">
		                    <div className="input-group">
		                        <div className="input-group-addon">$</div>
		                            <input id="vehicle_commercial_value" maxLength="15" ref="price" style={{ textAlign: 'center' }} defaultValue={ numeral( this.state.fasecoldaPrice ).format( '0,0' ) } className="form-control" type="text" ng-model="vehicle_commercial_value" onChange={ this.formatCurrency.bind( this ) } placeholder="Valor del vehículo en factura de compra..."/>
		                        </div>
		                    { this.state.showError ? <span className="block-error">Debes ingresar un valor superior o igual a 1.000.000. Solo Números. <br/></span> : null }
		                    <span className="helpBlock small" style={{ color: '#f0f0f0' }}>Escribe el valor del vehículo que aparece en tu factura de compra.</span>
		                </div>
		            </div>
		        </div> : null }

		        { this.state.showFasecolda ? <button ng-show="vehicle_is_zero_km == 1" className="btn btn-orange upper" onClick={ this.continue.bind( this ) }>Continuar</button> : null }
		    </div>
	    )
  	}

}