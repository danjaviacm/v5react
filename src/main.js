import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'

let rootElement = document.getElementById('content')

render(
  <App />,
  rootElement
)