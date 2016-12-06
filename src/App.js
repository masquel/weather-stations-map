import React, {Component, PropTypes} from 'react'
import { Provider, connect } from 'react-redux'

import store from './store';
import DevTools from './containers/DevTools';

import Stations from './components/stations';

class App extends Component {
	constructor(props) {
		super(props)
	}
	render(){
		return (
			<Provider store={store}>
				<div>
					<Stations></Stations>
					{(process.env.NODE_ENV !== "production") && <DevTools/> }
				</div>
			</Provider>
		)
	}
}

export default App;