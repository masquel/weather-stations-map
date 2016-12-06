import React, { Component, PropTypes } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';


import {mapConfig,tileLayerConfig} from '../config/consts';

export default class Map extends Component {
	constructor(props){
		super(props);
		this.state = {
			map: null
		}
		this._mapNode = null;
		this.init = this.init.bind(this);
	}
	componentDidMount() {
		if(!this.state.map) this.init(this._mapNode);
	}
	componentWillUnmount() {
		this.state.map.remove();
	}
	render() {
		const {stations} = this.props;
		return (
			<div>
				
			</div>	
		)
	}
}

Map.defaultProps = {
	stations: []
}

Map.propTypes = {
	stations: PropTypes.array
}