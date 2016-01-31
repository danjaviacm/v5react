import React, { Component } from 'react'

export default class Footer extends Component {

	constructor( props, context ) {
		
		super( props )
	}

	render() {
		return (
			<div id="footer-cars-v4">
				<ul className="unestyled-list pull-left">
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/allianz.svg"
								alt="Allianz"/>
						</li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/liberty.svg"
								alt="Libery Seguros"/></li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/sura.svg"
								alt="Sura"/></li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/generali.svg"
								alt="Generali"/>
						</li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/equidad.svg"
								alt="Equidad Seguros"/></li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/previsora.svg"
								alt="Previsora"/></li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/seguros-del-estado.svg"
								alt="Seguros del Sstado"/></li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/mundial.svg"
								alt="Mundial Seguros"/></li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/aig.svg"
								alt="AIG Seguros"/>
						</li>
						<li><img
								src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/solidaria.svg"
								alt="Solidaria"/></li>
				</ul>
				<div className="pull-right" style={{width: '380px'}}>
					<img src="https://segdig1.s3.amazonaws.com/static/core-app/img/sections/cars/apply/norton-verisign.jpg"
							 alt="Norton Verisign"
							 align="left" hspace="3px" 
							 style={{float: 'left'}} />
					<span>
							<span className="strong-blue">Servicio seguro y confiable.</span>
							<p className="small" style={{color: '#777!important'}}>ComparaMejor.com protege tu información con<br/> Norton Verisign
									y
									tecnología de encriptación.</p>
					</span>
				</div>
				<div style={{clear: 'both'}}></div>
			</div>
		);
	}
}
