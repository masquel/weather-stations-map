import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '../reducers'
import DevTools from '../containers/DevTools'

const store = createStore(
	reducers,
	DevTools.instrument(),
	applyMiddleware(thunkMiddleware)
)

export default store