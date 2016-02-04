import React, { PropTypes, Component } from 'react'

// Needed Components

export default class QueryRegistration extends React.Component {

  	constructor ( props, context ) {
  		
  		super( props )

  		this.state = {
            loadingUj: false
        }
  	}

    continue( e ) {

        e.preventDefault()

        let plate = this.refs.plate.value.trim()

        this.setState({ loadingUj: true })
        
        this.props.history.pushState( null, '/tipo-vehiculo' )
    }

    noPlate () {
        this.props.history.pushState( null, '/tipo-vehiculo' )
    }

  	render() {
    	return (
    		<section id="step-query-registration" className="step step-query-registration">
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
                        	<input autoFocus name="vehicle_registration" ref="plate" id="plate" maxLength="6" placeholder="XXX000" type="text"/><br/>
                        	{ ! this.state.loadingUj ? <button type="submit" className="btn btn-orange btn-lg upper" onClick={ this.continue.bind( this ) }>Continuar</button> : null }
                    	</form>

                    	{ this.state.loadingUj ? <span className="btn btn-orange btn-lg upper"><i className="fa fa-spinner fa-spin"></i> Continuar</span> : null }
                	</div>

                	<div className="col-xs-12 step-query-registration__success">
                    	<br/>
                    	<a className="btn btn-success" onClick={ this.noPlate.bind( this ) } style={{ color: '#fff' }}>Cotizar vehículo sin placa</a><br/>
                	</div>
            	</div>
	            <div style={{ clear: 'both' }}></div>
	        </section>
    	)
  	}
}