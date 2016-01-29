import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Index from './components/Index'

let rootElement = document.getElementById('content')

render(
  <Index />,
  rootElement
)