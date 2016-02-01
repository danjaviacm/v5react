import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export const BRANDS = 'BRANDS'

// Action Creators
export ( brands ) => {
	retrun { type: BRANDS, brands }
}