import React, { Component } from 'react'

export default class VehicleBrand extends Component {
  
  	constructor ( props ) {

    	super( props )
    	
    	this.state = {}
  	
  	}

  	render() {
	    return (
	     	<div id="step-vehicle-brand" className="step">
		        <header>
		            <h1>¿Cuál es la marca de tu vehículo?</h1>
		        </header>

		        <div className="brands" ng-hide="list">
		            <div ng-repeat="brand in brands | orderBy: orderCriteria | limitTo: limit" className="brand" ng-className="{'active':sameValue(vehicle_brand, brand.name)}" ng-click="selectOption(brand)">
		                <div className="container-img">
		                    <img ng-show="brand.image" ng-src="{{ baseUrlMedia + brand.image }}" alt="{{ brand.name }}" className="img-responsive"/>
		                </div>
		                <span ng-className="{'big':(brand.image == null)}">{{ brand.name }}</span>
		            </div>
		            <div className="brand more" ng-show="loadMoreBtn" ng-click="showMore()">
		                <span>+</span>
		            </div>
		        </div>
		        
		        <div className="list-brands" ng-show="list">
		            <div className="letter" ng-repeat="letter in alphabeticalList">
		                <h1 style="border-bottom: 1px dotted rgba(255,255,255,.2);">{{ letter.index }}</h1>
		                <ul className="unstyled-list v-list">
		                    <li ng-repeat="brand in letter.brands">
		                        <span className="btnuj" ng-className="{'active':sameValue(vehicle_line, line.name)}" ng-click="selectOption(brand)">
		                            <span className="text">{{ brand.name }}</span>
		                        </span>
		                    </li>
		                </ul>
		            </div>
		        </div>
		    </div>
	    )
  	}

}