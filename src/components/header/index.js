import React, { Component } from 'react'

export default class Header extends Component {
  
  constructor ( props ) {

		super( props )
		
		this.state = {}

  }

  render() {
		return (
			<header id="comparamejor-main-header">
				<nav className="navbar navbar-default" role="navigation">
					<div className="container">
						{/*Brand and toggle get grouped for better mobile display */}
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#header-navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="https://comparamejor.com/">
								<img src="https://segdig1.s3.amazonaws.com/static/bower_components/frontendquillo/images/main/header-logo.png" height="72px" width="auto" alt="ComparaMejor.com"/>
							</a>
						</div>

						{/* Collect the nav links, forms, and other content for toggling */}
						<div className="collapse navbar-collapse" id="header-navbar-collapse">
							<div className="block top">
								<div className="wrapper clearfix">
									<ul id="user-block" className="nav navbar-nav submenu-mobile">
										<li id="account-button" className="dropdown">
											<a href="/usuarios/login" className="upper"><i className="fa fa-user"></i> Ingresar</a>
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