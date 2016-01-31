import React, { Component } from 'react';

// Needed Components
import Header from '../header';
import Steps from '../steps';
import Footer from '../footer';

export default class App extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}

		context.router

	}

	render() {
		return (
			<div>
				<Header />

				<div app="ApplyFormUJV5">
					<div id="apply-cars-v4">
						<div className="container">
									
							<Steps />

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
									{ this.props.children }
								</section>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}