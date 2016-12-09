import React, { Component, PropTypes } from 'react';
import {Map,Marker,Popup,TileLayer,CircleMarker,FeatureGroup} from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import {mapConfig} from '../config/consts';

export default class stationsMap extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const {stations, showHeatMap} = this.props;
		return (
			<Map
				center={mapConfig.center}
				zoom={mapConfig.zoom}
			>
				{
					showHeatMap && (
						<HeatmapLayer
							points={stations}
							longitudeExtractor={m => m.longitude}
							latitudeExtractor={m => m.latitude}
							intensityExtractor={m => parseFloat(m.height)} 
						/>
					)
				}
				
				<TileLayer 
					//attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' 
				/>
				{
					!showHeatMap &&
					stations.length &&
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
								<CircleMarker 
									color={"#3498db"}
									wieght={2}
									opacity={0.8}
									center={[latitude,longitude]} 
									radius={5}
								/>
							</FeatureGroup>
						)
					})
				}
			</Map>
		)
	}
}

stationsMap.defaultProps = {
	stations: []
}

stationsMap.propTypes = {
	stations: PropTypes.array.isRequired
}