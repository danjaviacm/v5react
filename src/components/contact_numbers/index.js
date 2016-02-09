import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import _ from 'lodash'
import is from 'is_js'
import store from 'store2'


export default class ContactNumbers extends Component {

   	constructor ( props, context ) {
   		
	  	super( props ) 

	  	this.state = {
            identification_type: 'cedula',
            errorMobile: false,
            errorHome: false,
            errorOffice: false,
            errorEmpty: false,
            mobile_phone: '',
            phone: '',
            office_phone: ''
	  	}

	  	context.router
  	}

    componentWillMount () {
        
        store.has( 'UJDATA' ) ? 
            this.setState( JSON.parse( store.get( 'UJDATA' ) ) ) : this.context.router.push( '/consultar-placa' )
    }

  	componentDidMount () {

        $( '.cel, .phone, .office_phone' ).keydown( ( key ) => {
            if ( key.keyCode != 8 && ( key.keyCode < 48 || key.keyCode > 57 ) ) return false
        })

  	}

    checkPhone() {

        let mobilePhone = this.refs.mobile_phone.value.trim()
        let phone = this.refs.phone.value.trim()
        let officePhone = this.refs.office_phone.value.trim()

        // validate mobile phone
        is.not.empty( mobilePhone ) && mobilePhone.length < 10 ? 
            this.setState({ errorMobile: true }) : this.setState({ errorMobile: false, mobile_phone: mobilePhone })

        // validate phone
        is.not.empty( phone ) && phone.length < 7 ? 
            this.setState({ errorHome: true }) : this.setState({ errorHome: false, phone: phone })

        // validate office phone
        is.not.empty( officePhone ) && officePhone.length < 7 ? 
            this.setState({ errorOffice: true }) : this.setState({ errorOffice: false, office_phone: officePhone })

        // validate all fields for not empty
        if ( is.all.empty( mobilePhone, phone, officePhone ) ) {

            this.setState({ errorEmpty: true })
            return false
        }

        else if ( mobilePhone.length == 10 || phone.length == 7 || officePhone.length == 7 ) {

            this.setState({ errorEmpty: false })
            return true
        }
    }

    handleSubmit ( e ) {
        
        e.preventDefault()

        if ( this.checkPhone() ) {

            this.continue()
        }

    }

  	continue () {

        let UJData = {}

        if ( store.has( 'UJDATA' ) ) {

            UJData = JSON.parse( store.get( 'UJDATA' ) ) 
            UJData.mobile_phone = this.state.mobile_phone
            UJData.phone = this.state.phone
            UJData.office_phone = this.state.office_phone

            store.set( 'UJDATA', JSON.stringify( UJData ) )
        }

        else
            this.context.router.push( '/consultar-placa' )

        // Next step
        this.context.router.push( '/situacion-actual' )

  	}

  	render() {

	    return (
	    	<div id="step-phone-numbers" className="step step-phone-numbers">
                <header>
                    <h1>Números telefónicos</h1>
                    <h3 style={{ marginTop: '-34px', marginBottom: '34px' }}>Escribe por lo menos un número de contacto.</h3>
                </header>
                { this.state.errorEmpty ? <span className="block-error">*Recuerda que debes ingresar al menos un número de contacto.</span> : null }
                <form className="step-phone-numbers__form">
                    <div className="row">
                        <div className="col-xs-8 col-xs-offset-2">
                            <dl className="dl-horizontal">
                                <dt className="iconuj hidden-xs"><i className="cmuj-mobile"></i></dt>
                                <dd>
                                    <label className="pull-left" htmlFor="mobile_phone">Celular</label>
                                    <input autoFocus defaultValue={ this.state.mobile_phone || '' } ref="mobile_phone" name="mobile_phone" maxLength="10" id="mobile_phone" style={{ textAlign: 'center', color: '#777' }} className="form-control cel" type="tel" onChange={ this.checkPhone.bind( this ) }/>
                                    { this.state.errorMobile ? <span className="block-error" ng-show="errorMobile">El número de celular debe tener al menos 10 caracteres.</span> : null }
                                </dd>
                                <dt className="iconuj hidden-xs"><i className="cmuj-home"></i></dt>
                                <dd>
                                    <label className="pull-left" htmlFor="phone">Casa</label>
                                    <input id="phone" defaultValue={ this.state.phone || '' } ref="phone" style={{ textAlign: 'center', color: '#777' }} maxLength="7" className="form-control phone" type="tel" onChange={ this.checkPhone.bind( this ) }/>
                                    { this.state.errorHome ? <span className="block-error" ng-show="errorHome">El teléfono de casa debe tener al menos 7 caracteres.</span> : null }
                                </dd>
                                <dt className="iconuj hidden-xs"><i className="cmuj-telephone"></i></dt>
                                <dd>
                                    <label className="pull-left" htmlFor="office_phone">Oficina</label>
                                    <input id="office_phone" defaultValue={ this.state.office_phone || '' } ref="office_phone" style={{ textAlign: 'center', color: '#777' }} maxLength="7" className="form-control office_phone" type="tel" onChange={ this.checkPhone.bind( this ) }/>
                                    { this.state.errorOffice ? <span className="block-error" ng-show="errorOffice">El teléfono de oficina debe tener al menos 7 caracteres.</span> : null }
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <button className="btn btn-orange upper" onClick={ this.handleSubmit.bind( this ) }>Continuar</button>
                </form>
            </div>
	    )
  	}
}

ContactNumbers.contextTypes = {
    router: React.PropTypes.object.isRequired
}