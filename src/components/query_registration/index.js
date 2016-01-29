import React, { Component } from 'react'

// Needed Components
import Footer from '../footer';

export default class QueryRegistration extends Component {

  constructor ( props ) {
  	super( props )
  	this.state = {}
  }

  render() {
    return (
    	<div app="ApplyFormUJV5">
		    <div id="apply-cars-v4">
		        <div className="container">
		            <header id="steps-form">
		                <h1 className="upper orange bebas mlgw">¡Cotiza gratis ahora!</h1>
		                <nav className="hidden-xs">
		                    <ul>
		                        <li><a className="vehicle_data" href="">1. Datos del vehículo</a></li>
		                        <li><a className="especific_data" href="">2. Datos específicos</a></li>
		                        <li><a className="personal_data" href="">3. Datos personales</a></li>
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
		        </div>
		    </div>

		    <Footer />
    	</div>
    )
  }
}