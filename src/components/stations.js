import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map,Marker,Popup,TileLayer,CircleMarker,FeatureGroup} from 'react-leaflet';

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
								stations.map(({name,latitude,longitude,height}, index)=>{
									return (
										<FeatureGroup key={index}>
											<Popup>
												<div className="popup__info">
													<dl className="popup__item">
														<dt className="popup__item-key">Название:</dt>{' '}
														<dd className="popup__item-value">{name}</dd>
													</dl>
													<dl className="popup__item">
														<dt className="popup__item-key">Высота метеопл:</dt>{' '}
														<dd className="popup__item-value">{height}</dd>
													</dl>
												</div>
											</Popup>
											<CircleMarker center={[latitude,longitude]} radius={5}></CircleMarker>
										</FeatureGroup>
									)
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