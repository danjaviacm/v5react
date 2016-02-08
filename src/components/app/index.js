import React, { Component } from 'react'

// Needed Components
import Header from '../header'
import Steps from '../steps'
import Loading from '../loading'
import Footer from '../footer'

// Parental states
window.globalState = {}

export default class App extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {
			serverWait: false,
			arrow: true
		}

	}

	componentWillMount () {

		globalState.callback = ( data ) => {
			this.setState( data )
		}
	}

	componentDidMount () {

		if ( /^\#\/consultar-placa/g.test( window.location.hash ) )
			this.setState({ arrow: false })
	}

	previousStep () {
		this.context.router.goBack()
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
								{ this.state.arrow ? <a className="arrow-left" href="" onClick={ this.previousStep.bind( this ) }>
									<span><i className="fa fa-chevron-left"></i><i className="fa fa-chevron-left"></i></span>
								</a> : null }
								<a className="arrow-right" href="">
									<span><i className="fa fa-chevron-right"></i><i className="fa fa-chevron-right"></i></span>
								</a>
							</div>

							{ this.state.serverWait ? <Loading /> : null }

							{ this.state.arrow ? <a href="" className="ta-left white back-step visible-xs" onClick={ this.previousStep.bind( this ) }>
								<i className="fa fa-chevron-left"></i><i className="fa fa-chevron-left"></i> Paso anterior
								<div className="loadiuj-xs visible-xs">
									{ this.state.serverWait ? <span><i className="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;Procesando...</span> : null }
								</div>
							</a> : null }
							
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

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}