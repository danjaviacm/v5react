import React, { Component } from 'react'

// Needed Components
import Header from '../header';
import Footer from '../footer';

export default class QueryRegistration extends Component {

  constructor ( props ) {
  	super( props )
  	this.state = {}
  }

  render() {
    return (
    	<div>
		    <Header />

	    	<div app="ApplyFormUJV5">
			    <div id="apply-cars-v4">
			        <div className="container">
			            <header id="steps-form" className="steps-form">
			                <h1 className="upper orange bebas mlgw">¡Cotiza gratis ahora!</h1>
			                <nav className="hidden-xs steps-form__navbar">
			                    <ul className="steps-form__list">
			                        <li className="steps-form__list__item"><a className="vehicle_data steps-form__link active ">1. Datos del vehículo</a></li>
			                        <li className="steps-form__list__item"><a className="especific_data steps-form__link">2. Datos específicos</a></li>
			                        <li className="steps-form__list__item"><a className="personal_data steps-form__link">3. Datos personales</a></li>
			                    </ul>
			                </nav>
			                <div style={{ clear: 'both' }}></div>
			            </header>
			            <div className="navigation-control hidden-xs">
			                <a className="arrow-left" href="">
			                    <span><i className="fa fa-chevron-left"></i><i className="fa fa-chevron-left"></i></span>
			                </a>
			                <a className="arrow-right" href="">
			                    <span><i className="fa fa-chevron-right"></i><i className="fa fa-chevron-right"></i></span>
			                </a>
			            </div>

			            <div className="loadiuj hidden-xs" show="loadingUj">
			                <i className="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;Procesando...
			            </div>
			            <a href="" className="ta-left white back-step visible-xs">
			                <i className="fa fa-chevron-left"></i><i className="fa fa-chevron-left"></i> Paso anterior
			                <div className="loadiuj-xs visible-xs">
			                    <i className="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;Procesando...
			                </div>
			            </a>
			            <div>
			                <section className="container-step pbgw-2x">
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
			                </section>
			            </div>
			        </div>
			    </div>
	    	</div>

		    <Footer />
    	</div>
    )
  }
}