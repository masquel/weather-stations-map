import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map,Marker,Popup,TileLayer,Circle,FeatureGroup} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './map.styl';

import {fetchStations} from '../actions/';

import {mapConfig} from '../config/consts';

class Stations extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.dispatch(fetchStations());
	}
	render(){
		const {
			dispatch,
			stationsStore
		} = this.props;
		const {
			stations,
			loading
		} = stationsStore;
		console.log(mapConfig);
		return (
			<div>
				{
					stations &&	stations.length ? (
						<Map
							center={mapConfig.center}
							zoom={mapConfig.zoom}
						>
							<TileLayer 
								//attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' 
							/>
							{
								stations.map(({name,latitude,longitude,height})=>{
									<FeatureGroup>
										<Popup>
											<dl><dt>Название:</dt><dd>{name}</dd></dl>
											<dl><dt>Высота метеопл:</dt><dd>{height}</dd></dl>
										</Popup>
										<Circle center={[latitude,longitude]} radius={10}></Circle>
									</FeatureGroup>
								})
							}
						</Map>
					) : (
						<div>Станций нет</div>
					)
				}
			</div>
		)
	}
}

export default connect(s=>s)(Stations);