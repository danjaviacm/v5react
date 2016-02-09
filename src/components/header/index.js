import React, { Component } from 'react'

export default class Header extends Component {
	
	constructor ( props ) {

		super( props )
		
		this.state = {
			open: false
		}

	}

  	isActive ( value ) {
    	return `navbar-collapse ${ (( value === true ) ? 'collapse in': 'default' ) }`
  	}

	render() {
		return (
			<header id="comparamejor-main-header" className="rastreator comparamejor-main-header">
				<nav className="navbar navbar-default comparamejor-main-header__navbar" role="navigation">
					<div className="container">
						{/*Brand and toggle get grouped for better mobile display */}
						<div className="navbar-header comparamejor-main-header__navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#header-navbar-collapse" onClick={ ()=> this.setState({ open: ! this.state.open })}>
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand comparamejor-main-header__navbar-brand" href="https://comparamejor.com/">
								<img src="https://segdig1.s3.amazonaws.com/static/bower_components/frontendquillo/images/main/header-logo.png" height="72px" width="auto" alt="ComparaMejor.com"/>
							</a>
						</div>

						<div className={ this.isActive( this.state.open ) } id="header-navbar-collapse">
							<div className="block top">
								<div className="wrapper clearfix">
									<ul id="user-block" className="nav navbar-nav submenu-mobile">
										<li id="account-button" className="dropdown">
											<a href="/usuarios/datos-personales/" className="upper comparamejor-main-header__login"><i className="fa fa-user"></i> Mis Datos</a>
										</li>
									</ul>
									{/*This is a requirement from Ricardo Buitrago due to an arrangement with inbox labs*/}
									
									<p id="header-phones" className="navbar-text contact-mobile">
										<i className="fa fa-phone"></i> (1) 756 1234
									</p>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		)
	}
}