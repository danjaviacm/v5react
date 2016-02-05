import React, { Component, PropTypes } from 'react'
import store from 'store2'

export default class Sex extends Component {

	constructor ( props, context ) {
		
		super( props ) 

		this.state = {
			sex: ''
		}

		context.router
	}

    componentWillMount () {
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

  	isActive ( value ) {
    	return `btnuj btn-icon-content ${ (( value === this.state.sex ) ? 'active': 'default' ) }`
  	}

    selectChoice ( filter ) {
        this.setState({ sex: filter }, () => this.continue() )
    }

  	continue () {

  		let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.sex = this.state.sex

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/fecha-de-nacimiento' )
  	}

	render() {

		return (
			<div id="step-sex" className="step step-sex">
				<header>
					<h1>Sexo</h1>
				</header>
				<ul className="unstyled-list h-list centered-v-list step-sex__list">
					<li className="step-sex__item">
						<div className={ this.isActive( 'M' ) } onClick={ this.selectChoice.bind( this, 'M' ) }>
							<span className="icon"><i className="cmuj-male"></i></span>
							<span className="text">Masculino</span>
						</div>
					</li>
					<li className="step-sex__item">
						<div className={ this.isActive( 'F' ) } onClick={ this.selectChoice.bind( this, 'F' ) }>
							<span className="icon"><i className="cmuj-female"></i></span>
							<span className="text">Femenino</span>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}

Sex.contextTypes = {
    router: React.PropTypes.object.isRequired
}