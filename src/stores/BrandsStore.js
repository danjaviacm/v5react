import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

let store = CreateStore(() => {})

let Ux3Actions = () => {
	return {
        type: 'AN_ACTION'
    }
}


var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)
