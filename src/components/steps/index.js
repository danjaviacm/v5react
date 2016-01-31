import React, { Component } from 'react'

export default class Steps extends Component {
  
  	constructor ( props, context ) {

		super( props )
	
		this.state = {}

  	}

  	render() {
		return (
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
		)
  	}
}