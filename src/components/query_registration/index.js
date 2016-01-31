import React, { Component } from 'react'

// Needed Components

export default class QueryRegistration extends Component {

  	constructor ( props, context ) {
  		
  		super( props )

  		this.state = {}
  	}

  	render() {
    	return (
    		<div id="step-query-registration" className="step step-query-registration">
            	<div className="row ptgw-2x">
                	<div className="col-xs-6 ta-right step-query-registration__message">
                    	<span className="bebas upper">Cotiza gratis</span><br/>
                    	<span className="bebas upper palid-yellow">tu seguro todo riesgo</span><br/>
                    	<span className="bebas upper palid-yellow">en segundos</span>
                	</div>
                	<div className="col-xs-4 ta-left step-query-registration__form">
                    	<span>Ingresa tu placa</span> <br/>
                    	<form action="#/consultar-placa" method="post" className="step-query-registration__form-registration" id="form-registration">
                        	{/*{% csrf_token %}*/}
                        	<input auto-focus name="vehicle_registration" id="plate" maxLength="6" placeholder="XXX000" type="text"/><br/>
                        	<button type="submit" className="btn btn-orange btn-lg upper" ng-hide="loadingUj" onclick="validPlate(); return false;">Continuar</button>
                    	</form>
                    	{/*<span className="btn btn-orange btn-lg upper" ng-show="loadingUj"><i className="fa fa-spinner fa-spin"></i> Continuar</span>*/}
                	</div>
                	<div className="col-xs-12 step-query-registration__success">
                    	<br/>
                    	<a className="btn btn-success" href="https://seguros.comparamejor.com/seguros-para-vehiculos/v5/#/tipo-vehiculo" style={{ color: '#fff' }}>Cotizar vehículo sin placa</a><br/>
                	</div>
            	</div>
	            <div style={{ clear: 'both' }}></div>
	        </div>
    	)
  	}
}